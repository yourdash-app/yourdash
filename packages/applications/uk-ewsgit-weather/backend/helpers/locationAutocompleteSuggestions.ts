/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { type ILocationSearchResult } from "../../shared/locationSearchResult.js";
import { fetch } from "undici";
import core from "@yourdash/backend/src/core/core.js";

const geolocationSuggestionsCache = new Map<string, ILocationSearchResult[]>();

export default async function getGeolocationSuggestions(locationName: string, suggestionCount: number): Promise<ILocationSearchResult[]> {
  locationName = locationName.replaceAll(" ", "+");
  if (locationName.endsWith("+")) locationName = locationName.slice(0, -1);
  if (locationName.startsWith("+")) locationName = locationName.slice(1);
  if (locationName.length < 3) return [];

  if (geolocationSuggestionsCache.get(locationName)) {
    core.log.info("app/weather", `Responding with cached location data for location '${locationName}'`);
    return geolocationSuggestionsCache.get(locationName)!;
  }

  core.log.info("app/weather", `Fetching location suggestions for ${locationName}`);
  const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=${suggestionCount}&language=en&format=json`;

  try {
    const fetchRequest = await fetch(endpoint);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = (await fetchRequest.json()) as any;

    if (!response) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const output = response.results.map((result: any) => {
      return {
        id: result.id,
        address: {
          name: result.name,
          admin1: result.admin1,
          country: result.country,
        },
        latitude: result.latitude,
        longitude: result.longitude,
      } as ILocationSearchResult;
    });

    geolocationSuggestionsCache.set(locationName, output);

    return output;
  } catch (_err) {
    return [];
  }
}
