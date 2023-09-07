/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
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

import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import React from "react";
import { Card, Carousel, Icon } from "web-client/src/ui/index";
import getDayNameForNumericDay from "../helpers/getDayNameForNumericDay";
import useTranslate from "web-client/src/helpers/i10n";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import getWeatherIconFromState from "../helpers/getWeatherIconFromState";
import clippy from "web-client/src/helpers/clippy";

const WeatherApplicationDaysCarousel: React.FC<{
  weatherData: IWeatherDataForLocation,
  setSelectedDay: ( day: number ) => void,
  selectedDay: number
}> = ( { weatherData, setSelectedDay, selectedDay } ) => {
  const trans = useTranslate( "weather" );
  
  return <Carousel className={ "sticky top-[5.75rem] flex gap-1 p-2 pl-10 pr-10 w-full" } compactControls>
    {
      weatherData.daily.time.map( ( dayDateTime, index ) => {
        const date = new Date( dayDateTime );
        
        return <Card
          onClick={ () => {
            setSelectedDay( index )
          } }
          key={dayDateTime}
          className={clippy(
            selectedDay === index ? "mb-4" : "mt-4"
          )}
        >
          <div className={"flex gap-1 items-center"}>
            <h2 className={"flex gap-1 font-semibold text-3xl"}>
              { trans( getDayNameForNumericDay( date.getDay() ) ) }
              <span className={
                `${
                  date.getDate() === 1
                    ? "after:content-['st']"
                    : date.getDate() === 2
                      ? "after:content-['nd']"
                      : date.getDate() === 3
                        ? "after:content-['rd']"
                        : "after:content-['th']"
                } after:font-light after:text-sm after:justify-self-start flex`
              }>{ date.getDate() }</span>
            </h2>
            <img className={"w-12"} alt={""} src={getWeatherIconFromState( weatherData.daily.weatherState[index] )}/>
          </div>
          <div>
            <div className={"font-black text-3xl flex gap-1 items-center"}>
              <Icon icon={ YourDashIcon.ChevronUp } className={"h-4"} color={"#43aa8b"}/>
              <span>{weatherData.daily.temperature.max[index]}</span><span className={"text-[#43aa8b]"}>{weatherData.units.daily.temperature.max}</span>
            </div>
            <div className={"text-xl flex gap-1 items-center"}>
              <Icon icon={ YourDashIcon.ChevronDown } className={"h-4"} color={"#f94144"}/>
              <span>{weatherData.daily.temperature.min[index]}</span><span className={"text-[#f94144]"}>{weatherData.units.daily.temperature.min}</span>
            </div>
          </div>
        </Card>;
      } )
    }
  </Carousel>;
};

export default WeatherApplicationDaysCarousel;