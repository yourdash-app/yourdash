/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import React, { useState } from "react";
import { IWeatherDataForLocation } from "../../../shared/weatherDataForLocation";
import WeatherApplicationLocationPageHeader from "../../components/Header";
import getWeatherIconFromState from "../../helpers/getWeatherIconFromState";
import WeatherConditionsForHour from "../../components/WeatherConditionsForHour";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js";
import { chunk } from "@yourdash/shared/web/helpers/array";

interface IWeatherApplicationLocationPage {
  weatherData: IWeatherDataForLocation;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const WeatherApplicationLocationPage: React.FC<IWeatherApplicationLocationPage> = ({ weatherData }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  // @ts-ignore
  return (
    <div className={"overflow-hidden h-full grid grid-rows-[auto,1fr] bg-bg"}>
      <WeatherApplicationLocationPageHeader
        setSelectedDay={(day) => setSelectedDay(day)}
        selectedDay={selectedDay}
        scrollContainerRef={scrollContainerRef}
        weatherData={weatherData}
      />
      <div
        ref={scrollContainerRef}
        className={"overflow-x-hidden overflow-y-auto"}
      >
        <div className={"h-full grid lg:grid-cols-[auto,auto,auto] grid-cols-[1fr] p-4 relative gap-2"}>
          <section className={"h-full pr-2 flex flex-col gap-2 w-full max-w-sm flex-wrap"}>
            {chunk(weatherData.hourly.time, 24)[selectedDay].map((hourDate, ind) => {
              const date = new Date(hourDate);

              // return null if the date has already passed
              if (date < new Date()) return null;

              return (
                <Card
                  level={"secondary"}
                  key={hourDate}
                  className={"flex gap-1 items-center"}
                  onClick={() => {
                    setSelectedHour(ind);
                  }}
                >
                  <img
                    className={"h-16 -mt-4 -mb-4 -ml-2"}
                    src={getWeatherIconFromState(chunk(weatherData.hourly.weatherState, 24)[selectedDay][ind])}
                    alt={""}
                  />
                  <span className={"font-semibold text-4xl"}>
                    {date.getHours() + 1 < 10 ? `0${date.getHours() + 1}` : date.getHours() === 23 ? "00" : date.getHours() + 1}
                    :00
                  </span>
                  <span className={"ml-auto text-xl"}>
                    {chunk(weatherData.hourly.temperature, 24)[selectedDay][ind]}
                    {weatherData.units.hourly.temperature}
                  </span>
                </Card>
              );
            })}
          </section>
          <section className={"w-full h-full grid grid-cols-3 gap-2 grid-rows-[auto,1fr]"}>
            {
              <WeatherConditionsForHour
                selectedHour={selectedHour as number | undefined}
                selectedDay={selectedDay}
                weatherData={weatherData}
              />
            }
            <div className={"relative w-full hidden lg:block h-96"}>{/* TODO: create a graphing library for UIKit */}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WeatherApplicationLocationPage;
