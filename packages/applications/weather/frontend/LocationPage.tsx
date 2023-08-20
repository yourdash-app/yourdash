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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "web-client/src/helpers/l10n";
import { IWeatherDataForLocation } from "../shared/weatherDataForLocation";
import WeatherApplicationLocationPageHeader from "./components/Header";
import { Column, Button, Card } from "web-client/src/ui/index";
import { chunk } from "web-client/src/helpers/array";
import getWeatherIconFromState from "./helpers/getWeatherIconFromState";
import WeatherConditionsForHour from "./components/WeatherConditionsForHour";

interface IWeatherApplicationLocationPage {
  weatherData: IWeatherDataForLocation
}

const WeatherApplicationLocationPage: React.FC<IWeatherApplicationLocationPage> = ( { weatherData } ) => {
  const trans = useTranslate( "weather" );
  const navigate = useNavigate();
  const scrollContainerRef = React.useRef<HTMLDivElement>( null );
  
  const [selectedDay, setSelectedDay] = useState<number>( 0 );
  const [selectedHour, setSelectedHour] = useState<number | null>( null );
  
  return (
    <div className={ "overflow-hidden h-full grid grid-rows-[auto,1fr]" }>
      <WeatherApplicationLocationPageHeader
        setSelectedDay={ day => setSelectedDay( day ) }
        selectedDay={selectedDay}
        scrollContainerRef={ scrollContainerRef }
        weatherData={ weatherData }
      />
      <div ref={ scrollContainerRef } className={ "h-full overflow-auto grid grid-cols-[auto,1fr,auto] p-4" }>
        <Column className={"overflow-auto h-full pr-2"}>
          {
            chunk( weatherData.hourly.time, 24 )[ selectedDay ].map( ( hourDate, ind ) => {
              const date = new Date( hourDate );
            
              return <Card
                level={ "secondary" }
                key={ hourDate }
                className={ "flex gap-1 text-3xl font-semibold items-center" }
                onClick={ () => {
                  setSelectedHour( ind );
                } }
              >
                <span>
                  {
                    ( date.getHours() + 1 ) < 10
                      ? `0${ date.getHours() + 1 }`
                      : ( date.getHours() === 23
                        ? "00"
                        : date.getHours() + 1 )
                  }:00
                </span>
                <img
                  className={ "h-8" }
                  src={ getWeatherIconFromState(
                    chunk(
                      weatherData.hourly.weatherState,
                      24
                    )[ selectedDay ][ ind ] )
                  }
                  alt={ "" }
                />
                <span>
                  {
                    chunk( weatherData.hourly.temperature, 24 )[ selectedDay ][ ind ]
                  }
                  {
                    weatherData.units.hourly.temperature
                  }
                </span>
              </Card>;
            } )
          }
        </Column>
        {
          selectedHour !== null
            ? <WeatherConditionsForHour
              selectedHour={ selectedHour }
              selectedDay={ selectedDay }
              weatherData={ weatherData }
            />
            : <div />
        }
        <section className={"h-full"}>
          <h1>CONDITIONS FOR DAY</h1>
        </section>
      </div>
    </div>
  );
};

export default WeatherApplicationLocationPage;
