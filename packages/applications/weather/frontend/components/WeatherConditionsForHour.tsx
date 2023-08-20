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

import React from "react";
import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import { chunk } from "web-client/src/helpers/array";
import { Card } from "web-client/src/ui/index";

interface IWeatherConditionsForHour {
  weatherData: IWeatherDataForLocation,
  selectedDay: number,
  selectedHour: number,
}

const WeatherConditionsForHour: React.FC<IWeatherConditionsForHour> = ( {
  weatherData,
  selectedDay,
  selectedHour
} ) => {
  const [selectedHourDate, setSelectedHourDate] = React.useState<Date | null>( null );
  
  React.useEffect( () => {
    setSelectedHourDate(
      new Date( chunk( weatherData.hourly.time, 24 )[selectedDay][selectedHour] )
    )
  }, [ selectedDay, selectedHour ] )
  
  if ( !selectedHourDate ) return null
  
  return <section className={ "h-max ml-2 mr-2 flex flex-col gap-2" }>
    <section className={"gap-2 flex text-xl"}>
      <span>
        {
          selectedHourDate.toLocaleDateString( undefined, { dateStyle: "full" } )
        }
      </span>
      <span>
        {
          selectedHourDate.getHours() < 9
            ? `0${selectedHourDate.getHours() + 1}`
            : selectedHourDate.getHours() + 1
        }:00
      </span>
    </section>
    {/* Hourly metrics section */}
    <section className={"grid gap-2 grid-cols-3"}>
      <Card
        level={"secondary"}
        className={"flex items-center justify-center flex-col gap-2"}
      >
        <span className={"font-semibold text-2xl"}>
          Wind  speed
        </span>
        {
          chunk( weatherData.hourly.windSpeed, 24 )[selectedDay][selectedHour]
        }
        {
          weatherData.units.hourly.windSpeed.replace( "mp/h", "mph" )
        }
      </Card>
      <Card
        level={"secondary"}
        className={"flex items-center justify-center flex-col gap-2"}
      >
        <span className={"font-semibold text-2xl"}>
          Cloud cover
        </span>
        {
          chunk( weatherData.hourly.cloudCover, 24 )[selectedDay][selectedHour]
        }
        {
          weatherData.units.hourly.cloudCover
        }
      </Card>
      <Card
        level={"secondary"}
        className={"flex items-center justify-center flex-col gap-2"}
      >
        <span className={"font-semibold text-2xl"}>
          Rain  probability
        </span>
        {
          chunk( weatherData.hourly.precipitationProbability, 24 )[selectedDay][selectedHour]
        }
        {
          weatherData.units.hourly.precipitationProbability
        }
      </Card>
    </section>
  </section>;
};

export default WeatherConditionsForHour;