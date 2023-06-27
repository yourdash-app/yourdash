// The YourDash project
//  - https://github.com/yourdash-app/yourdash
//  - https://yourdash-app.github.io

import { existsSync as fsExistsSync, promises as fs } from "fs";
import path from "path";
import * as http from "http";
import cors from "cors";
import express from "express";
import { Server as SocketIoServer, Socket as SocketIoSocket } from "socket.io";
import chalk from "chalk";
import minimist from "minimist";
import { YourDashSessionType } from "../../shared/core/session.js";
import log, { logTypes } from "./helpers/log.js";
import { compareHash } from "./helpers/encryption.js";
import YourDashUnreadUser from "./helpers/user.js";
import { createSession } from "./helpers/session.js";
import globalDatabase from "./helpers/globalDatabase.js";
import killPort from "kill-port";
import startupChecks from "./core/startupChecks.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "./core/sessions.js";
import { YourDashServerDiscoveryStatus } from "./core/discovery.js";
import startupTasks from "./core/startupTasks.js";
import defineCorePanelRoutes from "./core/endpoints/panel.js";
import loadApplications from "./core/loadApplications.js";

const args = minimist(process.argv.slice(2));

global.args = args;

export { args };

await startupChecks();
await startupTasks();

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIoServer(httpServer);

export interface ISocketActiveSocket {
  id: string,
  token: string,
  socket: SocketIoSocket
}

const activeSockets: {
  [ username: string ]: ISocketActiveSocket[]
} = {};

const beforeShutdown = () => {
  log(logTypes.info, "Shutting down... (restart of core should occur automatically)");

  globalDatabase._internalDoNotUseWriteToDiskOnlyIntendedForShutdownSequence(
    path.resolve(process.cwd(), "./fs/globalDatabase.json"),
    () => {
      process.kill(process.pid);
    }
  );
};

process.on("SIGINT", beforeShutdown);

io.on("connection", socket => {
  // Check that all required parameters are present
  if (!socket.handshake.query.username || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId) {

    log(
      logTypes.info,
      socket.handshake.query.username,
      socket.handshake.query.sessionToken,
      socket.handshake.query.sessionId
    );

    log(logTypes.error, "[PSA-BACKEND]: Missing required parameters");

    socket.disconnect(true);
    return;
  }

  if (!activeSockets[socket.handshake.query.username as string]) {
    activeSockets[socket.handshake.query.username as string] = [];
  }

  activeSockets[socket.handshake.query.username as string].push(<ISocketActiveSocket>{
    id: socket.handshake.query.sessionId as string,
    token: socket.handshake.query.sessionToken as string,
    socket
  });

  socket.on("execute-command-response", output => {
    log(logTypes.info, output);
  });

  socket.on("disconnect", () => {
    activeSockets[socket.handshake.query.username as string].forEach(value => {
      activeSockets[socket.handshake.query.username as string].filter(sock => sock.id !== socket.id);
    });
  });

  return;
}
);

io.use(async (socket, next) => {
  const {
    username,
    sessionToken
  } = socket.handshake.query as {
    username?: string,
    sessionToken?: string
  };
  if (!username || !sessionToken) {
    return socket.disconnect();

  }
  if (!__internalGetSessionsDoNotUseOutsideOfCore()[username]) {
    try {
      const user = await new YourDashUnreadUser(username).read();

      __internalGetSessionsDoNotUseOutsideOfCore()[username] = await user.getSessions() || [];
    } catch (_err) {
      return socket.disconnect();
    }

  }
  if (__internalGetSessionsDoNotUseOutsideOfCore()[username].find(session => session.sessionToken === sessionToken)) {
    return next();

  }
  return socket.disconnect();
});

export { io, activeSockets };


