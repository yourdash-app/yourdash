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

import { type ILocationAutocompleteSuggestion } from "../../shared/locationAutocompleteSuggestion.js";
import { fetch } from "undici";

export default async function getGeolocationSuggestions( input: string, suggestionCount: number ): Promise<ILocationAutocompleteSuggestion[]> {
  const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${input.replaceAll( " ", "+" )}&count=${suggestionCount}&language=en&format=json`;
  
  try {
    const fetchRequest = await fetch( endpoint );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = ( await fetchRequest.json() ) as any;
    
    if ( !response ) {
      return [];
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.results.map( ( result: any ) => {
      return {
        id: result.id,
        address: {
          name: result.name,
          admin1: result.admin1,
          country: result.country
        },
        latitude: result.latitude,
        longitude: result.longitude
      } as ILocationAutocompleteSuggestion;
    } );
  } catch ( _err ) {
    return []
  }
}