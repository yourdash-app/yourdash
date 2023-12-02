/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express";

import { ILocationAutocompleteSuggestion } from "../shared/locationAutocompleteSuggestion.js";
import getGeolocationSuggestions from "./helpers/locationAutocompleteSuggestions.js";
import coreApi from "backend/src/core/coreApi.js";

export default function geolocationApi( exp: ExpressApplication ) {
  const geolocationApiCache = new Map<string, ILocationAutocompleteSuggestion[]>()

  exp.get( "/app/weather/geolocation/", ( req, res ) => {
    return res.json( [] )
  } )

  exp.get( "/app/weather/geolocation/:locationName", async ( req, res ) => {
    const locationName = req.params.locationName;

    if ( req.params.locationName.length < 3 ) {
      return res.json( [] )
    }

    if ( geolocationApiCache.get( req.params.locationName ) )
      return res.json( geolocationApiCache.get( req.params.locationName ) );

    coreApi.log.info( "app:weather", `Fetching location suggestions for ${req.params.locationName}` );

    const suggestions = await getGeolocationSuggestions( locationName, 8 )

    geolocationApiCache.set( req.params.locationName, suggestions )

    return res.json( suggestions );
  } );
}
