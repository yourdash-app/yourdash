/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { type ILocationSearchResult } from "../../shared/locationSearchResult.js";
import { fetch } from "undici";

export default async function getGeolocationSuggestions( input: string, suggestionCount: number ): Promise<ILocationSearchResult[]> {
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
      } as ILocationSearchResult;
    } );
  } catch ( _err ) {
    return []
  }
}
