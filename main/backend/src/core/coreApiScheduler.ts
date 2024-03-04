/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import schedule, { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import { CoreApi } from "./coreApi.js";

export default class CoreApiScheduler {
  private readonly coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;

    return this;
  }

  scheduleTask(
    name: string,
    rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number,
    task: () => Promise<void>,
  ) {
    this.coreApi.log.info("task_scheduler", `Scheduled Task ${name}`);
    schedule.scheduleJob(name, rule, async () => {
      const startTime = new Date();
      await task();
      this.coreApi.log.success(
        "task_scheduler",
        `Finished Task ${name} in ${new Date().getTime() - startTime.getTime()}ms`,
      );
    });
  }
}
