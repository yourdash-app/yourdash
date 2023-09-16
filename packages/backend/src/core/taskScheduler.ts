/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import schedule, { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import log, { LOG_TYPES } from "../helpers/log.js";

export default function scheduleTask( name: string, rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number, task: () => void ) {
  log( LOG_TYPES.INFO, `${ chalk.yellow.bold( "CORE" ) }: (Task Scheduler) Scheduled Task ${name}` );
  schedule.scheduleJob( name, rule, () => {
    log( LOG_TYPES.INFO, `${ chalk.yellow.bold( "CORE" ) }: (Task Scheduler) Starting Task ${name}` );
    task()
    log( LOG_TYPES.SUCCESS, `${ chalk.yellow.bold( "CORE" ) }: (Task Scheduler) Finished Task ${name}` );
  } )
}