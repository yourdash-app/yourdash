/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import path from "path";
import { Instance } from "./main.js";

interface IYourDashApplicationConfigV1 {
  id: string;
  displayName: string;
  description: string;
  version: {
    minor: number;
    major: number;
  };
  credits: {
    authors?: { name: string; site: string }[];
    contributors?: { name: string; site: string }[];
    translators?: { name: string; site: string }[];
    other?: { name: string; site: string }[];
  };
  configVersion: number;
  frontend?: {
    entryPoint: string;
  };
  externalFrontend?: {
    url: string;
  };
}
class YourDashApplication {
  __internal_params: IYourDashApplicationConfigV1;
  __internal_initializedPath!: string;

  constructor(applicationParams: IYourDashApplicationConfigV1) {
    this.__internal_params = applicationParams;
    this.__internal_initializedPath = "NOT YET LOADED!!!!";

    return this;
  }

  onLoad() {
    return this;
  }

  onAfterInstall() {
    return this;
  }

  onBeforeUninstall() {
    return this;
  }
}

class Applications {
  instance: Instance;
  loadedApplications: YourDashApplication[];

  constructor(instance: Instance) {
    this.instance = instance;
    this.loadedApplications = [];

    return this;
  }

  async getInstalledApplications(): Promise<string[]> {
    let query = await this.instance.database.query("SELECT installed_applications FROM configuration ORDER BY config_version ASC LIMIT 1;");

    let val: string[] = query.rows[0].installed_applications;

    return val || [];
  }

  async loadApplication(applicationPath: string): Promise<YourDashApplication | null> {
    await this.verifyApplication(applicationPath);
    this.instance.log.info("application", `Loading application @ ${applicationPath}.`);
    try {
      // import index.ts at applicationPath
      let applicationImport = await import("@yourdash/applications/" + path.posix.join(applicationPath, "/backend/index.ts"));
      let application = new applicationImport.default();
      application.__internal_initializedPath = applicationPath;
      this.loadedApplications.push(application);
      application?.onLoad?.();
      return application;
    } catch (e) {
      console.error(e);
      this.instance.log.info("application", `Failed to load application @ ${applicationPath}.`, (e as Error).toString());
      return null;
    }
  }

  async verifyApplication(applicationPath: string) {
    return this;
  }

  async uninstallApplication(applicationId: string) {
    return this;
  }
}

export default Applications;
export { YourDashApplication, type IYourDashApplicationConfigV1 };
