/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import schedule, { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import log, { logType } from "../helpers/log.js";

export default function scheduleTask( name: string, rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number, task: () => void ) {
  log(
    logType.INFO,
    "core:task_scheduler",
    `Scheduled Task ${name}`
  );
  schedule.scheduleJob( name, rule, async () => {
    log(
      logType.INFO,
      "core:task_scheduler",
      `Starting Task ${name}`
    );
    await task()
    log(
      logType.SUCCESS,
      "core:task_scheduler",
      `Finished Task ${name}`
    );
  } )
}
