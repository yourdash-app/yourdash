/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import schedule, { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import { CoreApi } from "./coreApi.js";

export default class CoreApiScheduler {
  private readonly coreApi: CoreApi;
  scheduledTasks: string[];

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
    this.scheduledTasks = [];

    return this;
  }

  scheduleTask(
    name: string,
    rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number,
    task: () => Promise<void>,
  ) {
    this.coreApi.log.info("task_scheduler", `Scheduled Task ${name}`);
    this.scheduledTasks.push(name);
    schedule.scheduleJob(name, rule, async () => {
      const startTime = new Date();
      await task();
      this.coreApi.log.success(
        "task_scheduler",
        `Finished Task ${name} in ${new Date().getTime() - startTime.getTime()}ms`,
      );
    });
  }

  unscheduleTask(name: string) {
    this.coreApi.log.info("task_scheduler", `Unscheduled Task ${name}`);
    schedule.cancelJob(name);
  }

  __internal__onShutdown() {
    schedule.gracefulShutdown();
    this.coreApi.log.info("scheduler", "Shutdown gracefully");
  }
}
