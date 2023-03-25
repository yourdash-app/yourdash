import bodyParser from "body-parser";
import chalk from "chalk";
import {exec} from "child_process";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import {log, RequestManager} from "./libServer.js";
import https from "https";
import startupCheck from "./startupCheck.js";
import * as dotenv from "dotenv";

export const RELEASE_CONFIGURATION = {CURRENT_VERSION: 1};
dotenv.config();
export const ENV = {
    DevMode: process.env.DEV === "true",
    FsOrigin: process.env.FsOrigin,
    ModulePath: (module) => {
        return `/api/${module.name}`;
    },
    UserAppData: (req) => {
        return `${ENV.FsOrigin}/data/users/${req.headers.username}/AppData`;
    },
    UserFs: (req) => {
        return `${ENV.FsOrigin}/data/users/${req.headers.username}`;
    },
    PublicUrl: process.env.PublicUrl || "http://localhost:3560",
};
if (!ENV.FsOrigin)
    console.error("FsOrigin was not defined.");

function applicationStartup() {
    const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString());
    log(`(Start up) EnvironmentVariable FsOrigin detected as: ${path.resolve(ENV.FsOrigin)}`);
    if (ENV.DevMode)
        log(`(Start up) EnvironmentVariable Dev detected as: ${ENV.DevMode}`);
    switch (true) {
        case !(SERVER_CONFIG?.activeModules instanceof Array):
            console.log(SERVER_CONFIG?.activeModules);
            log("(Start up) ERROR: yourdash.config.json is missing the 'activeModules' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.defaultBackground === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'defaultBackground' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.favicon === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'favicon' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.instanceEncryptionKey === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'instanceEncryptionKey' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.logo === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'logo' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.name === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'name' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.themeColor === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'themeColor' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.version === "number"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'version' property!");
            process.exit(1);
            break;
        case !(SERVER_CONFIG?.loginPageConfig instanceof Object):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig' property!");
            process.exit(1);
            break;
        case !(SERVER_CONFIG?.loginPageConfig?.background instanceof Object):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.background' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.background.src === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.background.src' property!");
            process.exit(1);
            break;
        case !(SERVER_CONFIG?.loginPageConfig?.logo instanceof Object):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.src === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.src' property!");
            process.exit(1);
            break;
        case !(SERVER_CONFIG?.loginPageConfig?.logo?.position instanceof Object):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.left === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.left === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.left' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.top === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.top === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.top' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.right === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.right === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.right' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.bottom === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.logo?.position?.bottom === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.logo.position.bottom' property!");
            process.exit(1);
            break;
        case !(SERVER_CONFIG?.loginPageConfig?.message instanceof Object):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.content === "string"):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.content' property!");
            process.exit(1);
            break;
        case !(SERVER_CONFIG?.loginPageConfig?.message?.position instanceof Object):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.left === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.left === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.left' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.top === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.top === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.top' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.right === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.right === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.right' property!");
            process.exit(1);
            break;
        case !(typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.bottom === "string" ||
            typeof SERVER_CONFIG?.loginPageConfig?.message?.position?.bottom === typeof null):
            log("(Start up) ERROR: yourdash.config.json is missing the 'loginPageConfig.message.position.bottom' property!");
            process.exit(1);
            break;
        case !SERVER_CONFIG.activeModules.includes("core"):
            console.error(chalk.redBright(`(Start up) ERROR: the 'core' module is not enabled in yourdash.config.json`));
            process.exit(1);
            break;
        case !SERVER_CONFIG.activeModules.includes("userManagement"):
            console.error(chalk.redBright(`(Start up) ERROR: the 'userManagement' module is not enabled in yourdash.config.json`));
            process.exit(1);
            break;
        case !SERVER_CONFIG.activeModules.includes("files"):
            console.error(chalk.redBright(`(Start up) ERROR: the 'userManagement' module is not enabled in yourdash.config.json`));
            process.exit(1);
            break;
        case !SERVER_CONFIG.activeModules.includes("store"):
            console.error(chalk.redBright(`(Start up) ERROR: the 'userManagement' module is not enabled in yourdash.config.json`));
            process.exit(1);
            break;
        default:
            log("(Start up) yourdash.config.json has the required properties!");
    }
    const app = express();
    app.use(bodyParser.json({limit: "50mb"}));
    app.use((req, res, next) => {
        res.setHeader("X-Powered-By", "YourDash Instance Index");
        next();
    });
    if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/cache/images`))) {
        try {
            fs.mkdirSync(path.resolve(`${ENV.FsOrigin}/cache/images`), {recursive: true});
        } catch (e) {
            log(`[Image Cache Startup] ERROR: unable to create a cache folder, server will no terminate. ${e}`);
            process.exit(1);
        }
    } else {
        fs.rmSync(path.resolve(`${ENV.FsOrigin}/cache/images/`), {recursive: true});
        try {
            fs.mkdirSync(path.resolve(`${ENV.FsOrigin}/cache/images`), {recursive: true});
        } catch (e) {
            log(`[Image Cache Startup] ERROR: unable to create a cache folder, server will no terminate. ${e}`);
            process.exit(1);
        }
    }
    setInterval(() => {
        fs.rmSync(path.resolve(`${ENV.FsOrigin}/cache/images/`), {recursive: true});
        try {
            fs.mkdirSync(path.resolve(`${ENV.FsOrigin}/cache/images`), {recursive: true});
        } catch (e) {
            log(`[Image Cache Startup] ERROR: unable to create a cache folder, server will no terminate. ${e}`);
            process.exit(1);
        }
    }, 1200000);
    app.get(`/api/images/cache/:imageName`, (req, res) => {
        return res.sendFile(path.resolve(`${ENV.FsOrigin}/cache/images/${req.params.imageName}.png`));
    });
    let loadedModules = [];
    let modulesToLoad = [];
    if (ENV.DevMode) {
        log("(Start up) starting with all modules loaded due to the DEV environment variable being set to true.");
        modulesToLoad = fs.readdirSync(path.resolve(`./modules/`));
    } else {
        modulesToLoad = SERVER_CONFIG.activeModules;
    }
    log(modulesToLoad.toString());
    modulesToLoad.forEach((moduleName) => {
        if (!fs.existsSync(path.resolve(`./modules/${moduleName}/index.js`)))
            return log(`(Start up) no such module: ${moduleName}, non-existent modules should not be listed in the activeModules found in yourdash.config.json`);
        import(`./modules/${moduleName}/index.js`).then((mod) => {
            const currentModule = mod.default;
            const requestManager = new RequestManager(app, currentModule, moduleName);
            currentModule.load(requestManager, {
                SERVER_CONFIG,
                ...ENV,
            });
            log(`(Start up) loaded module: ${moduleName}`);
            loadedModules.push(currentModule);
        });
    });
    process.on("exit", () => {
        loadedModules.forEach((module) => {
            module.unload();
        });
        loadedModules = [];
    });
    app.use((req, res, next) => {
        const date = new Date();
        switch (req.method) {
            case "GET":
                log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? `${date.getSeconds()}0` : date.getSeconds()} ${chalk.bgGreen(chalk.whiteBright(" GET "))} ${res.statusCode} ${req.path}`);
                if (JSON.stringify(req.query) !== "{}")
                    log(JSON.stringify(req.query));
                break;
            case "POST":
                log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? `${date.getSeconds()}0` : date.getSeconds()} ${chalk.bgBlue(chalk.whiteBright(" POS "))} ${res.statusCode} ${req.path}`);
                if (JSON.stringify(req.query) !== "{}")
                    log(JSON.stringify(req.query));
                break;
            case "DELETE":
                log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? `${date.getSeconds()}0` : date.getSeconds()} ${chalk.bgRed(chalk.whiteBright(" DEL "))} ${res.statusCode} ${req.path}`);
                if (JSON.stringify(req.query) !== "{}")
                    log(JSON.stringify(req.query));
                break;
        }
        next();
    });
    app.use(cors({
        origin: [
            ENV.DevMode ? true : "http://localhost:3000",
            "https://yourdash.vercel.app",
            "https://ddsh.vercel.app",
            "https://*ewsgit-github.vercel.app.bak",
        ],
    }));
    app.get(`/`, (req, res) => {
        return res.redirect(`https://yourdash.vercel.app/server/${req.url}`);
    });
    setInterval(() => {
        console.log("attempting update");
        exec("git pull");
        process.exit();
    }, 43200000);
    if (ENV.DevMode) {
        app.listen(3560, () => {
            log("(Start up) Web server now online :D");
        }).on("error", (err) => {
            log(`(Start up) CRITICAL ERROR: (${err.name}) ${err.message}`);
        });
    } else {
        if (!fs.existsSync(`/etc/letsencrypt/live`)) {
            log(`(Start up) CRITICAL ERROR: /etc/letsencrypt/live not found, terminating server software`);
            return process.exit(1);
        }
        fs.readdir(`/etc/letsencrypt/live`, (err, files) => {
            if (err) {
                log(`(Start up) CRITICAL ERROR: /etc/letsencrypt/live couldn't be read, terminating server software`);
                return process.exit(1);
            }
            let indToRead = 0;
            if (files[0] === "README")
                indToRead = 1;
            fs.readFile(`/etc/letsencrypt/live/${files[indToRead]}/privkey.pem`, (err, data) => {
                if (err) {
                    log(`(Start up) CRITICAL ERROR: /etc/letsencrypt/live/${files[1]}/privkey.pem not found or couldn't be read, terminating server software`);
                    return process.exit(1);
                }
                const TLSKey = data.toString();
                fs.readFile(`/etc/letsencrypt/live/${files[indToRead]}/fullchain.pem`, (err, data) => {
                    if (err) {
                        log(`(Start up) CRITICAL ERROR: CRITICAL ERROR: /etc/letsencrypt/live/${files[indToRead]}/fullchain.pem not found or couldn't be read, terminating server software`);
                        return process.exit(1);
                    }
                    const TLSCert = data.toString();
                    https
                        .createServer({
                            cert: TLSCert,
                            key: TLSKey,
                        }, app)
                        .listen(3560);
                });
            });
        });
    }
}

startupCheck(() => {
    return applicationStartup();
});
