/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { promises as fs } from "fs";
import path from "path";

import { base64ToDataUrl } from "../helpers/base64.js";
import log from "../helpers/log.js";
import YourDashUser from "./user/user.js";

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
