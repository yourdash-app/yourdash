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

import { WEATHER_STATES } from "../../shared/weatherStates";
import WEATHER_ICON_CLEAR from "../assets/weatherIcons/clear.svg";
import WEATHER_ICON_HEAVY_RAIN from "../assets/weatherIcons/heavy_rain.svg";
import WEATHER_ICON_LIGHT_RAIN from "../assets/weatherIcons/light_rain.svg";
import WEATHER_ICON_SNOW from "../assets/weatherIcons/snow.svg";
import WEATHER_ICON_CLOUDY from "../assets/weatherIcons/cloudy.svg";
import WEATHER_ICON_PARTLY_CLOUDY from "../assets/weatherIcons/partly_cloudy.svg";
import APPLICATION_LOGO from "../assets/weatherIcons/partly_cloudy.svg";

export default function getWeatherIconFromState( state: WEATHER_STATES ): string {
  switch ( state ) {
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