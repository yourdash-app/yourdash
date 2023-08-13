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

import React, { useEffect, useState } from "react";
import useTranslate from "../../../../../../helpers/l10n";
import { Card } from "../../../../../../ui";
import csi from "../../../../../../helpers/csi";
import { getWeatherIconFromState } from "../../../../weather/location";
import HourlyConditionsHour from "./HourlyConditionsHour";
import { chunk } from "../../../../../../helpers/array";

const WeatherHourlyConditions: React.FC = () => {
  const trans = useTranslate( "weather" );
  const [weatherData, setWeatherData] = useState<any>( null );
  const [locationData, setLocationData] = useState<any>( null );
  
  useEffect( () => {
    csi.getJson( "/app/weather/hourly/London", res => {
      setWeatherData( res.data );
      setLocationData( res.location );
      console.log( res );
    } );
  }, [] );
  
  if ( !weatherData || !locationData ) {
    return null;
  }
  
  return (
    <Card className={"flex flex-col col-span-2 p-1 max-w-full"}>
      <div className={"flex pl-2.5 pt-2 pr-2 items-end gap-1 w-full text-left"}>
        <span className={"font-bold text-4xl"}>
          {`${ locationData?.name }, `}
        </span>
        {
          locationData?.admin1 && (
            <span className={"opacity-95 text-xl"}>
              {`${ locationData?.admin1 }, `}
            </span>
          )
        }
        <span className={"opacity-75"}>
          {`${ locationData?.country }`}
        </span>
      </div>
      <main className={"flex h-full p-2 gap-2 overflow-x-auto max-w-full"}>
        {
          weatherData?.hourly.time.map( ( hour: string, ind: number ) => {
            const temperature = weatherData?.hourly.temperature_2m[ind];
            const condition = weatherData?.hourly.weathercode[ind];
            const conditionIcon = getWeatherIconFromState( condition );
            const rainChance = weatherData?.hourly.precipitation_probability[ind];
            const feelsLike = weatherData?.hourly.apparent_temperature[ind];
            const date = new Date( hour );
            const currentDate = new Date();
            const conditionState = condition;
            
            if ( date.getHours() < currentDate.getHours() ) {
              return null;
            }
            
            // eslint-disable-next-line no-magic-numbers
            const time = `${ date.getHours() < 10 ? `0${ date.getHours() }` : date.getHours() }:${ date.getMinutes() < 10 ? `0${ date.getMinutes() }` : date.getMinutes() }`;
            
            return (
              <HourlyConditionsHour conditionState={conditionState} conditionIcon={conditionIcon} time={time} feelsLike={feelsLike} rainChance={rainChance} temperature={temperature} key={hour}/>
            );
          } )
        }
      </main>
      <a href={"https://open-meteo.com"} className={"mt-auto ml-auto pr-1.5 pt-1 text-[#ffffff55] text-sm"}>
        {"Powered by open-meteo.com"}
      </a>
    </Card>
  );
};

export default WeatherHourlyConditions;
