/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashModule from "backend/src/core/yourDashModule.js";
import getWeatherDataForLocationId from "./helpers/getWeatherDataForLocationId.js";
import geolocationApi from "./geolocationApi.js";
export const weatherForecastCache = {};
export default class WeatherModule extends YourDashModule {
  constructor( args ) {
    super( args );
    geolocationApi( this.API().request );
    this.API().request.get( "/app/weather/location/:id", async ( req, res ) => {
      const { id } = req.params;
      if ( weatherForecastCache[id] ) {
        const currentTime = Math.floor( new Date().getTime() / 1000 );
        if ( currentTime > weatherForecastCache[id].cacheTime + 1_800_000 ) {
          return res.json( weatherForecastCache[id].data );
        }
        delete weatherForecastCache[id];
      }
      return res.json( await getWeatherDataForLocationId( id ) );
    } );
  }
}
// # sourceMappingURL=index.js.map
