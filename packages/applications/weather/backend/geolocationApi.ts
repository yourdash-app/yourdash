/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express";
import getGeolocationSuggestions from "./helpers/locationAutocompleteSuggestions.js";

export default function geolocationApi( exp: ExpressApplication ) {

  exp.get( "/app/weather/geolocation/", ( req, res ) => {
    return res.json( [] )
  } )

  exp.get( "/app/weather/geolocation/:locationName", async ( req, res ) => {
    const locationName = req.params.locationName;

    return res.json( await getGeolocationSuggestions( locationName, 8 ) );
  } );
}
