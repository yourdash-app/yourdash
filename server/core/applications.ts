import fs from "fs";
import path from "path";

interface YourDashApplicationFile {
  name: string;
  displayName: string;
  description: string;
}

export default class YourDashApplication {
  private name: string;
  private readonly application: YourDashApplicationFile;

  constructor(name: string) {
    this.name = name;
    try {
      this.application = JSON.parse(
        fs
          .readFileSync(
            path.resolve(process.cwd(), `./apps/${this.name}/application.json`)
          )
          .toString() || "{}"
      );
    } catch (err) {
      console.error(err);
    }
    return this;
  }

  exists(): boolean {
    return !!this.application;
  }

  getName(): string {
    return this.application.name;
  }

  getDisplayName(): string {
    return this.application.displayName;
  }

  getDescription(): string {
    return this.application.description;
  }

  getPath(): string {
    return path.resolve(process.cwd(), `./apps/${this.name}/`);
  }
}

export function getAllApplications(): string[] {
  return fs.readdirSync(path.resolve(process.cwd(), `./apps/`));
}

type YourDashApplicationServerPlugin = (app: Express.Application) => any;

export { type YourDashApplicationServerPlugin };
