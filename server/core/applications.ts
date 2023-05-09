import { Application as ExpressApplication } from "express"
import { promises as fs } from "fs"
import path from "path"

interface YourDashApplicationFile {
  name: string;
  displayName: string;
  description: string;
}

class YourDashApplication {
  private readonly name: string
  private application: YourDashApplicationFile

  constructor( application: YourDashApplicationFile ) {
    this.name = application.name
    this.application = application
    return this
  }

  // Returns a string containing the application's name ( this could be described as the application's ID )
  getName(): string {
    return this.application.name
  }

  // Returns a string containing the application's display name
  getDisplayName(): string {
    return this.application.displayName
  }

  // Returns a string containing the application's store description
  getDescription(): string {
    return this.application.description
  }

  // Returns a Buffer containing the data for the application's icon
  getIcon(): Promise<Buffer> {
    try {
      return fs.readFile( path.resolve( process.cwd(), `./apps/${ this.name }/icon.avif` ) )
    } catch ( _e ) {
      return fs.readFile( path.resolve( process.cwd(), "./assets/placeholder_application_icon.png" ) )
    }
  }

  // Returns a Buffer containing the data for the application's store page banner
  getStoreBackground(): Promise<Buffer> {
    try {
      return fs.readFile( path.resolve( process.cwd(), "./assets/promoted_application_default_background.png" ) )
    } catch ( _e ) {
      return fs.readFile( path.resolve( process.cwd(), "./assets/promoted_application_default_background.png" ) )
    }
  }

  // Returns true if the application is installed, otherwise returns false
  isInstalled(): boolean {
    // TODO: implement logic to check if the application is installed
    return true
  }

  // Returns the path to the application
  getPath(): string {
    return path.resolve( process.cwd(), `./apps/${ this.name }/` )
  }
}

// Returns an array of strings with the name of each application that exists ( installed or not )
export async function getAllApplications(): Promise<string[]> {
  try {
    return await fs.readdir( path.resolve( process.cwd(), "./apps/" ) )
  } catch ( _err ) {
    console.log( "an issue reading the ./apps/ directory" )
    return []
  }
}

export default class YourDashUnreadApplication {
  private readonly name: string

  constructor( name: string ) {
    this.name = name
    return this
  }

  // Returns a YourDashApplication class which is initialized with the application's data
  async read(): Promise<YourDashApplication | null> {
    try {
      return new YourDashApplication(
        JSON.parse(
          ( await fs.readFile( path.resolve( process.cwd(), `./apps/${ this.name }/application.json` ) ) )
            .toString() || "{}" )
      )
    } catch ( _err ) {
      return null
    }
  }

  // Return the path to the application
  getPath(): string {
    return path.resolve( process.cwd(), `./apps/${ this.name }/` )
  }
}

type YourDashApplicationServerPlugin = ( _app: ExpressApplication ) => any;

export { type YourDashApplicationServerPlugin }
