/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js"

const main: YourDashApplicationServerPlugin = ( { exp, io } ) => {
  exp.get( "/app/diffusion_lab/models", async ( req, res ) => res.json( { models: ["everything v5", "stable diffusion 2.1", "blueberry mix"] } )
  )
}


export default main
