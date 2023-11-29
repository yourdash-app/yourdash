/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express"

export default function weatherPredictionEngine( exp: ExpressApplication ) {
  exp.get( "/app/weather/prediction-engine/", ( req, res ) => {
    return res.json( {
      workInProgress: true
    } )
  } )
}
