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

 import { weatherStates } from "../shared/weatherStates.js";
 
/**
 # WMO Weather interpretation codes (WW)
 | Code         | Description                                                     |
 |--------------|-----------------------------------------------------------------|
 | 0            | Clear sky                                                       |
 | 1, 2, 3      | Mainly clear, partly cloudy, and overcast                       |
 | 45, 48       | Fog and depositing rime fog                                     |
 | 51, 53, 55   | Drizzle: Light, moderate, and dense intensity                   |
 | 56, 57       | Freezing Drizzle: Light and dense intensity                     |
 | 61, 63, 65   | Rain: Slight, moderate and heavy intensity                      |
 | 66, 67       | Freezing Rain: Light and heavy intensity                        |
 | 71, 73, 75   | Snow fall: Slight, moderate, and heavy intensity                |
 | 77           | Snow grains                                                     |
 | 80, 81, 82   | Rain showers: Slight, moderate, and violent                     |
 | 85, 86       | Snow showers slight and heavy                                   |
 | 95 *         | Thunderstorm: Slight or moderate                                |
 | 96, 99 *     | Thunderstorm with slight and heavy hail                         |
 
 * Thunderstorm forecast with hail is only available in *Central Europe*
 */

export default function parseWeatherCodes( code: number ): weatherStates {
  switch ( code ) {
    case 0:
    case 1:
      return weatherStates.clear;
    case 2:
      return weatherStates.partlyCloudy;
    case 3:
      return weatherStates.cloudy;
    case 45:
    case 48:
      return weatherStates.fog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 61:
    case 66:
      return weatherStates.lightRain;
    case 63:
    case 57:
      return weatherStates.rain;
    case 64:
    case 67:
    case 65:
      return weatherStates.heavyRain;
    case 71:
      return weatherStates.lightSnow;
    case 75:
      return weatherStates.heavySnow;
    case 73:
    case 77:
    case 85:
    case 86:
      return weatherStates.snow;
    case 80:
      return weatherStates.lightRainShowers;
    case 81:
      return weatherStates.rainShowers;
    case 82:
      return weatherStates.heavyRainShowers;
    case 95:
    case 96:
    case 99:
      return weatherStates.thunder;
    default:
      return 0;
  }
}
