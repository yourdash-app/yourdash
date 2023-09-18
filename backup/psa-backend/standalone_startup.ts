import startPsaBackend from "./index.js"
import * as minimist from "minimist"

const args = minimist( process.argv.slice( 2 ) )

if ( args.host ) {
  console.log( `Using supplied HostName: ${ args.host }` )
}

// WARNING!: THIS IS ONLY FOR DEVELOPMENT TESTING!
//           IF THIS IS IN A PRODUCTION ENVIRONMENT YOU HAVE A SERIOUS SECURITY RISK, You should never have
//           the default credentials set for the "admin" user
startPsaBackend(
  args.host
    ? `ws://${ args.host }`
    : "ws://localhost:3560",
  args.host
    ? `http://${ args.host }`
    : "http://localhost:3560",
  "admin",
  "password",
  !!args.reauth
)
