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

import * as express from "express";
import { io as socketIoClient } from "socket.io-client";
import shellExec from "shell-exec";
import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";

const app = express();

const SAVED_SESSION_PATH = path.resolve( __dirname, "saved_session.json" );

interface ISavedSession {
  sessionToken: string;
  sessionId: string;
  username: string;
}

export default async function startPsaBackend( wsInstanceUrl: string, restInstanceUrl: string, username: string, password: string, reAuth?: boolean ) {
  if ( !fs.existsSync( SAVED_SESSION_PATH ) || reAuth ) {
    fs.writeFileSync( SAVED_SESSION_PATH, "{}" );
    
    const sessionTokenResponse = await authorize( restInstanceUrl, username, password );
    
    main( wsInstanceUrl, restInstanceUrl, <ISavedSession>{
      username: username,
      sessionToken: sessionTokenResponse.token,
      sessionId: sessionTokenResponse.id
    } );
  } else {
    const savedSession = JSON.parse( fs.readFileSync( SAVED_SESSION_PATH ).toString() );
    main( wsInstanceUrl, restInstanceUrl, <ISavedSession>{
      username: savedSession.username,
      sessionToken: savedSession.sessionToken,
      sessionId: savedSession.sessionId
    } );
  }
}

async function authorize( restInstanceUrl: string, username: string, password: string ): Promise<any> {
  return await ( fetch( `${ restInstanceUrl }/core/login/user/${ username }/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      type: "psa"
    },
    body: JSON.stringify( {
      password
    } )
  } ).then( ( res: any ) => res.json() ) );
}

function main(
  wsInstanceUrl: string,
  restInstanceUrl: string,
  sessionData: {
    username: string;
    sessionToken: string;
    sessionId: string
  }
) {
  const io = socketIoClient( wsInstanceUrl, {
    query: {
      username: sessionData.username,
      sessionToken: sessionData.sessionToken,
      sessionId: sessionData.sessionId
    },
    path: "/personal-server-accelerator"
  } );
  
  fs.writeFileSync( SAVED_SESSION_PATH, JSON.stringify( <ISavedSession>{
    username: sessionData.username,
    sessionToken: sessionData.sessionToken,
    sessionId: sessionData.sessionId
  } ) );
  
  io.on( "execute-command", async ( cmd: string ) => {
    let resp = await shellExec( cmd );
    io.emit( "execute-command-response", resp );
  } );
  
  io.on( "connect", () => {
    console.log( "Connected to psa-backend!" );
  } );
  
  io.on( "disconnect", () => {
    console.log( "Disconnected from psa-backend! (retrying connection)" );
    
    function retry() {
      io.connect();
      
      if ( !io.connected ) {
        setTimeout( retry, 1000 );
      }
    }
    
    setTimeout( retry, 1000 );
  } );
  
  io.on( "/core/update", () => {
    console.log( "Update requested!" );
  } );
  
  app.get( "/", ( req, res ) => {
    res.send( "Hello curious user, welcome to the YourDash PSA (Personal Server Accelerator) backend!" );
  } );
  
  app.get( "/test", ( req, res ) => {
    res.json( { status: "ok" } );
  } );
  
  app.listen( 3561, () => {
    console.log(
      `Started psa-backend on port 3561
\t- ${ wsInstanceUrl }
\t- ${ restInstanceUrl }`
    );
  } );
}
