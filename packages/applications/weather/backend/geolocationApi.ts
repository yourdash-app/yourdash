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

import { Application as ExpressApplication } from "express";

import log, { LOG_TYPES } from "backend/src/helpers/log.js";
import { ILocationAutocompleteSuggestion } from "../shared/locationAutocompleteSuggestion.js";
import getGeolocationSuggestions from "./helpers/locationAutocompleteSuggestions.js";

export default function geolocationApi( exp: ExpressApplication ) {
  const geolocationApiCache = new Map<string, ILocationAutocompleteSuggestion[]>()
  
  exp.get( "/app/weather/geolocation/:locationName", async ( req, res ) => {
    const locationName = req.params.locationName;
    
    if ( req.params.locationName.length < 3 ) {
      return res.json( [] )
    }
    
    if ( geolocationApiCache.get( req.params.locationName ) )
      return res.json( geolocationApiCache.get( req.params.locationName ) );
    
    log( LOG_TYPES.INFO, `Fetching location suggestions for ${req.params.locationName}` );
    
    const suggestions = await getGeolocationSuggestions( locationName, 8 )
    
    geolocationApiCache.set( req.params.locationName, suggestions )
    
    return res.json( suggestions );
  } );
}