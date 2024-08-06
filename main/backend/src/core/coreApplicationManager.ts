/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import path from "path";
import core, { Core } from "./core.js";
import { LOG_TYPE } from "./coreLog.js";
import FSError from "./fileSystem/FSError.js";
import { YourDashModuleArguments } from "./moduleManager/backendModule.js";
import YourDashUser from "./user/index.js";
import { Request as ExpressRequest } from "express";

interface IYourDashApplicationConfigJson {
  id: string;
  displayName: string;
  authors: { name: string; url: string; bio: string; avatarUrl: string }[];
  maintainers: { name: string; url: string; bio: string; avatarUrl: string }[];
  description: string;
  license: string;
  modules: {
    backend: {
      id: string;
      main: string;
      description: string;
      dependencies: { moduleType: "backend" | "frontend" | "officialFrontend"; id: string }[];
    }[];
    frontend: {
      id: string;
      displayName: string;
      iconPath: string;
      url: string;
      devUrl: string;
      description: string;
      dependencies: { moduleType: "backend" | "frontend" | "officialFrontend"; id: string }[];
    }[];
    officialFrontend: {
      id: string;
      main: string;
      displayName: string;
      iconPath: string;
      description: string;
      dependencies: { moduleType: "backend" | "frontend" | "officialFrontend"; id: string }[];
    }[];
  };
  shouldInstanceRestartOnInstall: boolean;
}

export class YourDashBackendModule {
  readonly moduleName: string;
  protected readonly api: {
    websocket: Core["websocketManager"];
    request: Core["request"];
    log(type: LOG_TYPE, ...message: unknown[]): void;
    getPath(): string;
    applicationName: string;
    moduleName: string;
    getUser(req: ExpressRequest): YourDashUser;
    core: Core;
    path: string;
    modulePath: string;
  };
  public unload?: () => void;

