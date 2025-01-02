/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import schedule, { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from "node-schedule";
import { Core } from "./core.js";

export default class CoreScheduler {
  private readonly core: Core;
  scheduledTasks: string[];

  constructor(core: Core) {
    this.core = core;
    this.scheduledTasks = [];

    return this;
  }

  scheduleTask(
    name: string,
    rule: RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date | string | number,
    task: () => Promise<void>,
  ) {
    this.core.log.info("task_scheduler", `Scheduled Task ${name}`);
    this.scheduledTasks.push(name);
    schedule.scheduleJob(name, rule, async () => {
      const startTime = new Date();
      await task();
      this.core.log.success(
        "task_scheduler",
        `Finished Task ${name} in ${new Date().getTime() - startTime.getTime()}ms @ ${new Date().toLocaleTimeString()}`,
      );
    });
  }

  unscheduleTask(name: string) {
    this.core.log.info("task_scheduler", `Unscheduled Task ${name}`);
    schedule.cancelJob(name);
  }

  __internal__onShutdown() {
    schedule.gracefulShutdown().then(() => {
      this.core.log.info("scheduler", "Shutdown gracefully");
    });
  }
}
