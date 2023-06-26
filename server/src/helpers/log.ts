import chalk from "chalk";
import globalDatabase from "./globalDatabase.js";

export enum logTypes {
  info, warn, error, success
}

export default function log(type: logTypes, ...message: any[]) {
  const logParams = [];

  if (globalDatabase.get("settings:should_log_time")) {
    const date = new Date();

    logParams.push(`${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() < 10
      ? `${ date.getSeconds() }0`
      : date.getSeconds()
    } `);
  }

  switch (type) {
    case logTypes.info:
      logParams.push(chalk.blue("INFO    "));
      break;
    case logTypes.warn:
      logParams.push(chalk.yellow("WARN    "));
      break;
    case logTypes.error:
      logParams.push(chalk.red("ERROR   "));
      break;
    case logTypes.success:
      logParams.push(chalk.green("SUCCESS "));
      break;
    default:
      break;
  }

  logParams.push(...message);

  // @ts-ignore
  console.log(...logParams);
}
