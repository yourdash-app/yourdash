/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import express from 'express';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import YourDashUser from './../lib/user.js';

export const ENV: {
  FS_ORIGIN: string;
} = {
  FS_ORIGIN: process.env.FS_ORIGIN as string,
};

export const SERVER_CONFIG: {
  name: string;
  defaultBackground: string;
  favicon: string;
  logo: string;
  themeColor: `#${string}`;
  activeModules: string[];
  version: string;
} = JSON.parse(
  fs.readFileSync(path.join(ENV.FS_ORIGIN, './yourdash.config.json')).toString()
);

export function log(string: string) {
  console.log(string);
  // this will also add the log to a separate file with
  // timestamps, a gui extension will also display this data
  // if the user has permissions.
}

console.log(SERVER_CONFIG);

const app = express();

if (
  SERVER_CONFIG.name === undefined ||
  SERVER_CONFIG.defaultBackground === undefined ||
  SERVER_CONFIG.favicon === undefined ||
  SERVER_CONFIG.logo === undefined ||
  SERVER_CONFIG.themeColor === undefined ||
  SERVER_CONFIG.activeModules === undefined ||
  SERVER_CONFIG.version === undefined
) {
  console.log(chalk.redBright('Missing configuration!'));
  process.exit(1);
}

SERVER_CONFIG.activeModules.forEach((module) => {
  import('./modules/' + module + '/index.js').then((mod) => {
    let currentModule = new mod.default();
    currentModule.load(app);
    console.log('loaded module: ' + module);
  });
});

app.use((req, res, next) => {
  let date = new Date();
  switch (req.method) {
    case 'GET':
      log(
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${chalk.bgGrey(
          chalk.green(' GET ')
        )} ${req.path}`
      );
      break;
    case 'POST':
      log(
        `${date.getUTCMilliseconds()} ${chalk.bgGrey(chalk.blue(' GET '))} ${
          req.path
        }`
      );
      break;
    case 'DELETE':
      log(
        `${date.getUTCMilliseconds()} ${chalk.bgGrey(chalk.red(' DELETE '))} ${
          req.path
        }`
      );
      break;
  }
  next();
});

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://yourdash.vercel.app',
      'https://ddsh.vercel.app',
    ],
  })
);

function verifyGithubUserToken() {
  fetch('https://api.github.com/')
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    let userName = req.header('userName');
    let userToken = req.header('userToken');

    // check if the userToken for the userName supplied matches the one on the server
    // fs.readFile(`${ENV.FS_ORIGIN}/data/users/${userName}/`, (err, data) => {});
    next();
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
});

// this is used during the login page to check if the provided url is a yourdash instance
app.get('/test', (req, res) => {
  res.send('yourdash instance');
});

app.get('/api/get/server/config', (req, res) => {
  res.sendFile(path.resolve(`${ENV.FS_ORIGIN}/yourdash.config.json`));
});

app.get('/api/get/server/default/background', (req, res) => {
  res.sendFile(
    path.resolve(`${ENV.FS_ORIGIN}/${SERVER_CONFIG.defaultBackground}`)
  );
});

app.get('/api/get/server/favicon', (req, res) => {
  res.sendFile(path.resolve(`${ENV.FS_ORIGIN}/${SERVER_CONFIG.favicon}`));
});

app.get('/api/get/logo', (req, res) => {
  res.sendFile(path.resolve(`${ENV.FS_ORIGIN}/${SERVER_CONFIG.logo}`));
});

app.get('/api/get/current/user', (req, res) => {
  // let user = JSON.parse(
  //   fs
  //     .readFileSync(
  //       `${ENV.FS_ORIGIN}/data/users/${req.header('userName')}/user.json`
  //     )
  //     .toString()
  // )

  let user = {
    name: 'current user',
    userName: 'currentuser123',
    email: 'error@example.com',
  };

  res.json({
    name: user.name,
    userName: user.userName,
    email: user.email,
    uuid: 'asdfsd-1213dsd-12jdfhw-4qlej49njf',
    profile: {
      image: '',
      location: '',
      status: '',
      banner: '',
      picture: '',
      description: '',
      externalLinks: {
        twitter: '',
      },
    },
    settings: {},
  } as YourDashUser);
});

app.get('/api/server/version', (req, res) => {
  res.send(SERVER_CONFIG.version);
});

app.get('/login/user/:username', (req, res) => {
  if (!req.params.username) return;
});

// the following section of code is for nextcloud application compatability.

app.get('/nextcloud/remote.php/dav/files/:username', (req, res) => {});

app.listen(80, () => {
  console.log('YourDash Server instance live on 127.0.0.1');
});
