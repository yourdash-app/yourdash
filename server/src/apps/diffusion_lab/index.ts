import { type YourDashApplicationServerPlugin } from "../../helpers/applications.js"

const main: YourDashApplicationServerPlugin = ( { app } ) => {
  console.log( "diffusion_lab: loaded" )
}

export default main
