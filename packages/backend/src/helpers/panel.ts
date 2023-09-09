import { promises as fs } from "fs";
import path from "path";

import { base64ToDataUrl } from "./base64.js";
import log from "./log.js";
import YourDashUser from "./user.js";

export interface YourDashPanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

export enum YourDashPanelPosition {
  left,
  top,
  right,
  bottom
}

export enum YourDashPanelLauncherType {
  popOut,
  slideOut
}

const DEFAULT_PANEL_CONFIG = {
  launcher: YourDashPanelLauncherType.popOut,
  position: YourDashPanelPosition.left
};

export default class YourDashPanel {
  username: string;

  constructor( username: string ) {
    this.username = username;
    return this;
  }

  async getQuickShortcuts(): Promise<YourDashPanelQuickShortcut[]> {
    const user = await new YourDashUser( this.username ).read();
  
    const db = await user.getPersonalDatabase()
    
    console.log( db.get( "core:panel:quickShortcuts" ) )
    
    return JSON.parse( db.get( "core:panel:quickShortcuts" ) || "[]" )
  }

  async removeQuickShortcut( index: number ): Promise<this> {
    const user = await new YourDashUser( this.username ).read();
  
    const db = await user.getPersonalDatabase()
    
    const shortcuts = JSON.parse( db.get( "core:panel:quickShortcuts" ) )
    
    shortcuts.splice( index, 1 )
    
    db.set( "core:panel:quickShortcuts", JSON.stringify( shortcuts ) )
    
    return this
  }

  async createQuickShortcut( applicationID: string ): Promise<this> {
    const user = await new YourDashUser( this.username ).read();
  
    const db = await user.getPersonalDatabase()
    
    const shortcuts = JSON.parse( db.get( "core:panel:quickShortcuts" ) || "[]" )
    
    if ( shortcuts.indexOf( applicationID ) !== -1 ) {
      return this
    }
    
    shortcuts.push( applicationID )
    
    db.set( "core:panel:quickShortcuts", JSON.stringify( shortcuts ) )
    
    return this
  }

  async setPanelPosition( position: YourDashPanelPosition ): Promise<this> {
    const user = new YourDashUser( this.username );

    let panelConfig: any;

    try {
      panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      );
    } catch ( _err ) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.position = position;

    try {
      await fs.writeFile( path.resolve( user.getPath(), "./panel.json" ), JSON.stringify( panelConfig ) );
    } catch ( _err ) {
      return this;
    }

    return this;
  }

  async getPanelPosition(): Promise<YourDashPanelPosition> {
    const user = new YourDashUser( this.username );

    let panelConfig;

    try {
      panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      );
    } catch ( _err ) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    return panelConfig.position;
  }

  async getLauncherType(): Promise<YourDashPanelLauncherType> {
    const user = new YourDashUser( this.username );

    let panelConfig;

    try {
      panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      );
    } catch ( _err ) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    return panelConfig.launcher;
  }

  async setLauncherType( launcher: YourDashPanelLauncherType ): Promise<this> {
    const user = new YourDashUser( this.username );

    let panelConfig;

    try {
      panelConfig = JSON.parse(
        ( await fs.readFile( path.resolve( user.getPath(), "./panel.json" ) ) ).toString()
      );
    } catch ( _err ) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.launcher = launcher;

    try {
      await fs.writeFile( path.resolve( user.getPath(), "./panel.json" ), JSON.stringify( panelConfig ) );
    } catch ( _err ) {
      return this;
    }

    return this;
  }
}
