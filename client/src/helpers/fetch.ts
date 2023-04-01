export default function getJson(path: string, cb: (response: any) => void,
                                failure?: (response: object) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )
  
  fetch( `${ serverUrl }${ path }`, { method: "GET" } )
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

export function postJson(path: string, cb: (response: any) => void,
                         failure?: (response: object) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )
  
  fetch( `${ serverUrl }${ path }`, { method: "POST" } )
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

export function deleteJson(path: string, cb: (response: any) => void,
                           failure?: (response: object) => void
): void {
  const serverUrl = localStorage.getItem( "current_server" )
  
  fetch( `${ serverUrl }${ path }`, { method: "DELETE" } )
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