  constructor(args: YourDashModuleArguments) {
    this.moduleName = args.moduleName;
    this.api = {
      websocket: core.websocketManager,
      request: core.request,
      log(type: LOG_TYPE, ...message: (string | Uint8Array)[]) {
        switch (type) {
          case LOG_TYPE.INFO:
            core.log.info(`app/${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.ERROR:
            core.log.error(`app/${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.SUCCESS:
            core.log.success(`app/${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.WARNING:
            core.log.warning(`app/${this.moduleName}`, ...message);
            return;
          default:
            core.log.info(`app/${this.moduleName}`, ...message);
        }
      },
      getPath() {
        return path.resolve(path.join(process.cwd(), "../applications", this.moduleName));
      },
      applicationName: args.moduleName,
      moduleName: args.moduleName,
      getUser(req: ExpressRequest) {
        const username = req.headers.username as string;

        return core.users.get(username);
      },
      core: core,
      path: args.modulePath,
      modulePath: args.modulePath,
    };

    return this;
  }

  loadEndpoints() {
    /* empty */
  }

  loadPreAuthEndpoints() {
    /* empty */
  }
}

export type YourDashOfficialFrontendModule = () => React.FC;

export default class CoreApplicationManager {
  core: Core;
  // application id's for the default applications
  DEFAULT_APPLICATIONS: string[];
  // the applicationid's that are currently loaded
  loadedApplications: string[];
  loadedModules: {
    frontend: { config: IYourDashApplicationConfigJson["modules"]["frontend"][0] }[];
    backend: { config: IYourDashApplicationConfigJson["modules"]["backend"][0]; module: YourDashBackendModule }[];
    officialFrontend: {
      config: IYourDashApplicationConfigJson["modules"]["officialFrontend"][0];
    }[];
  };

  constructor(core: Core) {
    this.core = core;
    this.DEFAULT_APPLICATIONS = [
      "../applications/uk-ewsgit-dash",
      "../applications/uk-ewsgit-photos",
      "../applications/uk-ewsgit-settings",
      "../applications/uk-ewsgit-store",
      "../applications/uk-ewsgit-files",
    ];
    this.loadedApplications = [];
    this.loadedModules = {
      frontend: [],
      backend: [],
      officialFrontend: [],
    };

    return this;
  }

  async installApplication(applicationPath: string) {
    if (!(await this.verifyApplication(applicationPath))) {
      this.core.log.warning("application_manager", `Cannot install invalid application: "${applicationPath}"!`);
      return this;
    }

    let currentlyInstalledApplications = this.core.globalDb.get<string[]>("core:installedApplications");

    if (!currentlyInstalledApplications) {
      currentlyInstalledApplications = [];
    }

    if (currentlyInstalledApplications.includes(applicationPath)) {
      this.core.log.warning("application_manager", `Application "${applicationPath}" is already installed!`);
      return this;
    }

    this.core.globalDb.set("core:installedApplications", [...currentlyInstalledApplications, applicationPath]);

    // TODO: see YourDash Backend TODOs in core.ts
    // this.core.flagForRestart();

    return this;
  }

  getInstalledApplications(): string[] {
    return this.core.globalDb.get<string[]>("core:installedApplications") || this.DEFAULT_APPLICATIONS;
  }

  async loadInstalledApplications() {
    const installedApplications = this.getInstalledApplications();
    for (const applicationPath of installedApplications) {
      await this.loadApplication(applicationPath);
    }

    return this.loadedModules;
  }

  async loadApplication(applicationPath: string) {
    if (!(await this.verifyApplication(applicationPath))) {
      this.core.log.warning("application_manager", `Failed to load invalid application: "${applicationPath}"`);
      return this;
    }

    const applicationConfigFile = await this.core.fs.getFile(`${applicationPath}/application.json`);
    if (applicationConfigFile instanceof FSError) {
      this.core.log.error("application_manager", `Invalid application: "${applicationPath}", no application.json was found`);
      return this;
    }

    const applicationConfig = (await applicationConfigFile.read("json")) as IYourDashApplicationConfigJson;

    this.core.log.success("application_manager", `Application ${applicationConfig.id}'s config was successfully verified!`);

    for (const mod of applicationConfig.modules.frontend) {
      if (!(await this.verifyApplicationModule("frontend", mod))) {
        this.core.log.error("application_manager", `Invalid application module for: "${applicationPath}", module ${mod.id} was invalid`);

        continue;
      }

      this.loadedModules.frontend.push({ config: mod });
    }

    for (const mod of applicationConfig.modules.backend) {
      if (!(await this.verifyApplicationModule("backend", mod))) {
        this.core.log.error("application_manager", `Invalid application module for: "${applicationPath}", module ${mod.id} was invalid`);

        continue;
      }

      // noinspection JSPotentiallyInvalidConstructorUsage
      this.loadedModules.backend.push({ config: mod, module: new (await import(mod.main)).default() });
    }

    for (const mod of applicationConfig.modules.officialFrontend) {
      if (!(await this.verifyApplicationModule("officialFrontend", mod))) {
        this.core.log.error("application_manager", `Invalid application module for: "${applicationPath}", module ${mod.id} was invalid`);

        continue;
      }

      this.loadedModules.officialFrontend.push({ config: mod });
    }
  }

  async verifyApplicationModule(
    moduleType: "backend" | "frontend" | "officialFrontend",
    applicationModule:
      | IYourDashApplicationConfigJson["modules"]["frontend"][0]
      | IYourDashApplicationConfigJson["modules"]["backend"][0]
      | IYourDashApplicationConfigJson["modules"]["officialFrontend"][0],
  ): Promise<boolean> {
    switch (moduleType) {
      case "backend": {
        const appModule = applicationModule as IYourDashApplicationConfigJson["modules"]["backend"][0];
        if (this.loadedModules.backend.find((m) => m.config.id === appModule.id)) {
          this.core.log.error(
            "application_manager",
            `Failed to load invalid backend module: "${appModule.id}" as a module with the same id already exists.`,
          );
          return false;
        }

        const mainFile = await this.core.fs.doesExist(appModule.main);

        if (!mainFile) {
          this.core.log.error(
            "application_manager",
            `Failed to load backend module: "${appModule.id}" because the main file could not be found.`,
          );
          return false;
        }

        appModule.dependencies
          .filter((dep) => dep.moduleType === "backend")
          .forEach((dep) => {
            if (this.loadedModules.backend.find((m) => m.config.id === dep.id)) {
              this.core.log.error(
                "application_manager",
                `Failed to load backend module: "${appModule.id}" because it depends on "${dep.id}" which was not loaded or may not exist.`,
              );
              return false;
            }
          });

        return true;
      }
      case "frontend": {
        const appModule = applicationModule as IYourDashApplicationConfigJson["modules"]["frontend"][0];
        if (this.loadedModules.frontend.find((m) => m.config.id === appModule.id)) {
          this.core.log.error(
            "application_manager",
            `Failed to load invalid frontend module: "${appModule.id}" as a module with the same id already exists.`,
          );
          return false;
        }

        appModule.dependencies
          .filter((dep) => dep.moduleType === "frontend")
          .forEach((dep) => {
            if (this.loadedModules.frontend.find((m) => m.config.id === dep.id)) {
              this.core.log.error(
                "application_manager",
                `Failed to load frontend module: "${appModule.id}" because it depends on "${dep.id}" which was not loaded or may not exist.`,
              );
              return false;
            }
          });
        return true;
      }
      case "officialFrontend": {
        const appModule = applicationModule as IYourDashApplicationConfigJson["modules"]["officialFrontend"][0];
        if (this.loadedModules.officialFrontend.find((m) => m.config.id === appModule.id)) {
          this.core.log.error(
            "application_manager",
            `Failed to load invalid officialFrontend module: "${appModule.id}" as a module with the same id already exists.`,
          );
          return false;
        }

        const mainFile = await this.core.fs.doesExist(appModule.main);

        if (!mainFile) {
          this.core.log.error(
            "application_manager",
            `Failed to load officialFrontend module: "${appModule.id}" because the main file could not be found.`,
          );
          return false;
        }

        const iconFile = await this.core.fs.doesExist(appModule.iconPath);

        if (!iconFile) {
          this.core.log.warning(
            "application_manager",
            `The icon provided for officialFrontend module: "${appModule.id}" could not be found.`,
          );
          return false;
        }

        appModule.dependencies
          .filter((dep) => dep.moduleType === "officialFrontend")
          .forEach((dep) => {
            if (this.loadedModules.officialFrontend.find((m) => m.config.id === dep.id)) {
              this.core.log.error(
                "application_manager",
                `Failed to load officialFrontend module: "${appModule.id}" because it depends on "${dep.id}" which was not loaded or may not exist.`,
              );
              return false;
            }
          });

        return true;
      }
      default:
        return false;
    }
  }

  async verifyApplication(applicationPath: string): Promise<boolean> {
    const applicationConfigFile = await this.core.fs.getFile(`${applicationPath}/application.json`);
    if (applicationConfigFile instanceof FSError) {
      this.core.log.error("application_manager", `Invalid application: "${applicationPath}", no application.json was found`);
      return false;
    }

    const applicationConfig: Partial<IYourDashApplicationConfigJson> = await applicationConfigFile.read("json");

    /*
     * ApplicationConfig required params
     *
     * id: string
     * displayName: string
     * authors: { name: string, url: string, bio: string, avatarUrl: string, email: string }[]
     * maintainers: { name: string, url: string, bio: string, avatarUrl: string, email: string }[]
     * description: string
     * modules: {
     *   backend: { id: string, main: string, description: string }[],
     *   frontend: { id: string, url: string, devUrl: string, description: string, displayName: string, iconPath: string }[],
     *   officialFrontend: { id: string, displayName: string, iconPath: string, main: string, description: string }[]
     * }
     * shouldInstanceRestartOnInstall: boolean
     *
     * */

    if (typeof applicationConfig.id !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the id property was not provided! This should be a string!`,
      );
      return false;
    }

    if (typeof applicationConfig.displayName !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the displayName property was not provided! This should be a string!`,
      );
      return false;
    }

    if (typeof applicationConfig.license !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the license property was not provided! This should be a string!`,
      );
      return false;
    }

    if (!Array.isArray(applicationConfig.authors)) {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the author property was not provided! This should be an array!`,
      );
      return false;
    } else {
      if (applicationConfig.authors.length === 0) {
        this.core.log.error(
          "application_manager",
          `Invalid application: "${applicationPath}", the authors property must have at least one author!`,
        );
        return false;
      }
      applicationConfig.authors.map((author) => {
        // noinspection SuspiciousTypeOfGuard
        if (typeof author.name !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the name property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof author.url !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the url property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof author.bio !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the bio property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof author.avatarUrl !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the avatarUrl property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
      });
    }

    if (!Array.isArray(applicationConfig.maintainers)) {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the maintainers property was not provided! This should be an array!`,
      );
      return false;
    } else {
      if (applicationConfig.maintainers.length === 0) {
        this.core.log.error(
          "application_manager",
          `Invalid application: "${applicationPath}", the maintainers property must have at least one maintainer!`,
        );
        return false;
      }
      applicationConfig.maintainers.map((maintainer) => {
        // noinspection SuspiciousTypeOfGuard
        if (typeof maintainer.name !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the name property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof maintainer.url !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the url property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof maintainer.bio !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the bio property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof maintainer.avatarUrl !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the avatarUrl property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
      });
    }

    if (typeof applicationConfig.description !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the description property was not provided! This should be a string!`,
      );
      return false;
    }

    if (typeof applicationConfig.modules !== "object") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the modules property was not provided! This should be an array!`,
      );
      return false;
    } else {
      if (!Array.isArray(applicationConfig.modules?.backend)) {
        this.core.log.error(
          "application_manager",
          `Invalid application: "${applicationPath}", the backend modules property was not provided! This should be an array!`,
        );
        return false;
      } else {
        applicationConfig.modules?.backend.map((mod) => {
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.id !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the id property was not provided for all backend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.main !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the main property was not provided for all backend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all backend modules! This should be a string!`,
            );
            return false;
          }
        });
      }
      if (!Array.isArray(applicationConfig.modules?.frontend)) {
        this.core.log.error(
          "application_manager",
          `Invalid application: "${applicationPath}", the frontend modules property was not provided! This should be an array!`,
        );
        return false;
      } else {
        applicationConfig.modules?.frontend.map((mod) => {
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.id !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the id property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.main !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the main property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.iconPath !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the iconPath property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.url !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the url property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.devUrl !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the devUrl property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
        });
      }

      // @ts-ignore
      if (Array.isArray(applicationConfig.modules?.officialFrontend)) {
        // @ts-ignore
        applicationConfig.modules?.officialFrontend.map((mod) => {
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.id !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the id property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.displayName !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the displayName property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.iconPath !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the iconPath property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.main !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the main property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // noinspection SuspiciousTypeOfGuard
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
        });
      }
    }

    // @ts-ignore
    if (typeof applicationConfig.shouldInstanceRestartOnInstall !== "boolean") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the shouldInstanceRestartOnInstall property was not provided! This should be a boolean!`,
      );
      return false;
    }

    return true;
  }
}

/*
 * ApplicationManager TODOs
 *   1 - remove all references to CoreModuleManager
 *
 */
