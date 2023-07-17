// YourDash Client-Server interface Toolkit
type ITJSON = boolean | number | string | null | any[]

type TJson = {
  [ key: string ]: ITJSON
}

class __internalClientServerInteraction {
  constructor() {
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
        return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error );
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: ${ endpoint }`, err );
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
        return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error );
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: ${ endpoint }`, err );
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
        return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error );
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: ${ endpoint }`, err );
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
        
        console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error );
        return;
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: ${ endpoint }`, err );
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
        console.error( `Error parsing result from instance: ${ endpoint }`, err );
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
        return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error );
      }
      cb( resp );
    } ).catch( err => {
      console.error( `Error parsing result from instance: ${ endpoint }`, err );
    } );
  }
  
  getInstanceUrl(): string {
    return localStorage.getItem( "current_server" ) || "https://example.com";
  }
}

const csi = new __internalClientServerInteraction();

// @ts-ignore
window.csi = csi;

export default csi;
