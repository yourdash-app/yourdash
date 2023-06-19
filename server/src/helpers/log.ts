import chalk from 'chalk';

export enum logTypes {
  info, warn, error, success
}

export default function log(type: logTypes, ...message: any[]) {
  let logParams = [];

  switch (type) {
    case logTypes.info:
      logParams = [chalk.blue('INFO    ')];
      break;
    case logTypes.warn:
      logParams = [chalk.yellow('WARN    ')];
      break;
    case logTypes.error:
      logParams = [chalk.red('ERROR   ')];
      break;
    case logTypes.success:
      logParams = [chalk.green('SUCCESS ')];
      break;
    default:
      break;
  }

  logParams.push(...message);

  console.log(...logParams);
}
