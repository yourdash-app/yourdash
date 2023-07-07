// The YourDash project
//  - https://github.com/yourdash-app/yourdash
//  - https://yourdash-app.github.io

import { promises as fs } from "fs";
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
import startRequestLogger from "./core/requestLogger.js";
import { startAuthenticatedImageHelper } from "./core/authenticatedImage.js";
import defineLoginEndpoints from "./core/endpoints/login.js";

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

// save the database before process termination
const handleShutdown = () => {
  log(logTypes.info, "Shutting down... (restart of core should occur automatically)");

  globalDatabase._internalDoNotUseWriteToDiskOnlyIntendedForShutdownSequence(
    path.resolve(process.cwd(), "./fs/globalDatabase.json"),
    () => {

      process.kill(process.pid);
    }
  );
};
process.on("SIGINT", handleShutdown);

// Handle socket.io connections
io.on("connection", (socket: SocketIoSocket<any, any, any, any>) => {
  // Check that all required parameters are present

  if (!socket.handshake.query.username || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId) {
    log(logTypes.error, "[PSA-BACKEND]: Closing connection! Missing required parameters!");

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

  socket.on("execute-command-response", (output: any) => {
    log(logTypes.info, output);
  });

  socket.on("disconnect", () => {
    activeSockets[socket.handshake.query.username as string].forEach(() => {
      activeSockets[socket.handshake.query.username as string].filter(sock => sock.id !== socket.id);
    });

    log(logTypes.info, "[PSA-BACKEND]: Closing PSA connection");
  });

  return;
});

// handle socket.io session authentication
io.use(async (socket: SocketIoSocket<any, any, any, any>, next) => {
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

if (args["log-requests"]) {
  startRequestLogger(app, {
    logOptionsRequests: !!args["log-options-requests"]
  });
}

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use((_req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

process.stdin.on("data", data => {
  const commandAndArgs = data.toString().replaceAll("\n", "").replaceAll("\r", "").split(" ");
  const command = commandAndArgs[0];
  // const args = commandAndArgs.slice(1);

  switch (command) {
    case "exit":
      handleShutdown();
      break;
    default:
      log(logTypes.error, `Unknown command: ${ command }`);
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

startAuthenticatedImageHelper(app);
defineLoginEndpoints(app);

// check for authentication
app.use(async (req, res, next) => {
  const {
    username,
    token
  } = req.headers as {
    username?: string,
    token?: string
  };

  if (!username || !token) {
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

/**
 * --------------------------------------------------------------
 * WARNING: all endpoints require authentication after this point
 * --------------------------------------------------------------
 */

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

  const unreadUser = new YourDashUnreadUser(username);

  try {
    return JSON.parse((await fs.readFile(path.resolve(unreadUser.getPath(), "personal_server_accelerator.json"))).toString());
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

  let output: object;

  try {
    const fileData = JSON.parse(fs.readFile(path.resolve(user.getPath(), "./userdb.json")).toString());
    if (fileData) {
      output = fileData;
    } else {
      const readUser = await user.read();

      output = {
        "user:username": username,
        "user:full_name": readUser.getName()
      };

      await fs.writeFile(path.resolve(user.getPath(), "./userdb.json"), JSON.stringify(output));
    }
  } catch (_err) {
    const readUser = await user.read();

    output = {
      "user:username": username,
      "user:full_name": readUser.getName()
    };

    await fs.writeFile(path.resolve(user.getPath(), "./userdb.json"), JSON.stringify(output));
  }

  return res.json(output);
});

// TODO: implement this
app.post("/core/userdb", async () =>
  0
  //
  // const { username } = req.headers as {
  //   username: string
  // };
  //
  // const user = new YourDashUnreadUser(username);
  //
  // let output = {};
  //
  // try {
  //   output = JSON.parse(fs.readFile(path.resolve(user.getPath(), "./userdb.json")).toString());
  // } catch (_err) {
  //   output = {};
  //   fs.writeFile(path.resolve(user.getPath(), "./userdb.json"), "{}");
  // }
  //
  // return res.json(output);
);

/*
 * Start listening for requests
 */
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
