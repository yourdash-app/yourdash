
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
import { RequestManager, log } from './libServer.js';
import https from "https"
import YourDashModule from './module.js';
import startupCheck from './startupCheck.js';

export const RELEASE_CONFIGURATION = { CURRENT_VERSION: 1, }

export interface IEnv {
  FsOrigin: string;
  UserFs: (_req: express.Request) => string;
  UserAppData: (_req: express.Request) => string;
  DevMode: boolean;
  ModulePath: (_module: { name: string }) => string
}

export const ENV: IEnv = {
  DevMode: process.env.DEV === "true",
  FsOrigin: process.env.FsOrigin as string,
  ModulePath: (module) => `/api/${module.name}`,
  UserAppData: (req) => `${ENV.FsOrigin}/data/users/${req.headers.username}/AppData`,
  UserFs: (req) => `${ENV.FsOrigin}/data/users/${req.headers.username}`,
};

if (!process.geteuid) {
  log(`(Start up) ERROR: not running under a linux platform`)
  process.exit(1)
}

if (!ENV.FsOrigin) console.error('FsOrigin was not defined.');

export interface YourDashServerConfig {
  name: string;
  defaultBackground: string;
  favicon: string;
  logo: string;
  themeColor: `#${string}`;
  activeModules: string[];
  version: number;
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

function applicationStartup() {
  const SERVER_CONFIG = JSON.parse(
    fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString()
  );

  log(`(Start up) EnvironmentVariable FsOrigin detected as: ${path.resolve(ENV.FsOrigin)}`)
  if (ENV.DevMode)
    log(`(Start up) EnvironmentVariable Dev detected as: ${ENV.DevMode}`)

  switch (true) {
    case !(SERVER_CONFIG?.activeModules instanceof Array):
      console.log(SERVER_CONFIG?.activeModules)
      log("(Start up) ERROR: yourdash.config.json is missing the 'activeModules' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.defaultBackground === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'defaultBackground' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.favicon === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'favicon' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.instanceEncryptionKey === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'instanceEncryptionKey' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.logo === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'logo' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.name === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'name' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.themeColor === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'themeColor' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.version === "number"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'version' property!")
      process.exit(1);
    case !(SERVER_CONFIG?.loginPageConfig instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig' property!")
      process.exit(1);
    case !(SERVER_CONFIG?.loginPageConfig?.background instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.background' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.background.src === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.background.src' property!")
      process.exit(1);
    case !(SERVER_CONFIG?.loginPageConfig?.logo instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.src === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.src' property!")
      process.exit(1);
    case !(SERVER_CONFIG?.loginPageConfig?.logo?.position instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.left === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.left === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.left' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.top === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.top === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.top' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.right === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.right === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.right' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.bottom === "string" || typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.bottom === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.bottom' property!")
      process.exit(1);
    case !(SERVER_CONFIG?.loginPageConfig?.message instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.content === "string"):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.content' property!")
      process.exit(1);
    case !(SERVER_CONFIG?.loginPageConfig?.message?.position instanceof Object):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.left === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.left === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.left' property!")
      process.exit(1)
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.top === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.top === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.top' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.right === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.right === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.right' property!")
      process.exit(1);
    case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.bottom === "string" || typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.bottom === typeof null):
      log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.bottom' property!")
      process.exit(1);
    case !SERVER_CONFIG.activeModules.includes('core'):
      console.error(
        chalk.redBright(
          `(Start up) ERROR: the 'core' module is not enabled in yourdash.config.json`
        )
      );
      process.exit(1)
    case !SERVER_CONFIG.activeModules.includes('userManagement'):
      console.error(
        chalk.redBright(
          `(Start up) ERROR: the 'userManagement' module is not enabled in yourdash.config.json`
        )
      )
      process.exit(1)
    case !SERVER_CONFIG.activeModules.includes('files'):
      console.error(
        chalk.redBright(
          `(Start up) ERROR: the 'userManagement' module is not enabled in yourdash.config.json`
        )
      )
      process.exit(1)
    case !SERVER_CONFIG.activeModules.includes('store'):
      console.error(
        chalk.redBright(
          `(Start up) ERROR: the 'userManagement' module is not enabled in yourdash.config.json`
        )
      )
      process.exit(1)
    default:
      log("(Start up) yourdash.config.json has the required properties!")
  }

  const app = express();

  app.use(bodyParser.json({ limit: '50mb', }));

  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', "YourDash Instance Server");
    next()
  })

  let loadedModules: YourDashModule[] = [];
  let modulesToLoad: string[] = []

  // TODO: implement the server module unload and install methods
  // if in DevMode add all modules to modulesToLoad
  // else add only the modules found in the yourdash.config.json file
  if (ENV.DevMode) {
    log("(Start up) starting with all modules loaded due to the DEV environment variable being set to true.")
    modulesToLoad = fs.readdirSync(path.resolve(`./modules/`))
  } else {
    modulesToLoad = SERVER_CONFIG.activeModules
  }

  log(modulesToLoad.toString())

  // load all modules found in modulesToLoad
  modulesToLoad.forEach((module) => {
    if (!fs.existsSync(path.resolve(`./modules/${module}/index.js`))) return log('(Start up) no such module: ' + module + ", non-existent modules should not be listed in the activeModules found in yourdash.config.json");
    import('./modules/' + module + '/index.js').then((mod) => {
      const currentModule = mod.default;
      currentModule.load(new RequestManager(app, currentModule), {
        SERVER_CONFIG: SERVER_CONFIG, ...ENV
      });
      log('(Start up) loaded module: ' + module);
      loadedModules.push(currentModule);
    });
  });

  process.on("exit", () => {
    loadedModules.forEach((module) => {
      module.unload()
    })
    loadedModules = []
  })

  // log all received requests
  app.use((req, res, next) => {
    const date = new Date();
    switch (req.method) {
      case 'GET':
        log(
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgGreen(chalk.whiteBright(' GET '))} ${res.statusCode} ${req.path}`
        );
        break;
      case 'POST':
        log(
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgBlue(chalk.whiteBright(' POS '))} ${res.statusCode} ${req.path}`
        );
        break;
      case 'DELETE':
        log(
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgRed(chalk.whiteBright(' DEL '))} ${res.statusCode} ${req.path}`
        );
        break;
      case 'OPTIONS':
        log(
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgMagenta(chalk.whiteBright(' OPT '))} ${res.statusCode} ${req.path}`
        )
        break;
    }
    next();
  });

