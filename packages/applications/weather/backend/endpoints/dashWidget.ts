/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Module from "backend/src/core/moduleManager/module.js";

export default function weatherDashWidget( api: Module["API"] ) {
  api.request.get( "/app/weather/hourly/:locationId", ( req, res ) => {
    // TODO: actually return weather data
    return res.json( {
      status: 200
    } )
  } )
}
