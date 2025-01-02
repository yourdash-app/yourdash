/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import path from "path";
import core, { Core } from "./core.js";
import FSError from "./fileSystem/FSError.js";

interface IYourDashApplicationConfigJson {
  id: string;
  displayName: string;
  category: string;
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
      main: string;
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

export interface YourDashModuleArguments {
  applicationId: string;
  moduleId: string;
  modulePath: string;
  moduleConfig: IYourDashApplicationConfigJson["modules"]["backend"][0];
  applicationConfig: IYourDashApplicationConfigJson;
  applicationPath: string;
}

export class YourDashBackendModule {
  public unload?: () => void;
  protected readonly api: {
    core: Core;
    log: {
      info(...message: (string | Uint8Array)[]): void;
      error(...message: (string | Uint8Array)[]): void;
      warning(...message: (string | Uint8Array)[]): void;
      success(...message: (string | Uint8Array)[]): void;
      debug(...message: (string | Uint8Array)[]): void;
    };
    moduleId: string;
    applicationId: string;
    moduleConfig: IYourDashApplicationConfigJson["modules"]["backend"][0];
    applicationConfig: IYourDashApplicationConfigJson;
    applicationPath: string;
  };

  constructor(args: YourDashModuleArguments) {
    this.api = {
      log: {
        info(...message) {
          core.log.info(`${args.moduleId}`, ...message);
        },
        error(...message) {
          core.log.error(`${args.moduleId}`, ...message);
        },
        warning(...message) {
          core.log.warning(`${args.moduleId}`, ...message);
        },
        success(...message) {
          core.log.success(`${args.moduleId}`, ...message);
        },
        debug(...message) {
          core.log.debug(`${args.moduleId}`, ...message);
        },
      },
      core: core,
      moduleId: args.moduleId,
      applicationId: args.applicationId,
      moduleConfig: args.moduleConfig,
      applicationConfig: args.applicationConfig,
      applicationPath: args.applicationPath,
    };

    return this;
  }

  loadEndpoints() {
    this.api.log.info("Loading endpoints...");

    core.request.setNamespace(`app/${this.api.moduleId}`);
  }

  loadPreAuthEndpoints() {
    this.api.log.info("Loading pre-authentication endpoints...");

    core.request.setNamespace(`app/${this.api.moduleId}`);
  }
}

export type YourDashOfficialFrontendModule = () => React.FC;

export default class CoreApplicationManager {
  core: Core;
  // application id's for the default applications
  DEFAULT_APPLICATIONS: string[];
  // the applicationid's that are currently loaded
  loadedApplications: { id: string; path: string; config: IYourDashApplicationConfigJson }[];
  loadedModules: {
    frontend: {
      config: IYourDashApplicationConfigJson["modules"]["frontend"][0];
      applicationPath: string;
    }[];
    backend: {
      config: IYourDashApplicationConfigJson["modules"]["backend"][0];
      module: YourDashBackendModule;
      applicationPath: string;
    }[];
    officialFrontend: {
      config: IYourDashApplicationConfigJson["modules"]["officialFrontend"][0];
      applicationPath: string;
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

    await Promise.all(
      installedApplications.map(async (applicationPath) => {
        return await this.loadApplication(applicationPath);
      }),
    );

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

    this.loadedApplications.push({ path: applicationPath, id: applicationConfig.id, config: applicationConfig });

    for (const mod of applicationConfig.modules.frontend) {
      if (!(await this.verifyApplicationModule(applicationPath, "frontend", mod))) {
        this.core.log.error("application_manager", `Invalid application module for: "${applicationPath}", module ${mod.id} was invalid`);

        continue;
      }

      this.loadedModules.frontend.push({ config: mod, applicationPath: applicationPath });
    }

    for (const mod of applicationConfig.modules.backend) {
      if (!(await this.verifyApplicationModule(applicationPath, "backend", mod))) {
        this.core.log.error("application_manager", `Invalid application module for: "${applicationPath}", module ${mod.id} was invalid`);

        continue;
      }

      // noinspection JSPotentiallyInvalidConstructorUsage
      this.loadedModules.backend.push({
        config: mod,
        module: new (await import(path.join(this.core.fs.ROOT_PATH, applicationPath, mod.main))).default({
          moduleId: mod.id,
          modulePath: path.join(this.core.fs.ROOT_PATH, applicationPath, mod.main),
        } as YourDashModuleArguments),
        applicationPath: applicationPath,
      });
    }

    for (const mod of applicationConfig.modules.officialFrontend) {
      if (!(await this.verifyApplicationModule(applicationPath, "officialFrontend", mod))) {
        this.core.log.error("application_manager", `Invalid application module for: "${applicationPath}", module ${mod.id} was invalid`);

        continue;
      }

      this.loadedModules.officialFrontend.push({ config: mod, applicationPath: applicationPath });
    }

    this.core.log.info("application_manager", `Loaded application: ${applicationPath}`);
  }

  async verifyApplicationModule(
    applicationPath: string,
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

        const mainFile = await this.core.fs.doesExist(path.join(applicationPath, appModule.main));

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

        const mainFile = await this.core.fs.doesExist(path.join(applicationPath, appModule.main));

        if (!mainFile) {
          this.core.log.error(
            "application_manager",
            `Failed to load officialFrontend module: "${appModule.id}" because the main file could not be found.`,
          );
          return false;
        }

        const iconFile = await this.core.fs.doesExist(path.join(applicationPath, appModule.iconPath));

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
      console.log(applicationConfigFile);
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

    if (typeof applicationConfig.category !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the category property was not provided! This should be a string!`,
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
          // noinspection SuspiciousTypeOfGuard
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

  getModuleIcon(moduleType: "frontend" | "officialFrontend", id: string) {
    const applicationPath = this.loadedModules[moduleType].find((m) => m.config.id === id)?.applicationPath as string;
    const iconPath = this.loadedModules[moduleType].find((m) => m.config.id === id)?.config.iconPath as string;

    if (!iconPath) {
      return "null icon path";
    }

    if (!this.core.fs.doesExist(iconPath)) {
      return "icon path does not exist";
    }

    return path.join(applicationPath, iconPath);
  }
}

/*
 * ApplicationManager TODOs
 *   1 - remove all references to CoreModuleManager
 */
