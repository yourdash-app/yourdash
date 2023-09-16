/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
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
  
  return <section className={ "h-max ml-2 mr-2 flex flex-col gap-2 w-max" }>
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