  app.use(
    cors({ origin: [ 'http://localhost:3000', 'https://yourdash.vercel.app', 'https://ddsh.vercel.app', '*ewsgit-github.vercel.app' ], })
  );

  setInterval(() => {
    console.log('attempting update');
    exec('git pull');
    process.exit();
  }, 43200000);

  if (ENV.DevMode) {
    app.listen(
      3560,
      () => {
        log('(Start up) Web server now online :D');
      }
    ).on(
      "error",
      (err) => {
        log(`(Start up) CRITICAL ERROR: (${err.name}) ${err.message}`)
      }
    )
  } else {
    if (!fs.existsSync(`/etc/letsencrypt/live`)) {
      log(`(Start up) CRITICAL ERROR: /etc/letsencrypt/live not found, terminating server software`)
      return process.exit(1)
    }

    fs.readdir(`/etc/letsencrypt/live`, (err, files) => {
      if (err) {
        log(`(Start up) CRITICAL ERROR: /etc/letsencrypt/live couldn't be read, terminating server software`)
        return process.exit(1)
      }

      let indToRead = 0

      if (files[ 0 ] === "README")
        indToRead = 1

      fs.readFile(`/etc/letsencrypt/live/${files[ indToRead ]}/privkey.pem`, (err, data) => {
        if (err) {
          log(`(Start up) CRITICAL ERROR: /etc/letsencrypt/live/${files[ 1 ]}/privkey.pem not found or couldn't be read, terminating server software`)
          return process.exit(1)
        }
        const TLSKey = data.toString()
        fs.readFile(`/etc/letsencrypt/live/${files[ indToRead ]}/fullchain.pem`, (err, data) => {
          if (err) {
            log(`(Start up) CRITICAL ERROR: CRITICAL ERROR: /etc/letsencrypt/live/${files[ indToRead ]}/fullchain.pem not found or couldn't be read, terminating server software`)
            return process.exit(1)
          }
          const TLSCert = data.toString()
          https.createServer(
            {
              cert: TLSCert,
              key: TLSKey,
            },
            app
          ).listen(3560)
        })
      })
    })
  }
};

startupCheck(() => applicationStartup())
