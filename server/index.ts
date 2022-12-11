/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import bodyParser from 'body-parser';
import chalk from 'chalk';
import { exec } from 'child_process';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { log } from './libServer.js';
import YourDashModule from './module.js';
import startupCheck from './startupCheck.js';

export interface TENV {
  FsOrigin: string;
  UserFs: (_req: express.Request) => string;
  UserAppData: (_req: express.Request) => string;
  DevMode: boolean;
}

export const ENV: TENV = {
  FsOrigin: process.env.FsOrigin as string,
  UserFs: (req) => `${ENV.FsOrigin}/data/users/${req.headers.username}`,
  UserAppData: (req) => `${ENV.FsOrigin}/data/users/${req.headers.username}/AppData`,
  DevMode: process.env.DEV === "true",
};

if (!ENV.FsOrigin) console.error('FsOrigin was not defined.');

export interface YourDashServerConfig {
  name: string;
  defaultBackground: string;
  favicon: string;
  logo: string;
  themeColor: `#${string}`;
  activeModules: string[];
  version: string;
  instanceEncryptionKey: string;
  loginPageConfig: {
    logo: {
      src: string;
      position: {
        top: string | null;
        left: string | null;
        bottom: string | null;
        right: string | null;
      };
    };
    background: {
      src: string;
    };
    message: {
      content: string;
      position: {
        top: string | null;
        left: string | null;
        bottom: string | null;
        right: string | null;
      };
    };
  };
}

startupCheck(async () => {
  const SERVER_CONFIG: YourDashServerConfig = JSON.parse(
    fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString()
  );

  switch (true) {
    // eslint-disable-next-line no-fallthrough
    case !(SERVER_CONFIG?.activeModules instanceof Array):
      console.log(SERVER_CONFIG?.activeModules)
      log("(Start up) ERROR: yourdash.config.json is missing the 'activeModules' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.defaultBackground === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'defaultBackground' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.favicon === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'favicon' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.instanceEncryptionKey === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'instanceEncryptionKey' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.logo === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'logo' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.name === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'name' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.themeColor === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'themeColor' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.version === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'version' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(SERVER_CONFIG?.loginPageConfig instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(SERVER_CONFIG?.loginPageConfig?.background instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.background' property!")  
      process.exit(1);
      // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.background.src === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.background.src' property!")  
      process.exit(1);
      // eslint-disable-next-line no-fallthrough
    case !(SERVER_CONFIG?.loginPageConfig?.logo instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo' property!")  
      process.exit(1);
      // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.src === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.src' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(SERVER_CONFIG?.loginPageConfig?.logo?.position instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.left === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.left === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.left' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.top === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.top === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.top' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.right === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.right === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.right' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.bottom === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.bottom === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.bottom' property!")  
      process.exit(1);
      // eslint-disable-next-line no-fallthrough
    case !(SERVER_CONFIG?.loginPageConfig?.message instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.content === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.content' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(SERVER_CONFIG?.loginPageConfig?.message?.position instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.left === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.left === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.left' property!")  
      process.exit(1)
      // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.top === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.top === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.top' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.right === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.right === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.right' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.bottom === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.bottom === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.bottom' property!")  
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case !SERVER_CONFIG.activeModules.includes('core'):
      console.error(
        chalk.redBright(
          `(Start up) ERROR: the 'core' module is not enabled in yourdash.config.json`
        )
      );
      process.exit(1)
    // eslint-disable-next-line no-fallthrough
    case !SERVER_CONFIG.activeModules.includes('userManagement'):
      console.error(
        chalk.redBright(
          `(Start up) ERROR: the 'userManagement' module is not enabled in yourdash.config.json`
        )
      )
      process.exit(1)
    // eslint-disable-next-line no-fallthrough
    default:
      log("(Start up) yourdash.config.json has the required properties!")
  }

  const app = express();

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', "YourDash Instance Server");
    next()
  })

  let loadedModules: YourDashModule[] = [];

  // TODO: implement the server module unload and install methods
  if (ENV.DevMode) {
    log("(Start up) starting with all modules loaded due to the DEV environment variable being set to true.")
    fs.readdir(path.resolve(`./modules/`), (err, data) => {
      if (err) {
        log(`(Start up) error reading the './modules/' directory.`)
        process.exit(1)
      }
      data.forEach((module) => {
        if (!fs.existsSync(path.resolve(`./modules/${module}/index.js`))) return log(`(Start up) no such module: ${module}! modules require an index.js file!`);
        import('./modules/' + module + '/index.js').then((mod) => {
          let currentModule = mod.default;
          currentModule.load(app, {
            SERVER_CONFIG: SERVER_CONFIG, ...ENV 
          });
          log('(Start up) loaded module: ' + module);
          loadedModules.push(currentModule);
        });
      });
    })
  } else {
    SERVER_CONFIG.activeModules.forEach((module) => {
      if (!fs.existsSync(path.resolve(`./modules/${module}/index.js`))) return log('(Start up) no such module: ' + module + ", non-existent modules should not be listed in the activeModules found in yourdash.config.json");
      import('./modules/' + module + '/index.js').then((mod) => {
        let currentModule = mod.default;
        currentModule.load(app, {
          SERVER_CONFIG: SERVER_CONFIG, ...ENV 
        });
        log('(Start up) loaded module: ' + module);
        loadedModules.push(currentModule);
      });
    });
  }

  // log all received requests
  app.use((req, _res, next) => {
    let date = new Date();
    switch (req.method) {
      case 'GET':
        log(
          `${date.getHours()}:${date.getMinutes()}:${
            date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgGreen(chalk.whiteBright(' GET '))} ${req.path}`
        );
        break;
      case 'POST':
        log(
          `${date.getHours()}:${date.getMinutes()}:${
            date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgBlue(chalk.whiteBright(' POST '))} ${req.path}`
        );
        break;
      case 'DELETE':
        log(
          `${date.getHours()}:${date.getMinutes()}:${
            date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgRed(chalk.whiteBright(' DELETE '))} ${req.path}`
        );
        break;
    }
    next();
  });

  app.use(
    cors({
      origin: [ 'http://localhost:3000', 'https://yourdash.vercel.app', 'https://ddsh.vercel.app' ],
    })
  );

  setInterval(() => {
    console.log('attempting update');
    exec('git pull');
    process.exit();
  }, 43200000);
  
  app.listen(3560, () => {
    log('(Start up) Web server now online :D');
  });
});
