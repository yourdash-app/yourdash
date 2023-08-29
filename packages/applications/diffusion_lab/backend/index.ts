import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js"

const main: YourDashApplicationServerPlugin = ( { exp, io } ) => {
  exp.get( "/app/diffusion_lab/models", async ( req, res ) => res.json( { models: ["everything v5", "stable diffusion 2.1", "blueberry mix"] } )
  )
}


export default main
