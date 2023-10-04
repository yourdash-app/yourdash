/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { fetch } from "undici";
import parseWeatherCodes from "./parseWeatherState.js";
import log, { logType } from "backend/src/helpers/log.js";
export default async function getWeatherDataForLongitudeAndLatitude( id ) {
  const locationRequest = await fetch( `https://geocoding-api.open-meteo.com/v1/get?id=${id}&language=en&format=json` );
  const locationResponse = await locationRequest.json();
  const TIMEZONE = "Europe/London";
  let fetchRequest;
  try {
    fetchRequest = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${locationResponse.latitude}&longitude=${locationResponse.longitude}&hourly=temperature_2m,precipitation_probability,weathercode,cloudcover,windspeed_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max&current_weather=true&windspeed_unit=mph&timezone=${TIMEZONE.replaceAll( "/", "%2F" )}` );
  }
  catch ( e ) {
    log( logType.WARNING, "Could not fetch weather data", e );
  }
  const requestResponse = await fetchRequest.json();
  const output = {
    location: {
      name: locationResponse.name,
      admin1: locationResponse.admin1,
      country: locationResponse.country
    },
    timezone: TIMEZONE,
    currentWeather: {
      temperature: requestResponse.current_weather.temperature,
      windSpeed: requestResponse.current_weather.windspeed,
      windDirection: requestResponse.current_weather.winddirection,
      weatherState: parseWeatherCodes( requestResponse.current_weather.weathercode ),
      isDay: requestResponse.current_weather.is_day,
      time: requestResponse.current_weather.time
    },
    units: {
      daily: {
        temperature: {
          min: requestResponse.daily_units.temperature_2m_min,
          max: requestResponse.daily_units.temperature_2m_max
        },
        windSpeed: requestResponse.daily_units.windspeed_10m_max,
        rainSum: requestResponse.daily_units.rain_sum
      },
      hourly: {
        temperature: requestResponse.hourly_units.temperature_2m,
        windSpeed: requestResponse.hourly_units.windspeed_80m,
        cloudCover: requestResponse.hourly_units.cloudcover,
        precipitationProbability: requestResponse.hourly_units.precipitation_probability
      }
    },
    hourly: {
      time: requestResponse.hourly.time,
      temperature: requestResponse.hourly.temperature_2m,
      precipitationProbability: requestResponse.hourly.precipitation_probability,
      cloudCover: requestResponse.hourly.cloudcover,
      windSpeed: requestResponse.hourly.windspeed_80m,
      weatherState: requestResponse.hourly.weathercode.map( code => parseWeatherCodes( code ) ),
    },
    daily: {
      time: requestResponse.daily.time,
      temperature: {
        min: requestResponse.daily.temperature_2m_min,
        max: requestResponse.daily.temperature_2m_max
      },
      windSpeed: {
        min: requestResponse.daily.windspeed_10m_max,
        max: requestResponse.daily.windgusts_10m_max
      },
      precipitationHours: requestResponse.daily.precipitation_hours,
      weatherState: requestResponse.daily.weathercode.map( code => parseWeatherCodes( code ) ),
      rainSum: requestResponse.daily.rain_sum,
      sunrise: requestResponse.daily.sunrise,
      sunset: requestResponse.daily.sunset
    }
  };
  return output;
}
// # sourceMappingURL=getWeatherDataForLocationId.js.map
