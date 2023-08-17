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
