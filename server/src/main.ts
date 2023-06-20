/** @format */

// The YourDash project
//  - https://github.com/yourdash-app/yourdash
//  - https://yourdash-app.github.io

import {existsSync as fsExistsSync, promises as fs} from 'fs';
import path from 'path';
import * as http from 'http';
import cors from 'cors';
import express from 'express';
import sharp from 'sharp';
import {Server as SocketIoServer, Socket as SocketIoSocket} from 'socket.io';
import chalk from 'chalk';
import minimist from 'minimist';
import {YourDashSessionType, type IYourDashSession} from '../../shared/core/session.js';
import log, {logTypes} from './helpers/log.js';
import YourDashUnreadApplication from './helpers/applications.js';
import {base64ToDataUrl} from './helpers/base64.js';
import {compareHash} from './helpers/encryption.js';
import {generateLogos} from './helpers/logo.js';
import YourDashPanel from './helpers/panel.js';
import YourDashUnreadUser, {YourDashUserPermissions} from './helpers/user.js';
import {createSession} from './helpers/session.js';
import globalDatabase from './helpers/globalDatabase.js';

const args = minimist(process.argv.slice(2));

global.args = args;

const SESSIONS: {
  [ key: string ]: IYourDashSession<any>[]
} = {};

function __internalGetSessions() {
  return SESSIONS;
}

const SESSION_TOKEN_LENGTH = 128;

enum YourDashServerDiscoveryStatus {
  // eslint-disable-next-line no-unused-vars
  MAINTENANCE, NORMAL, HIDDEN
}

export {args, __internalGetSessions, SESSION_TOKEN_LENGTH, YourDashServerDiscoveryStatus};

async function startupChecks() {
  // check if the filesystem exists
  if (!fsExistsSync(path.resolve(process.cwd(), './fs/'))) {
    await fs.mkdir(
      path.resolve(
        process.cwd(),
        './fs/'
      ));
    await fs.cp(
      path.resolve(
        process.cwd(),
        './src/assets/default_avatar.avif'
      ), path.resolve(process.cwd(), './fs/default_avatar.avif'
      ));
    await fs.cp(
      path.resolve(
        process.cwd(),
        './src/assets/default_instance_logo.avif'
      ), path.resolve(process.cwd(), './fs/instance_logo.avif'
      ));
    await fs.cp(
      path.resolve(
        process.cwd(),
        './src/assets/default_login_background.avif'
      ), path.resolve(process.cwd(), './fs/login_background.avif'
      ));
    await fs.mkdir(
      path.resolve(
        process.cwd(),
        './fs/users/'
      ));

    // generate all instance logos
    generateLogos();
  }

  for (const user of (await fs.readdir(path.resolve('./fs/users/')))) {
    await (await new YourDashUnreadUser(user).read()).verifyUserConfig().write();
  }

  const adminUserUnread = new YourDashUnreadUser('admin');

  if (!(await adminUserUnread.exists())) {
    await adminUserUnread.create(
      'password',
      {
        first: 'Admin',
        last: 'istrator'
      },
      [YourDashUserPermissions.Administrator]
    );
  }
}

await startupChecks();

if (fsExistsSync(path.resolve(process.cwd(), './fs/globalDatabase.json'))) {
  globalDatabase.readFromDisk(path.resolve(process.cwd(), './fs/globalDatabase.json'));
  log(logTypes.success, 'Global database loaded');
}

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
  log(logTypes.info, 'Shutting down...');
  globalDatabase.writeToDisk(path.resolve(process.cwd(), './fs/globalDatabase.json')).then(() =>
    // eslint-disable-next-line no-process-exit
    process.kill(process.pid, 'SIGINT')
  );
};

process.on('SIGINT', beforeShutdown);
process.on('SIGTERM', beforeShutdown);

