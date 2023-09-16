/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { fetch } from "undici";
import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation.js";
import parseWeatherCodes from "./parseWeatherState.js";

export default async function getWeatherDataForLongitudeAndLatitude( id: string ): Promise<IWeatherDataForLocation> {
  const locationRequest = await fetch( `https://geocoding-api.open-meteo.com/v1/get?id=${ id }&language=en&format=json` );
  const locationResponse = await locationRequest.json() as IWeatherDataForLocation["location"] & {
    latitude: string,
    longitude: string
  };
  
  const TIMEZONE = "Europe/London";
  const fetchRequest = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${ locationResponse.latitude }&longitude=${ locationResponse.longitude }&hourly=temperature_2m,precipitation_probability,weathercode,cloudcover,windspeed_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max&current_weather=true&windspeed_unit=mph&timezone=${ TIMEZONE.replaceAll( "/", "%2F" ) }`
  );
  
  interface IRequestResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: {
      temperature: number;
      windspeed: number;
      winddirection: number;
      weathercode: number;
      is_day: boolean;
      time: string;
    };
    hourly_units: {
      time: string;
      temperature_2m: string;
      precipitation_probability: string;
      weathercode: string;
      cloudcover: string;
      windspeed_80m: string;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      precipitation_probability: number[];
      weathercode: number[];
      cloudcover: number[];
      windspeed_80m: number[];
    };
    daily_units: {
      time: string;
      weathercode: string;
      temperature_2m_max: string;
      temperature_2m_min: string;
      sunrise: string;
      sunset: string;
      uv_index_max: string;
      rain_sum: string;
      precipitation_hours: string;
      windspeed_10m_max: string;
      windgusts_10m_max: string;
    };
    daily: {
      time: string[];
      weathercode: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      sunrise: string[];
      sunset: string[];
      uv_index_max: number[];
      rain_sum: number[];
      precipitation_hours: number[];
      windspeed_10m_max: number[];
      windgusts_10m_max: number[];
    };
  }
  
  const requestResponse = await fetchRequest.json() as IRequestResponse;
  
  const output: IWeatherDataForLocation = {
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