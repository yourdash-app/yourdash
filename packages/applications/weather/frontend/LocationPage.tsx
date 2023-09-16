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
  const trans = useTranslate( "weather" );
  const navigate = useNavigate();
  const scrollContainerRef = React.useRef<HTMLDivElement>( null );
  
  const [selectedDay, setSelectedDay] = useState<number>( 0 );
  const [selectedHour, setSelectedHour] = useState<number | null>( null );
  
  // @ts-ignore
  return (
    <div className={ "overflow-hidden h-full grid grid-rows-[auto,1fr]" }>
      <WeatherApplicationLocationPageHeader
        setSelectedDay={ day => setSelectedDay( day ) }
        selectedDay={ selectedDay }
        scrollContainerRef={ scrollContainerRef }
        weatherData={ weatherData }
      />
      <div ref={ scrollContainerRef } className={ "h-full grid lg:grid-cols-[auto,auto,1fr] grid-cols-[1fr] p-4 overflow-x-hidden" }>
        <Column className={ "overflow-auto h-full pr-2 w-max" }>
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
        <div className={"relative w-full hidden lg:block h-96"}>
          {/*
            TODO: create a graphing library for UIKit
          */}
          <Line
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Weather for the next 24 hours",
                  align: "end"
                },
              },
              // @ts-ignore
              transitions: true,
              spanGaps: true
            }}
            data={
              {
                labels: chunk( weatherData.hourly.time, 24 )[selectedDay].map( time => {
                  const date = new Date( time )
                  return `${
                    date.getHours() < 9
                      ? `0${date.getHours() + 1}`
                      : date.getHours() + 1
                  }:00`
                } ),
                datasets: [
                  {
                    label: trans( "GRAPH.WEATHER_CONDITION" ),
                    data: chunk( weatherData.hourly.weatherState, 24 )[selectedDay].map( state => {
                      return parseWeatherCodes( state )
                    } ),
                    backgroundColor: "#8338EC88",
                    borderColor: "#8338EC88",
                    borderCapStyle: "round",
                    borderWidth: 8,
                    tension: 0.25,
                    pointRadius: 16,
                    pointBackgroundColor: "#0000",
                    pointBorderWidth: 0,
                    // @ts-ignore
                    hoverPointRadius: 16
                  },
                  {
                    label: "Rain Chance (%)",
                    data: chunk( weatherData.hourly.precipitationProbability, 24 )[selectedDay],
                    backgroundColor: "#3A86FF88",
                    borderColor: "#3A86FF88",
                    borderCapStyle: "round",
                    borderWidth: 8,
                    tension: 0.25,
                    pointRadius: 16,
                    pointBackgroundColor: "#0000",
                    pointBorderWidth: 0,
                    // @ts-ignore
                    hoverPointRadius: 16
                  },
                  {
                    label: `Average Temperature (${weatherData.units.hourly.temperature})`,
                    data: chunk( weatherData.hourly.temperature, 24 )[selectedDay],
                    backgroundColor: "#FB5607",
                    borderColor: "#FB5607",
                    borderCapStyle: "round",
                    borderWidth: 8,
                    tension: 0.25,
                    pointRadius: 16,
                    pointBackgroundColor: "#0000",
                    pointBorderWidth: 0,
                    // @ts-ignore
                    hoverPointRadius: 16
                  },
                  {
                    label: `Average Wind Speed (${weatherData.units.hourly.windSpeed})`,
                    data: chunk( weatherData.hourly.windSpeed, 24 )[selectedDay],
                    backgroundColor: "#FF006E",
                    borderColor: "#FF006E",
                    borderCapStyle: "round",
                    borderWidth: 8,
                    tension: 0.25,
                    pointRadius: 16,
                    pointBackgroundColor: "#0000",
                    pointBorderWidth: 0,
                    // @ts-ignore
                    hoverPointRadius: 16
                  }
                ]
              }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherApplicationLocationPage;
