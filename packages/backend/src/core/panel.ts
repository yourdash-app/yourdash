/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import YourDashUser from "./core/user/index.js";

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

  async getQuickShortcuts(): Promise<string[]> {
    const user = new YourDashUser( this.username );
  
    const db = await user.getDatabase()
    
    return db.get( "core:panel:quickShortcuts" ) || []
  }

  async removeQuickShortcut( index: number ): Promise<this> {
    const user = new YourDashUser( this.username );
  
    const db = await user.getDatabase()
    
    const shortcuts = db.get( "core:panel:quickShortcuts" ) || []
    
    shortcuts.splice( index, 1 )
    
    db.set( "core:panel:quickShortcuts", shortcuts )
    user.saveDatabase()
    
    return this
  }

  async createQuickShortcut( applicationID: string ): Promise<this> {
    const user = new YourDashUser( this.username );
  
    const db = await user.getDatabase()
    
    const shortcuts = db.get( "core:panel:quickShortcuts" ) || []
    
    if ( shortcuts.indexOf( applicationID ) !== -1 ) {
      return this
    }
    
    shortcuts.push( applicationID )
    
    db.set( "core:panel:quickShortcuts", shortcuts )
    user.saveDatabase()
    
    return this
  }

  async setPanelPosition( position: YourDashPanelPosition ): Promise<this> {
    const user = new YourDashUser( this.username );

    let panelConfig: any;

    try {
      panelConfig = JSON.parse(
        ( await fs.readFile( path.join( user.path, "core/panel.json" ) ) ).toString()
      );
    } catch ( _err ) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.position = position;

    try {
      await fs.writeFile( path.join( user.path, "core/panel.json" ), JSON.stringify( panelConfig ) );
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
        ( await fs.readFile( path.join( user.path, "core/panel.json" ) ) ).toString()
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
        ( await fs.readFile( path.join( user.path, "core/panel.json" ) ) ).toString()
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
        ( await fs.readFile( path.join( user.path, "core/panel.json" ) ) ).toString()
      );
    } catch ( _err ) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.launcher = launcher;

    try {
      await fs.writeFile( path.join( user.path, "core/panel.json" ), JSON.stringify( panelConfig ) );
    } catch ( _err ) {
      return this;
    }

    return this;
  }
}
