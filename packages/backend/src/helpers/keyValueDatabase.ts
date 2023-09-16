/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs, writeFile } from "fs";

import KVD from "shared/core/database.js";

export default class KeyValueDatabase extends KVD {
  constructor() {
    super();
  }

  _internalDoNotUseOnlyIntendedForShutdownSequenceWriteToDisk( path: string, cb?: () => void ) {
    try {
      writeFile( path, JSON.stringify( this.keys ), cb );
    } catch ( _err ) {
      /* empty */
    }
  }

  async writeToDisk( path: string ): Promise<boolean> {
    try {
      await fs.writeFile( path, JSON.stringify( this.keys ) );
      return true;
    } catch ( _err ) {
      return false;
    }
  }

  async readFromDisk( path: string ) {
    try {
      const data = await fs.readFile( path, "utf8" );
      this.keys = JSON.parse( data );
      return true;
    } catch ( _err ) {
      return false;
    }
  }
}
