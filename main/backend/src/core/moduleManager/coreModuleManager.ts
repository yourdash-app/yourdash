/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import fileUrl from "file-url";
import path from "path";
import BackendModule from "./backendModule.js";
import { Core } from "../core.js";

export default class CoreModuleManager {
  private readonly loadedModules: BackendModule[];
  private core: Core;

  constructor(core: Core) {
    this.core = core;
    this.loadedModules = [];

    return this;
  }

  checkModule(modulePath: string) {
    if (!this.core.fs.doesExist(path.resolve(`${modulePath}/application.json`))) {
      this.core.log.error("core", `application ${modulePath} does not contain an application.json file!`);
      return false;
    }

    // Not Required (use 'placeholder.avif' instead)
    if (!this.core.fs.doesExist(path.resolve(`${modulePath}/icon.avif`))) {
      this.core.log.warning("core", `application ${modulePath} does not contain an icon.avif file!`);
    }

    // Only required if the application needs a backend
    if (!this.core.fs.doesExist(path.resolve(`${modulePath}/backend`))) {
      return false;
    }

    // Only required if the application needs a backend
    return this.core.fs.doesExist(path.resolve(`${modulePath}/backend/index.ts`));
  }

  async loadModule(moduleName: string, modulePath: string): Promise<BackendModule | undefined> {
    // if the module is not valid or doesn't require a backend module, return
    if (!this.checkModule(modulePath)) {
      return;
    }

    if (!(await this.core.fs.doesExist(`${modulePath}/index.ts`))) {
      this.core.log.info("module_manager", `Skipped loading backend-less module: "${moduleName}"`);
      return;
    }

    const startTime = new Date();

    try {
      const mod = await import(`${fileUrl(modulePath)}/index.js`);
      if (!mod.default) {
        this.core.log.error(
          "module_manager",
          `Unable to load ${moduleName}! This application does not contain a default export!`,
        );
        return;
      }

      const initializedModule = new mod.default({ moduleName: moduleName, modulePath: modulePath });
      this.loadedModules.push(mod);
      this.core.log.success(
        "module_manager",
        `Loaded module: "${moduleName}" in ${new Date().getTime() - startTime.getTime()}ms`,
      );
      return initializedModule;
    } catch (err) {
      this.core.log.error("module_manager", `Invalid module: "${moduleName}"`, err);
      return null;
    }
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
      this.core.log.info("module_manager", `Unloaded module: "${module.moduleName}"`);
      return;
    }

    this.core.log.info("module_manager", `A server restart is required to unload module: "${module.moduleName}"!`);

    return this;
  }

  getLoadedModules(): BackendModule[] {
    return this.loadedModules;
  }

  async loadInstalledApplications(): Promise<BackendModule[]> {
    const loadedApplications: BackendModule[] = [];
    const installedApplications = this.core.globalDb.get<string[]>("core:installedApplications");

    for (const applicationName of installedApplications) {
      const modulePath = path.resolve(path.join("../../applications/", applicationName, "./backend"));
      try {
        loadedApplications.push(await this.loadModule(applicationName, modulePath));
      } catch (err) {
        this.core.log.error("module_manager", `Failed to load module: ${applicationName}`, err);
      }
    }

    if (this.getLoadedModules().length === 0) {
      this.core.log.warning("module_manager", "No modules loaded!");
      return [];
    }

    this.core.log.info("module_manager", `Loaded ${this.getLoadedModules().length} modules`);
    return loadedApplications;
  }

  getModule(moduleName: string): BackendModule | undefined {
    return this.loadedModules.find((module) => module.moduleName === moduleName);
  }
}
