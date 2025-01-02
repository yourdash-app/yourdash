/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Core } from "./core.js";
import "loadavg-windows";
import os from "node:os";

export default class CoreLoadManagement {
  private core: Core;

  private averageLoad = 0;

  constructor(core: Core) {
    this.core = core;

    this.getAverageLoad();

    this.core.scheduler.scheduleTask("core_calculate_load_average", "* * * * *", async () => {
      this.getAverageLoad();
      if (this.averageLoad > 0.75 /* 75% */) {
        this.core.log.warning("core_load_management", "Load average is high: " + this.averageLoad);
      }
    });

    return this;
  }

  // returns the average cpu load over the past few secconds
  getAverageLoad(): number {
    this.averageLoad = os.loadavg()[0] / 100;
    return this.averageLoad;
  }
}
