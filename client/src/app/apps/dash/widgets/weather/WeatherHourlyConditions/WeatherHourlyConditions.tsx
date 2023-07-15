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
      <div className={"flex pl-2.5 pt-2 pr-2 items-end gap-1"}>
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
