/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import fileUrl from "file-url";
import path from "path";
import BackendModule from "./backendModule.js";
import { CoreApi } from "../coreApi.js";

export default class CoreApiModuleManager {
  private readonly loadedModules: BackendModule[];
  private coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
    this.loadedModules = [];

    return this;
  }

  checkModule(modulePath: string) {
    if (!this.coreApi.fs.doesExist(path.resolve(`${modulePath}/application.json`))) {
      this.coreApi.log.error("core", `application ${modulePath} does not contain an application.json file!`);
      return false;
    }

    // Not Required (use 'placeholder.avif' instead)
    if (!this.coreApi.fs.doesExist(path.resolve(`${modulePath}/icon.avif`))) {
      this.coreApi.log.warning("core", `application ${modulePath} does not contain an icon.avif file!`);
    }

    // Only required if the application needs a backend
    if (!this.coreApi.fs.doesExist(path.resolve(`${modulePath}/backend`))) {
      return false;
    }

    // Only required if the application needs a backend
    return this.coreApi.fs.doesExist(path.resolve(`${modulePath}/backend/index.ts`));
  }

  async loadModule(moduleName: string, modulePath: string) {
    // if the module is not valid or doesn't require a backend module, return
    if (!this.checkModule(modulePath)) {
      return;
    }

    if (!(await this.coreApi.fs.doesExist(`${modulePath}/index.ts`))) {
      this.coreApi.log.info("module_manager", `Skipped loading backend-less module: "${moduleName}"`);
      return;
    }

    const startTime = new Date();

    try {
      const module = await import(`${fileUrl(modulePath)}/index.js`);
      if (!module.default) {
        this.coreApi.log.error(
          "module_manager",
          `Unable to load ${moduleName}! This application does not contain a default export!`,
        );
        return;
      }
      new module.default({ moduleName: moduleName, modulePath: modulePath });
      this.loadedModules.push(module);
      this.coreApi.log.success(
        "module_manager",
        `Loaded module: "${moduleName}" in ${new Date().getTime() - startTime.getTime()}ms`,
      );
    } catch (err) {
      this.coreApi.log.error("module_manager", `Invalid module: "${moduleName}"`, err);
    }

    return this;
  }

  unloadModule(module: BackendModule) {
    const index = this.loadedModules.indexOf(module);
    if (index > -1) {
      this.loadedModules.splice(index, 1);
    }

    // Each module should be able to have an unload method, but this is not required
    // we should check if it supports this and unload if it does. Otherwise, we should prompt the admin to restart the server
    if (module.unload) {
      module.unload();
      this.coreApi.log.info("module_manager", `Unloaded module: "${module.moduleName}"`);
      return;
    }

    this.coreApi.log.info("module_manager", `A server restart is required to unload module: "${module.moduleName}"!`);

    return this;
  }

  getLoadedModules(): BackendModule[] {
    return this.loadedModules;
  }

  async loadInstalledApplications() {
    const installedApplications = this.coreApi.globalDb.get("core:installedApplications");

    for (const applicationName of installedApplications) {
      const modulePath = path.resolve(path.join("../../applications/", applicationName, "./backend"));
      try {
        await this.loadModule(applicationName, modulePath);
      } catch (err) {
        this.coreApi.log.error("module_manager", `Failed to load module: ${applicationName}`, err);
      }
    }

    if (this.getLoadedModules().length === 0) {
      this.coreApi.log.warning("module_manager", "No modules loaded!");
      return;
    }

    this.coreApi.log.info("module_manager", `Loaded ${this.getLoadedModules().length} modules`);
  }

  getModule(moduleName: string): BackendModule | undefined {
    return this.loadedModules.find((module) => module.moduleName === moduleName);
  }
}
