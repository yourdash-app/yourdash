export default function getJson(
  path: string,
  cb: ( response: any ) => void,
  failure?: ( response: object ) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )

  fetch( `${ serverUrl }${ path }`, {
    method: "GET",
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
      username: localStorage.getItem( "username" ),
      token: sessionStorage.getItem( "session_token" )
    }
  } )
    .then( resp => {
      if (
        resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8"
      ) {
        return resp.json()
      }

      throw new Error( "not a valid JSON response" )
    } )
    .then( resp => {
      if ( resp?.error ) {
        failure?.( resp )
        return console.error(
          `Error fetching from instance: ${ path }, Error:`,
          resp.error
        )
      }
      cb( resp )
    } )
    .catch( err => {
      console.error( `Error parsing result from instance: ${ path }`, err )
    } )
}

export function postJson(
  path: string,
  body: object,
  cb: ( response: any ) => void,
  failure?: ( response: object ) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )

  fetch( `${ serverUrl }${ path }`, {
    method: "POST",
    body: JSON.stringify( body ),
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
      username: localStorage.getItem( "username" ),
      token: sessionStorage.getItem( "session_token" )
    }
  } )
    .then( resp => {
      if (
        resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8"
      ) {
        return resp.json()
      }

      throw new Error( "not a valid JSON response" )
    } )
    .then( resp => {
      if ( resp?.error ) {
        failure?.( resp )
        return console.error(
          `Error fetching from instance: ${ path }, Error:`,
          resp.error
        )
      }
      cb( resp )
    } )
    .catch( err => {
      console.error( `Error parsing result from instance: ${ path }`, err )
    } )
}

export function deleteJson(
  path: string,
  cb: ( response: any ) => void,
  failure?: ( response: object ) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )

  fetch( `${ serverUrl }${ path }`, {
    method: "DELETE",
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
      username: localStorage.getItem( "username" ),
      token: sessionStorage.getItem( "session_token" )
    }
  } )
    .then( resp => {
      if (
        resp.headers.get( "Content-Type" ) === "application/json; charset=utf-8"
      ) {
        return resp.json()
      }

      throw new Error( "not a valid JSON response" )
    } )
    .then( resp => {
      if ( resp?.error ) {
        failure?.( resp )
        return console.error(
          `Error fetching from instance: ${ path }, Error:`,
          resp.error
        )
      }
      cb( resp )
    } )
    .catch( err => {
      console.error( `Error parsing result from instance: ${ path }`, err )
    } )
}
