/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import useTranslate from "web-client/src/helpers/i10n";
import { Card } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import { IWeatherDataForLocation } from "../../../../../weather/shared/weatherDataForLocation";
import BlankDashWidget from "../../blank/BlankDashWidget";

const WeatherHourlyConditionsWidget: React.FC = () => {
  const trans = useTranslate( "weather" );
  const [ weatherData, setWeatherData ] = useState<IWeatherDataForLocation | null>( null );
  const [ locationData, setLocationData ] = useState<any>( null );

  useEffect( () => {
    // fetch the user's defined location but default to London
    csi.getJson( `/app/weather/hourly/${csi.userDB.get( "app:dash:widget:weather:location" ) || "2643743"}`, res => {
      setWeatherData( res.data );
      setLocationData( res.location );
      console.log( res );
    } );
  }, [] );

  if ( !weatherData || !locationData ) {
    return <BlankDashWidget/>;
  }

  return (
    <Card className={"flex flex-col col-span-2 p-1 max-w-full"}>
      <div className={"flex pl-2.5 pt-2 pr-2 items-end gap-1 w-full text-left"}>
        <span className={"font-bold text-4xl"}>
          {`${locationData?.name}, `}
        </span>
        {
          locationData?.admin1 && (
            <span className={"opacity-95 text-xl"}>
              {`${locationData?.admin1}, `}
            </span>
          )
        }
        <span className={"opacity-75"}>
          {locationData?.country}
        </span>
      </div>
      <main className={"flex h-full p-2 gap-2 overflow-x-auto max-w-full"}>
        {/* {
          weatherData?.hourly.time.map((hour: string, ind: number) => {
            const temperature = weatherData?.hourly.temperature_2m[ ind ];
            const condition = weatherData?.hourly.weathercode[ ind ];
            const conditionIcon = getWeatherIconFromState(condition);
            const rainChance = weatherData?.hourly.precipitation_probability[ ind ];
            const feelsLike = weatherData?.hourly.apparent_temperature[ ind ];
            const date = new Date(hour);
            const currentDate = new Date();
            const conditionState = condition;

            if (date.getHours() < currentDate.getHours()) {
              return null;
            }

            // eslint-disable-next-line no-magic-numbers
            const time = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

            return (
              <HourlyConditionsHour
                conditionState={conditionState}
                conditionIcon={conditionIcon}
                time={time}
                feelsLike={feelsLike}
                rainChance={rainChance}
                temperature={temperature}
                key={hour}
              />
            );
          })
        } */}
      </main>
      <a href={"https://open-meteo.com"} className={"mt-auto ml-auto pr-1.5 pt-1 text-[#ffffff55] text-sm"}>
        {"Powered by open-meteo.com"}
      </a>
    </Card>
  );
};

export default WeatherHourlyConditionsWidget;
