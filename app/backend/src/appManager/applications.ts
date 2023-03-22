import * as fs from "fs";
import path from "path";
import Fs from "../fileSystem/fileSystem.js";

export function getInstallableApplications() {
  return fs.readdirSync( path.resolve( `./src/appManager/`, `apps` ) )
}

export function getInstalledApplications() {
  return fs.readdirSync( path.resolve( `./src/appManager/`, `apps` ) )
}

export function loadApplication(name: string) {
  if (getInstallableApplications().indexOf( name ) === -1) return

  require( path.resolve( __dirname, `apps`, name, `index.js` ) )
}

export interface YourDashApplication {
  name: string,
  displayName: string,
  author: string,
  description: string
}

export function getApplicationMetadata(applicationName: string): YourDashApplication {
  return JSON.parse(
      Fs.openFolder( `./src/appManager/`, `apps/`, applicationName ).openFile( `application.json` ).read() )
}
