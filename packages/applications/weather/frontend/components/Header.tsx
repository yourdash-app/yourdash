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

import React from "react"
import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import { IconButton } from "web-client/src/ui/index";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const WeatherApplicationLocationPageHeader: React.FC<{ weatherData: IWeatherDataForLocation}> = ( { weatherData } ) => {
  return <>
    <header className={"p-4 pt-4 pb-0 flex gap-2 h-[5.75rem] items-center justify-between from-base-700 to-transparent bg-gradient-to-b child:flex child:items-center"}>
      <section className={"flex gap-2"}>
        <IconButton icon={YourDashIcon.ChevronLeft16}/>
        <div className={"flex flex-col"}>
          <h1 className={"tracking-wide font-bold text-5xl m-0"}>{weatherData.location.name},</h1>
          <div className={"flex gap-2 text-xl"}>
            <span>{weatherData.location.admin1},</span>
            <span>{weatherData.location.country}</span>
          </div>
        </div>
      </section>
      <section>
        <IconButton icon={YourDashIcon.Bookmark16}/>
      </section>
    </header>
    <section>
      <span>{weatherData.currentWeather.weatherState}</span>
    </section>
  </>
}

export default WeatherApplicationLocationPageHeader