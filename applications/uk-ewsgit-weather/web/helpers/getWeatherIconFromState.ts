/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { WEATHER_STATES } from "../../shared/weatherStates";
import WEATHER_ICON_CLEAR from "../assets/weatherIcons/clear.svg";
import WEATHER_ICON_HEAVY_RAIN from "../assets/weatherIcons/heavy_rain.svg";
import WEATHER_ICON_LIGHT_RAIN from "../assets/weatherIcons/light_rain.svg";
import WEATHER_ICON_SNOW from "../assets/weatherIcons/snow.svg";
import WEATHER_ICON_CLOUDY from "../assets/weatherIcons/cloudy.svg";
import WEATHER_ICON_PARTLY_CLOUDY from "../assets/weatherIcons/partly_cloudy.svg";
import APPLICATION_LOGO from "../assets/weatherIcons/partly_cloudy.svg";

export default function getWeatherIconFromState(state: WEATHER_STATES): string {
  switch (state) {
    case WEATHER_STATES.CLEAR:
      return WEATHER_ICON_CLEAR;
    case WEATHER_STATES.PARTLY_CLOUDY:
      return WEATHER_ICON_PARTLY_CLOUDY;
    case WEATHER_STATES.CLOUDY:
      return WEATHER_ICON_CLOUDY;
    case WEATHER_STATES.FOG:
      return WEATHER_ICON_CLOUDY;
    case WEATHER_STATES.LIGHT_RAIN:
      return WEATHER_ICON_LIGHT_RAIN;
    case WEATHER_STATES.RAIN:
      return WEATHER_ICON_HEAVY_RAIN;
    case WEATHER_STATES.HEAVY_RAIN:
      return WEATHER_ICON_HEAVY_RAIN;
    case WEATHER_STATES.LIGHT_SNOW:
      return WEATHER_ICON_SNOW;
    case WEATHER_STATES.HEAVY_SNOW:
      return WEATHER_ICON_SNOW;
    default:
      return APPLICATION_LOGO;
  }
}
