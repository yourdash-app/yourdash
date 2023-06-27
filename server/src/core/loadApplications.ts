import path from "path";
import globalDatabase from "../helpers/globalDatabase.js";
import log, { logTypes } from "../helpers/log.js";
import { existsSync as fsExistsSync } from "fs";
import chalk from "chalk";

export default function loadApplications(app, io) {
  if (fsExistsSync(path.resolve(process.cwd(), "./src/apps/"))) {
    const apps = (globalDatabase.get("installed_applications"));
    apps.forEach((appName: string) => {
      if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${ appName }`))) {
        log(logTypes.error, `${ chalk.yellow.bold("CORE") }: Unknown application: ${ appName }!`);
        return;
      }

      if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${ appName }/index.js`))) {
        log(logTypes.error, `${ chalk.yellow.bold("CORE") }: application ${ appName } does not contain an index.ts file!`);
        return;
      }

      if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${ appName }/application.json`))) {
        log(logTypes.error, `${ chalk.yellow.bold("CORE") }: application ${ appName } does not contain an application.json file!`);
        return;
      }

      if (!fsExistsSync(path.resolve(process.cwd(), `./src/apps/${ appName }/icon.avif`))) {
        log(logTypes.error, `${ chalk.yellow.bold("CORE") }: application ${ appName } does not contain an icon.avif file!`);
        return;
      }

      log(logTypes.info, `${ chalk.yellow.bold("CORE") }: Loading application: ${ appName }`);

      // import and load all applications
      import(
        `./apps/${ appName }/index.js`
      ).then(mod => {
        try {
          log(logTypes.info, `${ chalk.yellow.bold("CORE") }: Starting application: ${ appName }`);
          mod.default({
            app,
            io
          });
          log(logTypes.success, `${ chalk.yellow.bold("CORE") }: Initialized application: ${ appName }`);
        } catch (err) {
          log(logTypes.error, `${ chalk.yellow.bold("CORE") }: Error during application initialization: ${ appName }`);
        }
      }).catch(err => {
        console.error(`Error while loading application: ${ appName }`, err);
      });
    });
  } else {
    log(logTypes.error, `${ chalk.yellow.bold("CORE") }: No applications found!`);
  }
}
