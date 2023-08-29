/*
 * Copyright (c) 2023 YourDash contributors.
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

import YourDashUnreadUser, { YourDashUserPermissions } from "backend/src/helpers/user.js";
import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import globalDatabase from "backend/src/helpers/globalDatabase.js";
import path from "path";

const main: YourDashApplicationServerPlugin = ( { exp } ) => {
  exp.get( "/app/global_db/db", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    const user = await new YourDashUnreadUser( username ).read();
    
    if ( user.hasPermission( YourDashUserPermissions.Administrator ) ) {
      return res.json( {
        db: globalDatabase.keys
      } );
    }
    
    return res.json( {
      error: true
    } );
  } );
  
  exp.post( "/app/global_db/db", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    const keys = req.body;
    
    const user = await new YourDashUnreadUser( username ).read();
    
    if ( user.hasPermission( YourDashUserPermissions.Administrator ) ) {
      globalDatabase.merge( keys );
      
      return res.json( {
        success: true
      } );
    }
    
    return res.json( { error: true } );
  } );
  
  exp.post( "/app/global_db/db/force-write", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    const keys = req.body;
    
    const user = await new YourDashUnreadUser( username ).read();
    
    if ( user.hasPermission( YourDashUserPermissions.Administrator ) ) {
      globalDatabase.merge( keys );
      await globalDatabase.writeToDisk( path.resolve( process.cwd(), "./fs/globalDatabase.json" ) );
      
      return res.json( {
        success: true
      } );
    }
    
    return res.json( { error: true } );
  } );
};

export default main;
