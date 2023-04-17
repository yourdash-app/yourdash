import { promises as fs } from "fs"
import YourDashUser from "./user.js"
import path from "path"
import { base64ToDataUrl } from "./base64.js"

export interface YourDashPanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

export enum YourDashPanelPosition {
  left, top, right, bottom,
}

export enum YourDashPanelLauncherType {
  popOut, slideOut,
}

export default class YourDashPanel {
  username: string

  constructor( username: string ) {
    this.username = username
    return this
  }

  async getQuickShortcuts(): Promise<YourDashPanelQuickShortcut[]> {
    const user = new YourDashUser( this.username )

    try {
      await new Promise<void>( resolve => {
        fs.access( path.resolve( user.getPath(), "./quick-shortcuts.json" ) )
          .then( () => {
            resolve()
          } )
          .catch( async () => {
            await fs.writeFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ), "[]" )
            resolve()
          } )
        resolve()
      } )

      return JSON.parse( ( await fs
        .readFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ) ) )
        .toString() )
    } catch ( _err ) {
      return []
    }
  }

  async removeQuickShortcut( index: number ): Promise<undefined> {
    const user = new YourDashUser( this.username )

    try {
      await new Promise<void>( resolve => {

        fs.access( path.resolve( user.getPath(), "./quick-shortcuts.json" ) ).then( () => {
          resolve()
        } ).catch( async () => {
          await fs.writeFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ), "[]" )
          resolve()
        } )
      } )

      let quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse( ( await fs
        .readFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ) ) )
        .toString() )

      quickShortcuts = quickShortcuts.filter( ( _sc, ind ) => ind !== index )

      await fs.writeFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ), JSON.stringify( quickShortcuts ) )
    } catch ( _err ) {
      return
    }
  }

  async createQuickShortcut( displayName: string, url: string, icon: Buffer ): Promise<this> {
    const user = new YourDashUser( this.username )

    try {
      await new Promise<void>( resolve => {
        fs.access( path.resolve( user.getPath(), "./quick-shortcuts.json" ) ).then( () => {
          resolve()
        } ).catch( async () => {
          await fs.writeFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ), "[]" )
          resolve()
        } )
      } )

      const quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ) ) ).toString()
      )

      if ( quickShortcuts.filter( shortcut => shortcut.url === url ).length !== 0 ) {
        return this
      }

      quickShortcuts.push( {
        url, displayName, icon: base64ToDataUrl( icon.toString( "base64" ) )
      } )

      await fs.writeFile( path.resolve( user.getPath(), "./quick-shortcuts.json" ), JSON.stringify( quickShortcuts ) )
    } catch ( _err ) {
      return this
    }

    return this
  }

  async setPanelPosition( position: YourDashPanelPosition ): Promise<this> {
    const user = new YourDashUser( this.username )

    try {
      await new Promise<void>( resolve => {
        fs.access( path.resolve( user.getPath(), "./panel.json" ) ).then( () => {
          resolve()
        } ).catch( async () => {
          await fs.writeFile( path.resolve( user.getPath(), "./panel.json" ), JSON.stringify( { position } ) )
          resolve()
        } )
      } )

      const panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      )

      panelConfig.position = position

      await fs.writeFile( path.resolve( user.getPath(), "./panel.json" ), JSON.stringify( panelConfig ) )
    } catch ( _err ) {
      return this
    }

    return this
  }

  // TODO: this returns undefined causing AppLayout to look broken
  async getPanelPosition(): Promise<YourDashPanelPosition> {
    const user = new YourDashUser( this.username )

    try {
      const defaultPosition = await new Promise<void | boolean>( async resolve => {
        fs.access( path.resolve( user.getPath(), "./panel.json" ) ).then( () => {
          resolve( false )
        } ).catch( () => resolve() )
      } )

      if ( defaultPosition !== false ) {
        return YourDashPanelPosition.left
      }

      const panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      )

      return panelConfig.position
    } catch ( _err ) {
      return YourDashPanelPosition.left
    }
  }

  async getLauncherType(): Promise<YourDashPanelLauncherType> {
    const user = new YourDashUser( this.username )

    try {
      const defaultLauncherType = await new Promise<void | YourDashPanelLauncherType>( resolve => {
        fs.access( path.resolve( user.getPath(), "./panel.json" ) ).then( () => resolve() ).catch( () => {
          resolve( YourDashPanelLauncherType.popOut )
        } )
      } )

      if ( defaultLauncherType ) {
        return defaultLauncherType
      }

      const panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      )

      return panelConfig.launcher
    } catch ( _err ) {
      return YourDashPanelLauncherType.popOut
    }
  }

  async setLauncherType( launcher: YourDashPanelLauncherType ): Promise<this> {
    const user = new YourDashUser( this.username )

    try {
      await new Promise<void>( resolve => {
        fs.access( path.resolve( user.getPath(), "./panel.json" ) ).catch( async () => {
          await fs.writeFile(
            path.resolve( user.getPath(), "./panel.json" ), JSON.stringify( { launcher: 0 } )
          )
          resolve()
        } )
      } )

      const panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      )

      panelConfig.launcher = launcher

      await fs.writeFile( path.resolve( user.getPath(), "./panel.json" ), JSON.stringify( panelConfig ) )
    } catch ( _err ) {
      return this
    }

    return this
  }
}