app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use((_req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

if (args["log-requests"]) {
  app.use((req, res, next) => {
    switch (req.method) {
      case "GET":
        log(
          logTypes.info,
          `${ chalk.bgGreen(chalk.whiteBright(" GET ")) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== "{}") {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case "POST":
        log(
          logTypes.info,
          `${ chalk.bgBlue(chalk.whiteBright(" POS ")) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== "{}") {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case "DELETE":
        log(
          logTypes.info, `${ chalk.bgRed(chalk.whiteBright(" DEL ")) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== "{}") {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case "OPTIONS":
        if (args["log-options-requests"]) {
          log(
            logTypes.info,
            `${ chalk.bgCyan(chalk.whiteBright(" OPT ")) } ${ res.statusCode } ${ req.path }`
          );
          if (JSON.stringify(req.query) !== "{}") {
            log(logTypes.info, JSON.stringify(req.query));
          }
        }
        break;
      default:
        log(logTypes.error, `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${ req.method }`);
    }
    next();
  });
}

process.stdin.on("data", data => {
  const commandAndArgs = data.toString().replaceAll("\n", "").replaceAll("\r", "").split(" ");
  const command = commandAndArgs[0];
  // const args = commandAndArgs.slice(1);

  switch (command) {
    case "exit":
      beforeShutdown();
      break;
    default:
      log(logTypes.error, `UNKNOWN COMMAND: ${ command }`);
  }
});

app.get("/", (_req, res) => res.send("Hello from the yourdash server software"));

app.get("/test", (_req, res) => {
  const discoveryStatus: YourDashServerDiscoveryStatus = YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus;

  switch (discoveryStatus) {
    case YourDashServerDiscoveryStatus.MAINTENANCE:
      return res.json({
        status: YourDashServerDiscoveryStatus.MAINTENANCE,
        type: "yourdash"
      });
    case YourDashServerDiscoveryStatus.NORMAL:
      return res.json({
        status: YourDashServerDiscoveryStatus.NORMAL,
        type: "yourdash"
      });
    default:
      console.error("discovery status returned an invalid value");
      return res.json({
        status: YourDashServerDiscoveryStatus.MAINTENANCE,
        type: "yourdash"
      });
  }
});

app.get(
  "/login/background",
  (_req, res) => res.sendFile(path.resolve(
    process.cwd(),
    "./fs/login_background.avif"
  ))
);

app.get("/login/user/:username/avatar", (req, res) => {
  const user = new YourDashUnreadUser(req.params.username);
  return res.sendFile(path.resolve(user.getPath(), "avatar.avif"));
});

app.get("/login/user/:username", async (req, res) => {
  const user = new YourDashUnreadUser(req.params.username);
  if (await user.exists()) {
    return res.json({ name: (await user.read()).getName() });
  } else {
    return res.json({ error: "Unknown user" });
  }
});

app.post("/login/user/:username/authenticate", async (req, res) => {
  const username = req.params.username;
  const password = req.body.password;

  if (!username || username === "") {
    return res.json({ error: "Missing username" });
  }

  if (!password || password === "") {
    return res.json({ error: "Missing password" });
  }

  const user = new YourDashUnreadUser(username);

  const savedHashedPassword = (await fs.readFile(path.resolve(user.getPath(), "./password.txt"))).toString();

  log(logTypes.info, savedHashedPassword);
  log(logTypes.info, password);

  return compareHash(savedHashedPassword, password).then(async result => {
    if (result) {
      const session = await createSession(
        username,
        req.headers?.type === "desktop"
          ? YourDashSessionType.desktop
          : YourDashSessionType.web
      );
      return res.json({
        token: session.sessionToken,
        id: session.id
      });
    } else {
      return res.json({ error: "Incorrect password" });
    }
  }).catch(() => res.json({ error: "Hash comparison failure" }));
});

app.get("/core/panel/logo/small", (_req, res) => res.sendFile(path.resolve(
  process.cwd(),
  "./fs/logo_panel_small.avif"
)));

app.get("/login/is-authenticated", async (req, res) => {
  const {
    username,
    token
  } = req.headers as {
    username?: string;
    token?: string;
  };

  if (!username) {
    return res.json({ error: true });
  }

  if (!token) {
    return res.json({ error: true });
  }

  if (!__internalGetSessionsDoNotUseOutsideOfCore()[username]) {
    try {
      const user = await (new YourDashUnreadUser(username).read());

      __internalGetSessionsDoNotUseOutsideOfCore()[username] = (await user.getSessions()) || [];
    } catch (_err) {
      return res.json({ error: true });
    }
  }

  if (__internalGetSessionsDoNotUseOutsideOfCore()[username].find(session => session.sessionToken === token)) {
    return res.json({ success: true });
  }
  return res.json({ error: true });
});

/**
 --------------------------------------------------------------
 WARNING: all endpoints require authentication after this point
 --------------------------------------------------------------
 */

app.use(async (req, res, next) => {
  const {
    username,
    token
  } = req.headers as {
    username?: string,
    token?: string
  };

  if (!username) {
    return res.json({ error: "authorization fail" });
  }

  if (!token) {
    return res.json({ error: "authorization fail" });
  }

  if (!__internalGetSessionsDoNotUseOutsideOfCore()[username]) {
    try {
      const user = await (new YourDashUnreadUser(username).read());

      __internalGetSessionsDoNotUseOutsideOfCore()[username] = (await user.getSessions()) || [];
    } catch (_err) {
      return res.json({ error: "authorization fail" });
    }
  }

  if (__internalGetSessionsDoNotUseOutsideOfCore()[username].find(session => session.sessionToken === token)) {
    return next();
  }

  return res.json({ error: "authorization fail" });
});

await defineCorePanelRoutes(app);

app.get("/core/sessions", async (req, res) => {
  const { username } = req.headers as {
    username: string
  };

  const user = await (new YourDashUnreadUser(username).read());

  return res.json({ sessions: await user.getSessions() });
});

app.delete("/core/session/:id", async (req, res) => {
  const { username } = req.headers as {
    username: string
  };
  const { id: sessionId } = req.params;

  const user = await (new YourDashUnreadUser(username).read());

  user.getSession(parseInt(sessionId, 10)).invalidate();

  return res.json({ success: true });
});

app.get("/core/personal-server-accelerator/sessions", async (req, res) => {
  const { username } = req.headers as {
    username: string
  };

  const user = await (new YourDashUnreadUser(username).read());

  return res.json({
    sessions: (await user.getSessions()).filter(session => session.type === YourDashSessionType.desktop)
  });
});

app.get("/core/personal-server-accelerator/", async (req, res) => {
  const { username } = req.headers as {
    username: string
  };

  const user = await (new YourDashUnreadUser(username));

  try {
    return JSON.parse((await fs.readFile(path.resolve(user.getPath(), "personal_server_accelerator.json"))).toString());
  } catch (_err) {
    return res.json({ error: `Unable to read ${ username }/personal_server_accelerator.json` });
  }
});

app.post("/core/personal-server-accelerator/", async (req, res) => {
  const { username } = req.headers as {
    username: string
  };
  const body = req.body;

  const user = new YourDashUnreadUser(username);

  try {
    await fs.writeFile(path.resolve(user.getPath(), "personal_server_accelerator.json"), JSON.stringify(body));
  } catch (_err) {
    return res.json({ error: `Unable to write to ${ username }/personal_server_accelerator.json` });
  }

  return res.json({ success: true });
});

app.get("/core/userdb", async (req, res) => {
  const { username } = req.headers as {
    username: string
  };

  const user = new YourDashUnreadUser(username);

  let output = {};

  try {
    const fileData = JSON.parse(fs.readFile(path.resolve(user.getPath(), "./userdb.json")).toString());
    if (fileData) {
      output = fileData;
    } else {
      throw new Error("Unable to read userdb.json");
    }
  } catch (_err) {
    const readUser = await user.read();

    output = {
      "user:username": username,
      "user:full_name": readUser.getName()
    };

    fs.writeFile(path.resolve(user.getPath(), "./userdb.json"), JSON.stringify(output));
  }

  return res.json(output);
});

// TODO: implement this
app.post("/core/userdb", async (req, res) => {
  return 0;

  const { username } = req.headers as {
    username: string
  };

  const user = new YourDashUnreadUser(username);

  let output = {};

  try {
    output = JSON.parse(fs.readFile(path.resolve(user.getPath(), "./userdb.json")).toString());
  } catch (_err) {
    output = {};
    fs.writeFile(path.resolve(user.getPath(), "./userdb.json"), "{}");
  }

  return res.json(output);
});

/*
 * Start listening for requests
 * */
killPort(3560).then(() => {
  try {
    httpServer.listen(3560, () => {
      log(logTypes.info, `${ chalk.yellow.bold("CORE") }: -------------------- server now listening on port 3560! --------------------`);
    });
  } catch (_err) {
    log(logTypes.error, `${ chalk.yellow.bold("CORE") }: Unable to start server!, retrying...`);
    killPort(3560).then(() => {
      killPort(3560).then(() => {
        httpServer.listen(3560, () => {
          log(logTypes.info, `${ chalk.yellow.bold("CORE") }: -------------------- server now listening on port 3560! --------------------`);
        });
      });
    });
  }
});


if (JSON.stringify(globalDatabase.keys) === JSON.stringify({})) {
  await fs.rm(path.resolve(process.cwd(), "./fs/globalDatabase.json"));
}

loadApplications(app, io);
