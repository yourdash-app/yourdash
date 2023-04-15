import { promises as fs } from "fs"
import path from "path"

interface YourDashApplicationFile {
  name: string;
  displayName: string;
  description: string;
}

export default class YourDashApplication {
  private readonly name: string
  private application: YourDashApplicationFile

  constructor( name: string ) {
    this.name = name
    return this
  }

  async load(): Promise<this> {
    try {
      this.application = JSON.parse(
        ( await fs.readFile( path.resolve( process.cwd(), `./apps/${this.name}/application.json` ) ) )
          .toString() || "{}" )
    } catch ( err ) {
      console.error( err )
    }

    return this
  }

  exists(): boolean {
    return !!this.application
  }

  getName(): string {
    return this.application.name
  }

  getDisplayName(): string {
    return this.application.displayName
  }

  getDescription(): string {
    return this.application.description
  }

  getPath(): string {
    return path.resolve( process.cwd(), `./apps/${this.name}/` )
  }
}

export async function getAllApplications(): Promise<string[]> {
  try {
    return await fs.readdir( path.resolve( process.cwd(), "./apps/" ) )
  } catch ( _err ) {
    console.log( "an issue reading the ./apps/ directory" )
    return []
  }
}

type YourDashApplicationServerPlugin = ( _app: Express.Application ) => any;

export { type YourDashApplicationServerPlugin }
