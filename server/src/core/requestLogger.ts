import log, { logTypes } from "../helpers/log.js";
import chalk from "chalk";
import { Application as ExpressApplication } from "express";

export default function startRequestLogger(
  app: ExpressApplication,
  options: {
    logOptionsRequests?: boolean
  }
) {
  app.use((req, res, next) => {
    switch (req.method) {
      case "GET":
        log(
          logTypes.info,
          `${ chalk.bgGreen(chalk.black(" GET ")) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== "{}") {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case "POST":
        log(
          logTypes.info,
          `${ chalk.bgBlue(chalk.black(" POS ")) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== "{}") {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case "DELETE":
        log(
          logTypes.info,
          `${ chalk.bgRed(chalk.black(" DEL ")) } ${ res.statusCode } ${ req.path }`
        );
        if (JSON.stringify(req.query) !== "{}") {
          log(logTypes.info, JSON.stringify(req.query));
        }
        break;
      case "OPTIONS":
        if (options.logOptionsRequests) {
          log(
            logTypes.info,
            `${ chalk.bgCyan(chalk.black(" OPT ")) } ${ res.statusCode } ${ req.path }`
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
