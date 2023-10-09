/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// WORK IN PROGRESS APPLICATION https://open-meteo.com/en/docs#***REMOVED***&hourly=temperature_2m,precipitation_probability,weathercode,cloudcover,windspeed_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max&current_weather=true&windspeed_unit=mph&timezone=Europe%2FLondon

import YourDashModule, { YourDashModuleArguments } from "backend/src/core/yourDashModule.js";
import getWeatherDataForLocationId from "./helpers/getWeatherDataForLocationId.js";
import geolocationApi from "./geolocationApi.js";

export const weatherForecastCache: {
  [ key: string ]: {
    cacheTime: number;
    data: any
  }
} = {};

export default class WeatherModule extends YourDashModule {
  
  constructor( args: YourDashModuleArguments ) {
    super( args );
    
    geolocationApi( this.API().request )
  
    this.API().request.get( "/app/weather/location/:id", async ( req, res ) => {
      const { id } = req.params;
    
      if ( weatherForecastCache[ id ] ) {
        const currentTime = Math.floor( new Date().getTime() / 1_000 );
      
        if ( currentTime > weatherForecastCache[ id ].cacheTime + 1_800_000 /* 30 minutes */ ) {
          return res.json( { ...weatherForecastCache[ id ].data, collectedAt: weatherForecastCache[ id ].cacheTime } );
        }
      
        delete weatherForecastCache[ id ];
      }
    
      return res.json( await getWeatherDataForLocationId( id ) );
    } );
  }
}
