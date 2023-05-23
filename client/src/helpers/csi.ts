// YourDash Client-Server interface Toolkit
type TJson = boolean | number | string | null | TJson[] | { [ key: string ]: TJson };

class __internalClientServerInteraction {
  constructor() {
    return this
  }

  getJson( endpoint: string, cb: ( response: any ) => void, error?: ( response: object ) => void ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com"
    const username = localStorage.getItem( "username" ) || ""
    const sessiontoken = localStorage.getItem( "session_token" ) || ""

    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "GET",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        username,
        token: sessiontoken
      }
    } )
      .then( resp => {
        if ( resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8" ) {
          return resp.json()
        }

        throw new Error( "not a valid JSON response" )
      } )
      .then( resp => {
        if ( resp?.error ) {
          error?.( resp )
          if ( resp.error === "authorization fail" ) {
            console.error( "unauthorized request ", endpoint )
            window.location.href = "/"
            return
          }
          return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error )
        }
        cb( resp )
      } )
      .catch( err => {
        console.error( `Error parsing result from instance: ${ endpoint }`, err )
      } )
  }

  postJson( endpoint: string, body: TJson, cb: ( response: any ) => void, error?: ( response: object ) => void, extraHeaders?: { [ key: string ]: string } ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com"
    const username = localStorage.getItem( "username" ) || ""
    const sessiontoken = localStorage.getItem( "session_token" ) || ""

    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "POST",
      body: JSON.stringify( body ),
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        username,
        token: sessiontoken,
        ...( extraHeaders || {} )
      }
    } )
      .then( resp => {
        if ( resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8" ) {
          return resp.json()
        }

        throw new Error( "not a valid JSON response" )
      } )
      .then( resp => {
        if ( resp?.error ) {
          error?.( resp )
          if ( resp.error === "authorization fail" ) {
            console.error( "unauthorized request ", endpoint )
            window.location.href = "/"
            return
          }
          return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error )
        }
        cb( resp )
      } )
      .catch( err => {
        console.error( `Error parsing result from instance: ${ endpoint }`, err )
      } )
  }

  deleteJson( endpoint: string, cb: ( response: any ) => void, error?: ( response: object ) => void ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com"
    const username = localStorage.getItem( "username" ) || ""
    const sessiontoken = localStorage.getItem( "session_token" ) || ""

    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "DELETE",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        username,
        token: sessiontoken
      }
    } )
      .then( resp => {
        if ( resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8" ) {
          return resp.json()
        }

        throw new Error( "not a valid JSON response" )
      } )
      .then( resp => {
        if ( resp?.error ) {
          error?.( resp )
          if ( resp.error === "authorization fail" ) {
            console.error( "unauthorized request ", endpoint )
            window.location.href = "/"
            return
          }
          return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error )
        }
        cb( resp )
      } )
      .catch( err => {
        console.error( `Error parsing result from instance: ${ endpoint }`, err )
      } )
  }

  getText( endpoint: string, cb: ( response: any ) => void, error?: ( response: object ) => void ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com"
    const username = localStorage.getItem( "username" ) || ""
    const sessiontoken = localStorage.getItem( "session_token" ) || ""

    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "GET",
      // @ts-ignore
      headers: {
        "Content-Type": "text/plain",
        username,
        token: sessiontoken
      }
    } )
      .then( resp => {
        if ( resp.headers.get( "Content-Type" ) === "text/plain; charset=utf-8" ) {
          return resp.json()
        }

        throw new Error( "not a valid text response" )
      } )
      .then( resp => {
        if ( resp?.error ) {
          error?.( resp )
          if ( resp.error === "authorization fail" ) {
            console.error( "unauthorized request ", endpoint )
            window.location.href = "/"
            return
          }
          return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error )
        }
        cb( resp )
      } )
      .catch( err => {
        console.error( `Error parsing result from instance: ${ endpoint }`, err )
      } )
  }

  postText( endpoint: string, body: string, cb: ( response: any ) => void, error?: ( response: object ) => void ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com"
    const username = localStorage.getItem( "username" ) || ""
    const sessiontoken = localStorage.getItem( "session_token" ) || ""

    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "POST",
      body: JSON.stringify( body ),
      // @ts-ignore
      headers: {
        "Content-Type": "text/plain",
        username,
        token: sessiontoken
      }
    } )
      .then( resp => {
        if ( resp.headers.get( "Content-Type" ) === "text/plain; charset=utf-8" ) {
          return resp.json()
        }

        throw new Error( "not a valid text response" )
      } )
      .then( resp => {
        if ( resp?.error ) {
          error?.( resp )
          if ( resp.error === "authorization fail" ) {
            console.error( "unauthorized request ", endpoint )
            window.location.href = "/"
            return
          }
          return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error )
        }
        cb( resp )
      } )
      .catch( err => {
        console.error( `Error parsing result from instance: ${ endpoint }`, err )
      } )
  }

  deleteText( endpoint: string, cb: ( response: any ) => void, error?: ( response: object ) => void ): void {
    const instanceUrl = localStorage.getItem( "current_server" ) || "https://example.com"
    const username = localStorage.getItem( "username" ) || ""
    const sessiontoken = localStorage.getItem( "session_token" ) || ""

    fetch( `${ instanceUrl }${ endpoint }`, {
      method: "DELETE",
      // @ts-ignore
      headers: {
        "Content-Type": "text/plain",
        username,
        token: sessiontoken
      }
    } )
      .then( resp => {
        if ( resp.headers.get( "Content-Type" ) === "text/plain; charset=utf-8" ) {
          return resp.json()
        }

        throw new Error( "not a valid text response" )
      } )
      .then( resp => {
        if ( resp?.error ) {
          error?.( resp )
          if ( resp.error === "authorization fail" ) {
            console.error( "unauthorized request ", endpoint )
            window.location.href = "/"
            return
          }
          return console.error( `Error fetching from instance: ${ endpoint }, Error:`, resp.error )
        }
        cb( resp )
      } )
      .catch( err => {
        console.error( `Error parsing result from instance: ${ endpoint }`, err )
      } )
  }
}

const csi = new __internalClientServerInteraction()

// @ts-ignore
window.csi = csi

export default csi
