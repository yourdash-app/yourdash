import path from "path";
import globalDatabase from "../helpers/globalDatabase.js";
import log, { logTypes } from "../helpers/log.js";
import { existsSync as fsExistsSync } from "fs";
import chalk from "chalk";
function checkIfApplicationIsValidToLoad(applicationName) {
    if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${applicationName}`))) {
        log(logTypes.error, `${chalk.yellow.bold("CORE")}: Unknown application: ${applicationName}!`);
        return false;
    }
    if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${applicationName}/index.js`))) {
        log(logTypes.error, `${chalk.yellow.bold("CORE")}: application ${applicationName} does not contain an index.ts file!`);
        return false;
    }
    if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${applicationName}/application.json`))) {
        log(logTypes.error, `${chalk.yellow.bold("CORE")}: application ${applicationName} does not contain an application.json file!`);
        return false;
    }
    if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${applicationName}/icon.avif`))) {
        log(logTypes.error, `${chalk.yellow.bold("CORE")}: application ${applicationName} does not contain an icon.avif file!`);
        return false;
    }
    return true;
}
export function loadApplication(appName, app, io) {
    if (!checkIfApplicationIsValidToLoad(appName)) {
        return;
    }
    import(`../apps/${appName}/index.js`).then((mod) => {
        try {
            log(logTypes.info, `${chalk.yellow.bold("CORE")}: Starting application: ${appName}`);
            if (!mod.default) {
                log(logTypes.error, `${chalk.yellow.bold("CORE")}: Unable to load ${appName}! This application does not contain a default export!`);
                return;
            }
            mod.default({
                app,
                io
            });
            log(logTypes.success, `${chalk.yellow.bold("CORE")}: Initialized application: ${appName}`);
        }
        catch (err) {
            log(logTypes.error, `${chalk.yellow.bold("CORE")}: Error during application initialization: ${appName}`);
        }
    }).catch(_err => {
        log(logTypes.error, `${chalk.yellow.bold("CORE")}: Error while loading application: ${appName}`);
    });
}
export default function loadApplications(app, io) {
    if (fsExistsSync(path.resolve(process.cwd(), "./src/apps/"))) {
        const apps = (globalDatabase.get("installed_applications"));
        apps.forEach((appName) => {
            loadApplication(appName, app, io);
        });
    }
    else {
        log(logTypes.error, `${chalk.yellow.bold("CORE")}: No applications found!`);
    }
}
//# sourceMappingURL=loadApplications.js.map