/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// WORK IN PROGRESS APPLICATION https://open-meteo.com/en/docs#latitude=53.5405&longitude=-2.1183&hourly=temperature_2m,precipitation_probability,weathercode,cloudcover,windspeed_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max&current_weather=true&windspeed_unit=mph&timezone=Europe%2FLondon

import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import getGeolocationSuggestions from "./helpers/locationAutocompleteSuggestions.js";
import getWeatherDataForLocationId from "./helpers/getWeatherDataForLocationId.js";
import { ILocationAutocompleteSuggestion } from "../shared/locationAutocompleteSuggestion.js";
import log, { LOG_TYPES } from "backend/src/helpers/log.js";
import geolocationApi from "./geolocationApi.js";

export const weatherForecastCache: {
  [ key: string ]: {
    cacheTime: number;
    data: any
  }
} = {};


const main: YourDashApplicationServerPlugin = ( { exp } ) => {
  geolocationApi( exp )
  
  exp.get( "/app/weather/location/:id", async ( req, res ) => {
    const { id } = req.params;
    
    if ( weatherForecastCache[ id ] ) {
      const currentTime = Math.floor( new Date().getTime() / 1000 );
      
      if ( currentTime > weatherForecastCache[ id ].cacheTime + 1_800_000 /* 30 minutes */ ) {
        return res.json( weatherForecastCache[ id ].data );
      }
      
      delete weatherForecastCache[ id ];
    }
    
    return res.json( await getWeatherDataForLocationId( id ) );
  } );
};

export default main;
