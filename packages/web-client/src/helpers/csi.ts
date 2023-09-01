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

// YourDash Client-Server interface Toolkit
import KeyValueDatabase from "../../../shared/core/database";

type ITJson = boolean | number | string | null | TJson

type TJson = {
  [ key: string ]: ITJson
}

class __internalClientServerInteraction {
  userDB: KeyValueDatabase;
  
  constructor() {
    this.userDB = new KeyValueDatabase();
    
    return this;
  }
  
  getJson(
    endpoint: string,
    cb: ( response: any ) => void,
    error?: ( response: string ) => void,
    extraHeaders?: {
      [ key: string ]: string
    }
  ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com";
    const username = localStorage.getItem( "username" ) || "";
    const sessiontoken = localStorage.getItem( "session_token" ) || "";
    
    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "GET",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessiontoken,
        ...( extraHeaders || {} )
      }
    } ).then( resp => {
      if ( resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8" ) {
        return resp.json();
      }
      
      throw new Error( "not a valid JSON response" );
    } ).then( resp => {
      if ( resp?.error ) {
        error?.( resp );
        if ( resp.error === "authorization fail" ) {
          console.error( "unauthorized request ", endpoint );
          window.location.href = "/";
          return;
        }
        console.error( `Error fetching from instance: (json) GET ${ endpoint }, Error:`, resp.error );
        return;
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: (json) GET ${ endpoint }`, err );
    } );
  }
  
  postJson(
    endpoint: string,
    body: TJson,
    cb: ( response: any ) => void,
    error?: ( response: string ) => void,
    extraHeaders?: {
      [ key: string ]: string
    }
  ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com";
    const username = localStorage.getItem( "username" ) || "";
    const sessiontoken = localStorage.getItem( "session_token" ) || "";
    
    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify( body ),
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessiontoken,
        ...( extraHeaders || {} )
      }
    } ).then( resp => {
      if ( resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8" ) {
        return resp.json();
      }
      
      throw new Error( "not a valid JSON response" );
    } ).then( resp => {
      if ( resp?.error ) {
        error?.( resp );
        if ( resp.error === "authorization fail" ) {
          console.error( "unauthorized request ", endpoint );
          window.location.href = "/";
          return;
        }
        console.error( `Error fetching from instance: (json) POST ${ endpoint }, Error:`, resp.error );
        return;
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: (json) POST ${ endpoint }`, err );
    } );
  }
  
  deleteJson(
    endpoint: string,
    cb: ( response: any ) => void,
    error?: ( response: string ) => void,
    extraHeaders?: {
      [ key: string ]: string
    }
  ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com";
    const username = localStorage.getItem( "username" ) || "";
    const sessiontoken = localStorage.getItem( "session_token" ) || "";
    
    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "DELETE",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessiontoken
      }
    } ).then( resp => {
      if ( resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8" ) {
        return resp.json();
      }
      
      throw new Error( "not a valid JSON response" );
    } ).then( resp => {
      if ( resp?.error ) {
        error?.( resp );
        if ( resp.error === "authorization fail" ) {
          console.error( "unauthorized request ", endpoint );
          window.location.href = "/";
          return;
        }
        console.error( `Error fetching from instance: (json) DELETE ${ endpoint }, Error:`, resp.error );
        return;
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: (json) DELETE ${ endpoint }`, err );
    } );
  }
  
  getText(
    endpoint: string,
    cb: ( response: any ) => void,
    error?: ( response: string ) => void,
    extraHeaders?: {
      [ key: string ]: string
    }
  ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com";
    const username = localStorage.getItem( "username" ) || "";
    const sessiontoken = localStorage.getItem( "session_token" ) || "";
    
    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "GET",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        username,
        token: sessiontoken,
        ...( extraHeaders || {} )
      }
    } ).then( resp => {
      if ( resp.headers.get( "Content-Type" ) === "text/plain; charset=utf-8" ) {
        return resp.json();
      }
      
      throw new Error( "not a valid text response" );
    } ).then( resp => {
      if ( resp?.error ) {
        error?.( resp );
        if ( resp.error === "authorization fail" ) {
          console.error( "unauthorized request ", endpoint );
          window.location.href = "/";
          return;
        }
        
        console.error( `Error fetching from instance: (txt) GET ${ endpoint }, Error:`, resp.error );
        return;
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: (txt) GET ${ endpoint }`, err );
    } );
  }
  
  postText(
    endpoint: string,
    body: TJson,
    cb: ( response: any ) => void,
    error?: ( response: string ) => void,
    extraHeaders?: {
      [ key: string ]: string
    }
  ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com";
    const username = localStorage.getItem( "username" ) || "";
    const sessiontoken = localStorage.getItem( "session_token" ) || "";
    
    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify( body ),
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessiontoken,
        ...( extraHeaders || {} )
      }
    } ).then( resp => resp.text() )
      .then( resp => {
        cb( resp );
      } ).catch( err => {
        console.error( `Error parsing result from instance: (txt) POST ${ endpoint }`, err );
      } );
  }
  
  deleteText(
    endpoint: string,
    cb: ( response: any ) => void,
    error?: ( response: string ) => void,
    extraHeaders?: {
      [ key: string ]: string
    }
  ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com";
    const username = localStorage.getItem( "username" ) || "";
    const sessiontoken = localStorage.getItem( "session_token" ) || "";
    
    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "DELETE",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        username,
        token: sessiontoken,
        ...( extraHeaders || {} )
      }
    } ).then( resp => {
      if ( resp.headers.get( "Content-Type" ) === "text/plain; charset=utf-8" ) {
        return resp.json();
      }
      
      throw new Error( "not a valid text response" );
    } ).then( resp => {
      if ( resp?.error ) {
        error?.( resp );
        if ( resp.error === "authorization fail" ) {
          console.error( "unauthorized request ", endpoint );
          window.location.href = "/";
          return;
        }
        console.error( `Error fetching from instance: (txt) DELETE ${ endpoint }, Error:`, resp.error );
        return;
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: (txt) DELETE ${ endpoint }`, err );
    } );
  }
  
  getInstanceUrl(): string {
    return localStorage.getItem( "current_server" ) || "https://example.com";
  }
  
  getUserName(): string {
    return localStorage.getItem( "username" ) || "";
  }
  
  getUserDB() {
    this.getJson( "/core/user_db", data => {
      this.userDB.clear();
      this.userDB.keys = data;
    } );
    return this.userDB;
  }
  
  setUserDB( database: KeyValueDatabase ): Promise<KeyValueDatabase> {
    return new Promise<KeyValueDatabase>( ( resolve, reject ) => {
    
      const previousKeys = this.userDB.keys;
      this.postJson( "/core/user_db",
        database.keys,
        () => {
          this.userDB.keys = database.keys;
          
          resolve( this.userDB )
        },
        () => {
          this.userDB.keys = previousKeys

          reject( "Unable to save the user database to the server" )
        } );
    } )
  }
}

const csi = new __internalClientServerInteraction();

// @ts-ignore
window.csi = csi;

export default csi;
