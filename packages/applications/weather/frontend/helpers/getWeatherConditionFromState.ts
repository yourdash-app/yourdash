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

// returns the weather description for the given weather state
export default function getWeatherConditionFromState( state: WEATHER_STATES ): string {
  switch ( state ) {
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
