/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "web-client/src/helpers/i10n";
import { IWeatherDataForLocation } from "../shared/weatherDataForLocation";
import WeatherApplicationLocationPageHeader from "./components/Header";
import { Column, Card } from "web-client/src/ui/index";
import { chunk } from "web-client/src/helpers/array";
import getWeatherIconFromState from "./helpers/getWeatherIconFromState";
import WeatherConditionsForHour from "./components/WeatherConditionsForHour";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js";
import parseWeatherCodes from "../backend/helpers/parseWeatherState";

interface IWeatherApplicationLocationPage {
  weatherData: IWeatherDataForLocation;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const WeatherApplicationLocationPage: React.FC<IWeatherApplicationLocationPage> = ( { weatherData } ) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>( null );
  
  const [selectedDay, setSelectedDay] = useState<number>( 0 );
  const [selectedHour, setSelectedHour] = useState<number | null>( null );
  
  // @ts-ignore
  return (
    <div className={ "overflow-hidden h-full grid grid-rows-[auto,1fr] bg-bg" }>
      <WeatherApplicationLocationPageHeader
        setSelectedDay={ day => setSelectedDay( day ) }
        selectedDay={ selectedDay }
        scrollContainerRef={ scrollContainerRef }
        weatherData={ weatherData }
      />
      <div ref={ scrollContainerRef } className={ "overflow-x-hidden overflow-y-auto" }>
        <div className={"h-full grid lg:grid-cols-[auto,auto,auto] grid-cols-[1fr] p-4 relative gap-2"}>
          <Column className={ "h-full pr-2 w-max" }>
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
                        : date.getHours() === 23
                          ? "00"
                          : date.getHours() + 1
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
          <section className={"w-full h-max sticky top-0 grid grid-cols-3 gap-2 grid-rows-[auto,1fr]"}>
            {
              <WeatherConditionsForHour
                selectedHour={ selectedHour as number | undefined }
                selectedDay={ selectedDay }
                weatherData={ weatherData }
              />
            }
            <div className={"relative w-full hidden lg:block h-96"}>
              {/*
            TODO: create a graphing library for UIKit
          */}
            
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WeatherApplicationLocationPage;
