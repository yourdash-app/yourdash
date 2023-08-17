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

import { weatherStates } from "shared/apps/weather/weatherStates";

// returns the weather description for the given weather state
export default function getWeatherConditionFromState( state: weatherStates ): string {
  switch ( state ) {
  case weatherStates.clear:
    return "CONDITION_CLEAR_SKIES";
  case weatherStates.heavyRain:
    return "CONDITION_HEAVY_RAIN";
  case weatherStates.heavySnow:
    return "CONDITION_HEAVY_SNOW";
  case weatherStates.cloudy:
    return "CONDITION_CLOUDY";
  case weatherStates.lightSnow:
    return "CONDITION_LIGHT_SNOW";
  case weatherStates.fog:
    return "CONDITION_FOGGY";
  case weatherStates.lightRain:
    return "CONDITION_LIGHT_RAIN";
  case weatherStates.rainShowers:
    return "CONDITION_RAIN_SHOWER";
  case weatherStates.heavyRainShowers:
    return "CONDITION_HEAVY_RAIN_SHOWER";
  case weatherStates.lightRainShowers:
    return "CONDITION_LIGHT_RAIN_SHOWER";
  case weatherStates.partlyCloudy:
    return "CONDITION_PARTLY_CLOUDY";
  case weatherStates.rain:
    return "CONDITION_RAIN";
  case weatherStates.snow:
    return "CONDITION_SNOW";
  case weatherStates.thunder:
    return "CONDITION_THUNDER";
  default:
    return "unknown";
  }
}