io.on('connection', socket => {
  // Check that all required parameters are present
  if (!socket.handshake.query.username || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId) {

    log(
      logTypes.info,
      socket.handshake.query.username,
      socket.handshake.query.sessionToken,
      socket.handshake.query.sessionId
    );

    log(logTypes.error, '[PSA-BACKEND]: Missing required parameters');

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

  socket.on('execute-command-response', output => {
    log(output);
  });

  socket.on('disconnect', () => {
    activeSockets[socket.handshake.query.username as string].forEach((value, key) => {
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
  if (!__internalGetSessions()[username]) {
    try {
      const user = await (new YourDashUnreadUser(username).read());

      __internalGetSessions()[username] = (await user.getSessions()) || [];
    } catch (_err) {
      return socket.disconnect();
    }

  }
  if (__internalGetSessions()[username].find(session => session.sessionToken === sessionToken)) {
    return next();

  }
  return socket.disconnect();

});

export {io, activeSockets};


app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use((_req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

if (args['log-requests']) {
  app.use((req, res, next) => {
    const date = new Date();
    switch (req.method) {
      case 'GET':
        log(
          logTypes.info,
          `${ chalk.bgGreen(chalk.whiteBright(' GET ')) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== '{}') {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case 'POST':
        log(
          logTypes.info,
          `${ chalk.bgBlue(chalk.whiteBright(' POS ')) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== '{}') {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case 'DELETE':
        log(
          logTypes.info, `${ chalk.bgRed(chalk.whiteBright(' DEL ')) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== '{}') {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      default:
        log(logTypes.error, `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${ req.method }`);
    }
    next();
  });
}

process.stdin.on('data', data => {
  const commandAndArgs = data.toString().replaceAll('\n', '').replaceAll('\r', '').split(' ');
  const command = commandAndArgs[0];
  const args = commandAndArgs.slice(1);

  switch (command) {
    case 'exit':
      beforeShutdown();
      break;
    default:
      log(logTypes.error, `UNKNOWN COMMAND: ${ command }`);
  }
});

app.get('/', (_req, res) => res.send('Hello from the yourdash server software'));

app.get('/test', (_req, res) => {
  const discoveryStatus: YourDashServerDiscoveryStatus = YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus;

  switch (discoveryStatus) {
    case YourDashServerDiscoveryStatus.MAINTENANCE:
      return res.json({
        status: YourDashServerDiscoveryStatus.MAINTENANCE,
        type: 'yourdash'
      });
    case YourDashServerDiscoveryStatus.NORMAL:
      return res.json({
        status: YourDashServerDiscoveryStatus.NORMAL,
        type: 'yourdash'
      });
    default:
      console.error('discovery status returned an invalid value');
      return res.json({
        status: YourDashServerDiscoveryStatus.MAINTENANCE,
        type: 'yourdash'
      });
  }
});

app.get(
  '/login/background',
  (_req, res) => res.sendFile(path.resolve(
    process.cwd(),
    './fs/login_background.avif'
  ))
);

app.get('/login/user/:username/avatar', (req, res) => {
  const user = new YourDashUnreadUser(req.params.username);
  return res.sendFile(path.resolve(user.getPath(), 'avatar.avif'));
});

app.get('/login/user/:username', async (req, res) => {
  const user = new YourDashUnreadUser(req.params.username);
  if (await user.exists()) {
    return res.json({name: (await user.read()).getName()});
  } else {
    return res.json({error: 'Unknown user'});
  }
});

app.post('/login/user/:username/authenticate', (req, res) => {
  const username = req.params.username;
  const password = req.body.password;

  if (!username || username === '') {
    return res.json({error: true});
  }

  if (!password || password === '') {
    return res.json({error: true});
  }

  const user = new YourDashUnreadUser(username);

  const savedHashedPassword = (fs.readFile(path.resolve(user.getPath(), './password.txt'))).toString();

  return compareHash(savedHashedPassword, password).then(async result => {
    if (result) {
      const session = await createSession(
        username,
        req.headers?.type === 'desktop'
          ? YourDashSessionType.desktop
          : YourDashSessionType.web
      );
      return res.json({
        token: session.sessionToken,
        id: session.id
      });
    } else {
      return res.json({error: true});
    }
  }).catch(_err => res.json({error: true}));
});

app.get('/core/panel/logo/small', (_req, res) => res.sendFile(path.resolve(
  process.cwd(),
  './fs/logo_panel_small.avif'
)));

app.get('/login/is-authenticated', async (req, res) => {
  const {
    username,
    token
  } = req.headers as {
    username?: string;
    token?: string;
  };

  if (!username) {
    return res.json({error: true});
  }

  if (!token) {
    return res.json({error: true});
  }

  if (!SESSIONS[username]) {
    try {
      const user = await (new YourDashUnreadUser(username).read());

      SESSIONS[username] = (await user.getSessions()) || [];
    } catch (_err) {
      return res.json({error: true});
    }
  }

  if (SESSIONS[username].find(session => session.sessionToken === token)) {
    return res.json({success: true});
  }
  return res.json({error: true});
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
    return res.json({error: 'authorization fail'});
  }

  if (!token) {
    return res.json({error: 'authorization fail'});
  }

  if (!__internalGetSessions()[username]) {
    try {
      const user = await (new YourDashUnreadUser(username).read());

      SESSIONS[username] = (await user.getSessions()) || [];
    } catch (_err) {
      return res.json({error: 'authorization fail'});
    }
  }

  if (__internalGetSessions()[username].find(session => session.sessionToken === token)) {
    return next();
  }

  return res.json({error: 'authorization fail'});
});

app.get('/core/core/panel/quick-shortcuts/applications', async (_req, res) => {
  Promise.all((globalDatabase.getValue('installed_applications') || ['dash', 'settings']).map(async app => {
    const application = await new YourDashUnreadApplication(app).read();
    return new Promise(async resolve => {
      sharp(
        await fs.readFile(path.resolve(
          process.cwd(),
          `./src/apps/${ app }/icon.avif`
        ))
      ).resize(98, 98).toBuffer((err, buf) => {
        if (err) {
          resolve({error: true});
        }

        resolve({
          name: application.getName(),
          displayName: application.getDisplayName(),
          description: application.getDescription(),
          icon: base64ToDataUrl(buf.toString('base64'))
        });
      });
    });
  })).then(resp => res.json(resp));
});

app.get('/core/panel/user-full-name', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };
  const user = (await new YourDashUnreadUser(username).read());
  return res.json(user.getName());
});

app.get('/core/panel/quick-shortcuts', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };

  const panel = new YourDashPanel(username);

  return res.json(await panel.getQuickShortcuts());
});

app.delete('/core/panel/quick-shortcuts:ind', async (req, res) => {
  const {ind} = req.params;
  const {username} = req.headers as {
    username: string
  };

  const panel = new YourDashPanel(username);

  await panel.removeQuickShortcut(parseInt(ind, 10));

  return res.json({success: true});
});

app.post('/core/panel/quick-shortcuts/create', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };
  const {
    displayName,
    name
  } = req.body as {
    displayName: string;
    name: string;
  };

  const panel = new YourDashPanel(username);
  const application = new YourDashUnreadApplication(name);

  try {
    await panel.createQuickShortcut(
      displayName,
      `/app/a/${ name }`,
      await fs.readFile(path.resolve(application.getPath(), './icon.avif'))
    );
    return res.json({success: true});
  } catch (_err) {
    return res.json({error: true});
  }
});

app.get('/core/panel/position', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };

  const panel = new YourDashPanel(username);

  return res.json({position: await panel.getPanelPosition()});
});

app.get('/core/panel/quick-shortcuts', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };

  const panel = new YourDashPanel(username);

  return res.json({launcher: await panel.getLauncherType()});
});

app.get('/core/sessions', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };

  const user = await (new YourDashUnreadUser(username).read());

  return res.json({sessions: await user.getSessions()});
});

app.delete('/core/session/:id', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };
  const {id: sessionId} = req.params;

  const user = await (new YourDashUnreadUser(username).read());

  user.getSession(parseInt(sessionId, 10)).invalidate();

  return res.json({success: true});
});

app.get('/core/personal-server-accelerator/sessions', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };

  const user = await (new YourDashUnreadUser(username).read());

  return res.json({
    sessions: (await user.getSessions()).filter(session => session.type === YourDashSessionType.desktop)
  });
});

app.get('/core/personal-server-accelerator/', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };

  const user = await (new YourDashUnreadUser(username));

  try {
    return JSON.parse((await fs.readFile(path.resolve(user.getPath(), 'personal_server_accelerator.json'))).toString());
  } catch (_err) {
    return res.json({error: `Unable to read ${ username }/personal_server_accelerator.json`});
  }
});

app.post('/core/personal-server-accelerator/', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };
  const body = req.body;

  const user = new YourDashUnreadUser(username);

  try {
    await fs.writeFile(path.resolve(user.getPath(), 'personal_server_accelerator.json'), JSON.stringify(body));
  } catch (_err) {
    return res.json({error: `Unable to write to ${ username }/personal_server_accelerator.json`});
  }

  return res.json({success: true});
});

app.get('/core/userdb', async (req, res) => {
  const {username} = req.headers as {
    username: string
  };

  const user = new YourDashUnreadUser(username);

  let output = {};

  try {
    output = JSON.parse(fs.readFile(path.resolve(user.getPath(), './userdb.json')).toString()) || {};
  } catch (_err) {
    output = {};
    fs.writeFile(path.resolve(user.getPath(), './userdb.json'), '{}');
  }

  return res.json(output);
});

// TODO: implement this
app.post('/core/userdb', async (req, res) => {
  return 0;

  const {username} = req.headers as {
    username: string
  };

  const user = new YourDashUnreadUser(username);

  let output = {};

  try {
    output = JSON.parse(fs.readFile(path.resolve(user.getPath(), './userdb.json')).toString());
  } catch (_err) {
    output = {};
    fs.writeFile(path.resolve(user.getPath(), './userdb.json'), '{}');
  }

  return res.json(output);
});

/*
 * Start listening for requests
 * */

httpServer.listen(3560, () => {
  log(logTypes.info, `${ chalk.yellow.bold('CORE') }: ---------- server now listening on port 3560! ----------`);
});

/*
 * Load all installed Applications
 */

if (fsExistsSync(path.resolve(process.cwd(), './src/apps/'))) {
  const apps = (globalDatabase.getValue('installed_applications') || ['dash', 'settings']);
  apps.forEach(appName => {
    if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${ appName }/index.js`))) {
      log(logTypes.error, `${ chalk.yellow.bold('CORE') }: Unknown application: ${ appName }!`);
      return;
    }

    log(logTypes.info, `${ chalk.yellow.bold('CORE') }: Loading application: ${ appName }`);

    // import and load all applications
    import(
      `./apps/${ appName }/index.js`
    ).then(mod => {
      try {
        log(logTypes.info, `${ chalk.yellow.bold('CORE') }: Starting application: ${ appName }`);
        mod.default({
          app,
          io
        });
        log(logTypes.success, `${ chalk.yellow.bold('CORE') }: Initialized application: ${ appName }`);
      } catch (err) {
        log(logTypes.error, `${ chalk.yellow.bold('CORE') }: Error during application initialization: ${ appName }`);
      }
    }).catch(err => {
      console.error(`Error while loading application: ${ appName }`, err);
    });
  });
} else {
  log(logTypes.error, `${ chalk.yellow.bold('CORE') }: No applications found!`);
}
