/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import { type IYourDashApplicationConfig } from "@yourdash/shared/core/application.js";
import core from "../core/core.js";

// TODO: replace the module loading from names to paths to support loading modules outside of the project's codebase

class ValidYourDashApplication {
  private readonly name: string;
  private readonly application: IYourDashApplicationConfig;

  constructor(application: IYourDashApplicationConfig) {
    this.name = application.name;
    this.application = application;
    return this;
  }

  // Returns a string containing the application's name ( this could be described as the application's ID )
  getName(): string {
    return this.application.name;
  }

  // Returns a string containing the application's display name
  getDisplayName(): string {
    return this.application.displayName;
  }

  // Returns a string containing the application's store description
  getDescription(): string {
    return this.application.description;
  }

  // Returns a string array containing the application's dependency applications
  getDependencies(): string[] {
    return this.application.dependencies || [];
  }

  // Returns a Buffer containing the data for the application's icon
  async getIcon(): Promise<Buffer> {
    try {
      return await fs.readFile(path.resolve(process.cwd().replaceAll(), `../../applications/${this.name}/icon.avif`));
    } catch (_e) {
      return await fs.readFile(path.resolve(process.cwd(), "./src/defaults/placeholder_application_icon.png"));
    }
  }

  // Returns a string with the path to the application's icon
  async getIconPath(): Promise<string> {
    try {
      await fs.access(path.resolve(process.cwd(), `../../applications/${this.name}/icon.avif`));
      return path.resolve(process.cwd(), `../../applications/${this.name}/icon.avif`);
    } catch (_e) {
      return path.resolve(process.cwd(), "./src/defaults/placeholder_application_icon.png");
    }
  }

  // Returns a Buffer containing the data for the application's store page banner
  getStoreBackground(): Promise<Buffer> {
    try {
      // TODO: add support for custom application backgrounds
      return fs.readFile(path.resolve(process.cwd(), "./src/defaults/promoted_application_default_background.png"));
    } catch (_e) {
      return fs.readFile(path.resolve(process.cwd(), "./src/defaults/promoted_application_default_background.png"));
    }
  }

  // Returns true if the application is installed, otherwise returns false
  isInstalled(): boolean {
    return !!core.globalDb.get<string[]>("core:installedApplications").includes(this.name);
  }

  getCategory(): string {
    return this.application.category;
  }

  // Returns the path to the application
  getPath(): string {
    return path.resolve(process.cwd(), `../../applications/${this.name}/`);
  }

  getRawApplicationData(): IYourDashApplicationConfig {
    return this.application;
  }

  async requiresBackend(): Promise<boolean> {
    return !(await core.fs.doesExist(path.resolve(path.join(process.cwd(), this.getPath(), "backend/index.js"))));
  }
}

// Returns an array of strings with the name of each application that exists ( installed or not )
export async function getAllApplications(): Promise<string[]> {
  try {
    return (await fs.readdir(path.resolve(process.cwd(), "../../applications/"))).filter((app) => {
      // Define all files / directories in /packages/applications which should be ignored
      switch (app) {
        case "package.json":
        case "node_modules":
        case "gulpfile.js":
        case "README.md":
          return false;
        default:
          return true;
      }
    });
  } catch (_err) {
    core.log.error("A problem occurred reading the ../applications/ directory");
    return [];
  }
}

export default class YourDashApplication {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
    return this;
  }

  // Returns a YourDashApplication class which is initialized with the application's data
  async read(): Promise<ValidYourDashApplication | null> {
    try {
      return new ValidYourDashApplication(
        JSON.parse(
          (
            await fs.readFile(path.resolve(process.cwd(), `../../applications/${this.name}/application.json`))
          ).toString() || "{}",
        ),
      );
    } catch (_err) {
      core.log.error("core:applications", `Unable to read application ${this.name}!, does it exist?`);
      return null;
    }
  }

  // Returns true if the application exists in the ./src/apps/ directory
  async exists(): Promise<boolean> {
    try {
      await fs.readFile(path.resolve(process.cwd(), `../../applications/${this.name}/application.json`));
      return true;
    } catch (_err) {
      return false;
    }
  }

  // Return the path to the application
  getPath(): string {
    return path.resolve(process.cwd(), `../../applications/${this.name}/`);
  }
}
