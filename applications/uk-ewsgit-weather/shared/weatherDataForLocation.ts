/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { WEATHER_STATES } from "./weatherStates.js";

interface IWeatherDataForLocation {
  location: {
    name: string,
    admin1?: string,
    country?: string
  },
  timezone: string,
  units: {
    hourly: {
      temperature: string,
      precipitationProbability: string,
      cloudCover: string,
      windSpeed: string,
    }
    daily: {
      temperature: {
        max: string,
        min: string
      },
      rainSum: string
      windSpeed: string
    }
  },
  currentWeather: {
    temperature: number,
    windSpeed: number,
    windDirection: number,
    weatherState: WEATHER_STATES,
    isDay: boolean,
    time: string
  },
  hourly: {
    time: string[],
    temperature: number[],
    precipitationProbability: number[],
    weatherState: WEATHER_STATES[],
    cloudCover: number[],
    windSpeed: number[]
  },
  daily: {
    time: string[],
    temperature: {
      max: number[],
      min: number[]
    },
    rainSum: number[],
    windSpeed: {
      min: number[],
      max: number[]
    },
    precipitationHours: number[],
    weatherState: WEATHER_STATES[],
    sunrise: string[],
    sunset: string[],
  },
}

export { type IWeatherDataForLocation };
