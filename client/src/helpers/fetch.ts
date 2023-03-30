export default function getJson(
    type: "GET" | "DELETE" | "POST", path: string, cb: (response: object) => void,
    failure?: (response: object) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )
  
  fetch( `${ serverUrl }${ path }`, { method: type } )
  .then( resp => resp.json() )
  .then( resp => {
    if (resp?.error) {
      failure?.( resp )
      return console.error( `Error fetching from instance:${ path }`, resp.error )
    }
    cb( resp )
  } )
  .catch( err => {
    console.error( `Error parsing result from instance:${ path }`, err )
  } )
}

export function postJson(
    type: "GET" | "DELETE" | "POST", path: string, cb: (response: object) => void,
    failure?: (response: object) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )
  
  fetch( `${ serverUrl }${ path }`, { method: type } )
  .then( resp => resp.json() )
  .then( resp => {
    if (resp?.error) {
      failure?.( resp )
      return console.error( `Error fetching from instance:${ path }`, resp.error )
    }
    cb( resp )
  } )
  .catch( err => {
    console.error( `Error parsing result from instance:${ path }`, err )
  } )
}

export function deleteJson(
    type: "GET" | "DELETE" | "POST", path: string, cb: (response: object) => void,
    failure?: (response: object) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )
  
  fetch( `${ serverUrl }${ path }`, { method: type } )
  .then( resp => resp.json() )
  .then( resp => {
    if (resp?.error) {
      failure?.( resp )
      return console.error( `Error fetching from instance:${ path }`, resp.error )
    }
    cb( resp )
  } )
  .catch( err => {
    console.error( `Error parsing result from instance:${ path }`, err )
  } )
}
