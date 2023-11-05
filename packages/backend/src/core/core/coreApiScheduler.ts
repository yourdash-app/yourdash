/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import schedule, { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import { CoreApi } from "./coreApi.js";
import { LOG_TYPE } from "./coreApiLog.js";

export default class CoreApiScheduler {
  private readonly coreApi: CoreApi
  
  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi;
    
    return this;
  }
  
  scheduleTask( name: string, rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number, task: () => Promise<void> ) {
    this.coreApi.log.info(
      "core:task_scheduler",
      `Scheduled Task ${name}`
    );
    schedule.scheduleJob( name, rule, async () => {
      this.coreApi.log.info(
        "core:task_scheduler",
        `Starting Task ${name}`
      );
      await task()
      this.coreApi.log.success(
        "core:task_scheduler",
        `Finished Task ${name}`
      );
    } )
  }
}
