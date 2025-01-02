/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { WEATHER_STATES } from "../../shared/weatherStates";

// returns the weather description for the given weather state
export default function getWeatherConditionFromState(state: WEATHER_STATES): string {
  switch (state) {
    case WEATHER_STATES.CLEAR:
      return "CONDITION_CLEAR_SKIES";
    case WEATHER_STATES.HEAVY_RAIN:
      return "CONDITION_HEAVY_RAIN";
    case WEATHER_STATES.HEAVY_SNOW:
      return "CONDITION_HEAVY_SNOW";
    case WEATHER_STATES.CLOUDY:
      return "CONDITION_CLOUDY";
    case WEATHER_STATES.LIGHT_SNOW:
      return "CONDITION_LIGHT_SNOW";
    case WEATHER_STATES.FOG:
      return "CONDITION_FOG";
    case WEATHER_STATES.LIGHT_RAIN:
      return "CONDITION_LIGHT_RAIN";
    case WEATHER_STATES.RAIN_SHOWERS:
      return "CONDITION_RAIN_SHOWER";
    case WEATHER_STATES.HEAVY_RAIN_SHOWERS:
      return "CONDITION_HEAVY_RAIN_SHOWER";
    case WEATHER_STATES.LIGHT_RAIN_SHOWERS:
      return "CONDITION_LIGHT_RAIN_SHOWER";
    case WEATHER_STATES.PARTLY_CLOUDY:
      return "CONDITION_PARTLY_CLOUDY";
    case WEATHER_STATES.RAIN:
      return "CONDITION_RAIN";
    case WEATHER_STATES.SNOW:
      return "CONDITION_SNOW";
    case WEATHER_STATES.THUNDER:
      return "CONDITION_THUNDER";
    default:
      return "unknown";
  }
}
