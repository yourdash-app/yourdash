import {promises as fs} from 'fs';

import path from 'path';

import {Application as ExpressApplication} from 'express';
import {Server as SocketServer} from 'socket.io';

import {type IYourDashApplication} from '../../../shared/core/application.js';

import log from './log.js';

class YourDashApplication {
  private readonly name: string;
  private application: IYourDashApplication;

  constructor(application: IYourDashApplication) {
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

  // Returns a Buffer containing the data for the application's icon
  getIcon(): Promise<Buffer> {
    try {
      return fs.readFile(path.resolve(process.cwd(), `./src/apps/${ this.name }/icon.avif`));
    } catch (_e) {
      return fs.readFile(path.resolve(process.cwd(), './src/assets/placeholder_application_icon.png'));
    }
  }

  // Returns a Buffer containing the data for the application's store page banner
  getStoreBackground(): Promise<Buffer> {
    try {
      return fs.readFile(path.resolve(process.cwd(), './src/assets/promoted_application_default_background.png'));
    } catch (_e) {
      return fs.readFile(path.resolve(process.cwd(), './src/assets/promoted_application_default_background.png'));
    }
  }

  // Returns true if the application is installed, otherwise returns false
  isInstalled(): boolean {
    // TODO: implement logic to check if the application is installed
    return true;
  }

  getCategory(): string {
    return this.application.category;
  }

  // Returns the path to the application
  getPath(): string {
    return path.resolve(process.cwd(), `./src/apps/${ this.name }/`);
  }

  getRawApplicationData(): IYourDashApplication {
    return this.application;
  }
}

// Returns an array of strings with the name of each application that exists ( installed or not )
export async function getAllApplications(): Promise<string[]> {
  try {
    return await fs.readdir(path.resolve(process.cwd(), './src/apps/'));
  } catch (_err) {
    log('an issue reading the ./src/apps/ directory');
    return [];
  }
}

export default class YourDashUnreadApplication {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
    return this;
  }

  // Returns a YourDashApplication class which is initialized with the application's data
  async read(): Promise<YourDashApplication | null> {
    try {
      return new YourDashApplication(
        JSON.parse(
          (await fs.readFile(path.resolve(process.cwd(), `./src/apps/${ this.name }/application.json`))).toString() ||
          '{}')
      );
    } catch (_err) {
      return null;
    }
  }

  async exists(): Promise<boolean> {
    // check if the application exists in the ./src/apps/ directory
    try {
      await fs.readFile(path.resolve(process.cwd(), `./src/apps/${ this.name }/application.json`));
      return true;
    } catch (_err) {
      return false;
    }
  }

  // Return the path to the application
  getPath(): string {
    return path.resolve(process.cwd(), `./src/apps/${ this.name }/`);
  }
}

type YourDashApplicationServerPlugin = ({app, io}: { app: ExpressApplication, io: SocketServer }) => any;

export {type YourDashApplicationServerPlugin};
