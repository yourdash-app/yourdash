const SERVER = {
  delete(path: string, headers?: HeadersInit): Promise<Response> {
    console.log( `%c[%cSERVER%c]: %cDELETE%c ${ path }`, "color:lightgray", "color:orange", "color:lightgray",
                 "color:red", "color:lightgray"
    );
    const defaultHeaders = {
      "content-type": "application/json",
      sessiontoken: sessionStorage.getItem( "sessiontoken" ) as string,
      username: localStorage.getItem( "username" ) as string,
    } as HeadersInit;
    const url = localStorage.getItem( "currentServer" );
    return new Promise( (resolve) => {
      try {
        fetch( `${ url }/api${ path }`, {
          headers: {
            ...defaultHeaders, ...headers,
          }, method: "DELETE",
        } ).then( (res) => {
          return resolve( res );
        } ).catch( (err) => {
          console.log( err );
        } );
      } catch (err) {
        console.log( err )
      }
    } );
  }, get(path: string, headers?: HeadersInit): Promise<Response> {
    console.log( `%c[%cSERVER%c]: %cGET%c ${ path }`, "color:lightgray", "color:orange", "color:lightgray",
                 "color:limegreen", "color:lightgray"
    );
    const defaultHeaders = {
      "content-type": "application/json",
      sessiontoken: sessionStorage.getItem( "sessiontoken" ) as string,
      username: localStorage.getItem( "username" ) as string,
    } as HeadersInit;
    const url = localStorage.getItem( "currentServer" );
    return new Promise( (resolve) => {
      try {
        fetch( `${ url }/api${ path }`, {
          headers: {
            ...defaultHeaders, ...headers,
          }, method: "GET",
        } ).then( (res) => {
          return resolve( res );
        } ).catch( (err) => {
          console.log( err );
        } );
      } catch (err) {
        console.log( err )
      }
    } );
  }, post(path: string, extras: { headers?: HeadersInit; body?: string }): Promise<Response> {
    console.log( `%c[%cSERVER%c]: %cPOST%c ${ path }`, "color:lightgray", "color:orange", "color:lightgray",
                 "color:purple", "color:lightgray"
    );
    const defaultHeaders = {
      "content-type": "application/json",
      sessiontoken: sessionStorage.getItem( "sessiontoken" ) as string,
      username: localStorage.getItem( "username" ) as string,
    } as HeadersInit;
    const url = localStorage.getItem( "currentServer" );
    return new Promise( (resolve) => {
      try {
        fetch( `${ url }/api${ path }`, {
          body: extras?.body, headers: {
            ...defaultHeaders, ...extras?.headers,
          }, method: "POST",
        } ).then( (res) => {
          return resolve( res );
        } ).catch( (err) => {
          console.log( err );
        } );
      } catch (err) {
        console.log( err )
      }
    } );
  },
};

export default SERVER;

export function verifyAndReturnJson(req: Promise<Response>, res: (_res: any) => void, error: (json?: object) => void) {
  req.then( (resp) => {
    resp.json().then( (json) => {
      if (!json.error) return res( json );
      error( json );
    } ).catch( () => {
      error();
    } );
  } ).catch( (err) => {
    console.error( err );
    error();
  } );
}
