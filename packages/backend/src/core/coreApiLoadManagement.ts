import { CoreApi } from "./coreApi.js";
import "loadavg-windows"
import os from "node:os"

export default class CoreApiLoadManagement {
  private coreApi: CoreApi;

  private averageLoad = 0

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi

    this.getAverageLoad()

    this.coreApi.scheduler.scheduleTask( "core:calculate_load_average", "* * * * *", async () => {
      this.getAverageLoad()
      if ( this.averageLoad > 0.75 /* 75% */ ) {
        this.coreApi.log.warning( "core:load_management", "Load average is high: " + this.averageLoad )
      }
    } )

    return this
  }

  // returns the average cpu load over the past few secconds
  getAverageLoad(): number {
    this.averageLoad = os.loadavg()[0] / 100
    return this.averageLoad
  }
}
