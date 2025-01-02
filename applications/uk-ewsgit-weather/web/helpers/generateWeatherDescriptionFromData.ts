/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import getWeatherConditionFromState from "./getWeatherConditionFromState";

function describeWindDirection(windDirection: number) {
  const directionNumber = windDirection % (360 / 22.5);

  switch (directionNumber) {
    case 0:
      return "N";
    case 1:
      return "NNE";
    case 2:
      return "NE";
    case 3:
      return "ENE";
    case 4:
      return "E";
    case 5:
      return "ESE";
    case 6:
      return "SE";
    case 7:
      return "SSE";
    case 8:
      return "S";
    case 9:
      return "SSW";
    case 10:
      return "SW";
    case 11:
      return "WSW";
    case 12:
      return "W";
    case 13:
      return "WNW";
    case 14:
      return "NW";
    case 15:
      return "NNW";
    case 16:
      return "N";
  }
}

function describeWind(windDirection: number, windSpeed: number) {
  const windSpeedCategory = Math.floor(windSpeed / 5);

  switch (windSpeedCategory) {
    case 0:
      return `gentle ${describeWindDirection(windDirection)} breeze`;
    case 1:
      return `light ${describeWindDirection(windDirection)} breeze`;
    case 2:
      return `moderate ${describeWindDirection(windDirection)} winds`;
    case 3:
      return `strong ${describeWindDirection(windDirection)} winds`;
    case 4:
      return `gale force ${describeWindDirection(windDirection)} winds`;
  }
}

export default function generateWeatherDescriptionFromData(
  trans: (message: string) => string,
  currentWeatherData: IWeatherDataForLocation["currentWeather"],
  isMetric = false,
) {
  const weatherState = getWeatherConditionFromState(currentWeatherData.weatherState);
  const temperature = Math.round(currentWeatherData.temperature);
  const windDescription = describeWind(currentWeatherData.windDirection, currentWeatherData.windSpeed);

  return `Currently ${trans(weatherState)} at ${temperature}°C with a ${windDescription}`;
}
