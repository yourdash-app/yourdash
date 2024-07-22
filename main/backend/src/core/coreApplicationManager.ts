/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { Core } from "./core.js";
import FSError from "./fileSystem/FSError.js";

interface IYourDashApplicationConfigJson {
  id: string;
  displayName: string;
  authors: { name: string; url: string; bio: string; avatarUrl: string; email: string }[];
  maintainers: { name: string; url: string; bio: string; avatarUrl: string; email: string }[];
  description: string;
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

export default class CoreApplicationManager {
  core: Core;
  // application id's for the default applications
  DEFAULT_APPLICATIONS: string[];
  loadedApplications: string[];
  loadedModules: {
    frontend: IYourDashApplicationConfigJson["modules"]["frontend"];
    backend: IYourDashApplicationConfigJson["modules"]["backend"];
    officialFrontend: IYourDashApplicationConfigJson["modules"]["officialFrontend"];
  };

  constructor(core: Core) {
    this.core = core;
    this.DEFAULT_APPLICATIONS = ["uk-ewsgit-dash", "uk-ewsgit-photos", "uk-ewsgit-settings", "uk-ewsgit-yourdash-store", "uk-ewsgit-files"];
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

    applicationConfig.modules.frontend.forEach((mod) => {
      this.loadedModules.frontend.push(mod);
    });

    applicationConfig.modules.backend.forEach((mod) => {
      this.loadedModules.backend.push(mod);
    });

    applicationConfig.modules.officialFrontend.forEach((mod) => {
      this.loadedModules.officialFrontend.push(mod);
    });
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
        if (this.loadedModules.backend.find((m) => m.id === appModule.id)) {
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
            if (this.loadedModules.backend.find((m) => m.id === dep.id)) {
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
        if (this.loadedModules.frontend.find((m) => m.id === appModule.id)) {
          this.core.log.error(
            "application_manager",
            `Failed to load invalid frontend module: "${appModule.id}" as a module with the same id already exists.`,
          );
          return false;
        }

        appModule.dependencies
          .filter((dep) => dep.moduleType === "frontend")
          .forEach((dep) => {
            if (this.loadedModules.frontend.find((m) => m.id === dep.id)) {
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
        if (this.loadedModules.officialFrontend.find((m) => m.id === appModule.id)) {
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
            if (this.loadedModules.officialFrontend.find((m) => m.id === dep.id)) {
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

    const applicationConfig = await applicationConfigFile.read("json");

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

    // @ts-ignore
    if (typeof applicationConfig.id !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the id property was not provided! This should be a string!`,
      );
      return false;
    }

    // @ts-ignore
    if (typeof applicationConfig.displayName !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the displayName property was not provided! This should be a string!`,
      );
      return false;
    }

    // @ts-ignore
    if (!Array.isArray(applicationConfig.author)) {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the author property was not provided! This should be an array!`,
      );
      return false;
    } else {
      // @ts-ignore
      applicationConfig.author.map((author) => {
        if (typeof author.name !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the name property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof author.url !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the url property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof author.bio !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the bio property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof author.avatarUrl !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the avatarUrl property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof author.email !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the email property was not provided for all authors! This should be a string!`,
          );
          return false;
        }
      });
    }

    // @ts-ignore
    if (!Array.isArray(applicationConfig.maintainer)) {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the maintainer property was not provided! This should be an array!`,
      );
      return false;
    } else {
      // @ts-ignore
      applicationConfig.maintainer.map((maintainer) => {
        if (typeof maintainer.name !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the name property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof maintainer.url !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the url property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof maintainer.bio !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the bio property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof maintainer.avatarUrl !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the avatarUrl property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
        // @ts-ignore
        if (typeof maintainer.email !== "string") {
          this.core.log.error(
            "application_manager",
            `Invalid application: "${applicationPath}", the email property was not provided for all maintainers! This should be a string!`,
          );
          return false;
        }
      });
    }

    // @ts-ignore
    if (typeof applicationConfig.description !== "string") {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the description property was not provided! This should be a string!`,
      );
      return false;
    }

    // @ts-ignore
    if (!Array.isArray(applicationConfig.modules)) {
      this.core.log.error(
        "application_manager",
        `Invalid application: "${applicationPath}", the modules property was not provided! This should be an array!`,
      );
      return false;
    } else {
      // @ts-ignore
      if (!Array.isArray(applicationConfig.modules!.backend)) {
        this.core.log.error(
          "application_manager",
          `Invalid application: "${applicationPath}", the backend modules property was not provided! This should be an array!`,
        );
        return false;
      } else {
        // @ts-ignore
        applicationConfig.modules!.backend.map((mod) => {
          if (typeof mod.id !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the id property was not provided for all backend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.main !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the main property was not provided for all backend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all backend modules! This should be a string!`,
            );
            return false;
          }
        });
      }
      // @ts-ignore
      if (!Array.isArray(applicationConfig.modules!.frontend)) {
        this.core.log.error(
          "application_manager",
          `Invalid application: "${applicationPath}", the frontend modules property was not provided! This should be an array!`,
        );
        return false;
      } else {
        // @ts-ignore
        applicationConfig.modules!.frontend.map((mod) => {
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
          // @ts-ignore
          if (typeof mod.iconPath !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the iconPath property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.url !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the url property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
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
      if (Array.isArray(applicationConfig.modules!.officialFrontend)) {
        // @ts-ignore
        applicationConfig.modules!.officialFrontend.map((mod) => {
          // @ts-ignore
          if (typeof mod.id !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the id property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.displayName !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the displayName property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.iconPath !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the iconPath property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.main !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the main property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
          // @ts-ignore
          if (typeof mod.description !== "string") {
            this.core.log.error(
              "application_manager",
              `Invalid application: "${applicationPath}", the description property was not provided for all official frontend modules! This should be a string!`,
            );
            return false;
          }
        });
        return false;
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
