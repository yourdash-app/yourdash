/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { chunk } from "@yourdash/shared/web/helpers/array";
import Card from "@yourdash/chiplet/components/card/Card";
import React from "react";
import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import { WEATHER_STATES } from "../../shared/weatherStates";
import getWeatherConditionFromState from "../helpers/getWeatherConditionFromState";

interface IWeatherConditionsForHour {
  weatherData: IWeatherDataForLocation;
  selectedDay: number;
  selectedHour?: number;
}

const WeatherConditionsForHour: React.FC<IWeatherConditionsForHour> = ({ weatherData, selectedDay, selectedHour }) => {
  const trans = useTranslate("uk-ewsgit-weather");
  const [selectedHourDate, setSelectedHourDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (selectedHour !== undefined) {
      setSelectedHourDate(new Date(chunk(weatherData.hourly.time, 24)[selectedDay][selectedHour]));
    }
  }, [selectedDay, selectedHour]);

  if (!selectedHourDate || selectedHour === null) {
    return (
      <Card
        className={"col-span-3 flex items-center justify-center h-max sticky top-4"}
        showBorder
      >
        <h1>Click an hour to show more information.</h1>
      </Card>
    );
  }

  return (
    <>
      <Card
        className={"gap-2 flex col-span-3 items-center justify-center w-full sticky top-4"}
        showBorder
      >
        <span className={"text-3xl font-semibold tracking-wide"}>
          {selectedHourDate.toLocaleDateString(undefined, { dateStyle: "full" })}
        </span>
        <span className={"text-3xl font-semibold tracking-wide"}>
          {selectedHourDate.getHours() < 9 ? `0${selectedHourDate.getHours() + 1}` : selectedHourDate.getHours() + 1}:00
        </span>
      </Card>
      {/* Weather conditions description */}
      <Card
        className={"gap-2 flex col-span-3 items-center justify-center w-full"}
        showBorder
      >
        <span className={"text-2xl tracking-wide"}>
          {chunk(weatherData.hourly.temperature, 24)[selectedDay][selectedHour || 0]}
          {weatherData.units.hourly.temperature}{" "}
          {chunk(weatherData.hourly.weatherState, 24)[selectedDay][selectedHour || 0] !== WEATHER_STATES.PARTLY_CLOUDY ? "with" : "and"}{" "}
          {trans(getWeatherConditionFromState(chunk(weatherData.hourly.weatherState, 24)[selectedDay][selectedHour || 0]))}
        </span>
      </Card>
      {/* Hourly metrics section */}
      <Card
        className={"flex items-center justify-center flex-col gap-2"}
        showBorder
      >
        <span className={"font-semibold text-2xl"}>Wind speed</span>
        {chunk(weatherData.hourly.windSpeed, 24)[selectedDay][selectedHour || 0]}
        {weatherData.units.hourly.windSpeed.replace("mp/h", "mph")}
      </Card>
      <Card
        className={"flex items-center justify-center flex-col gap-2"}
        showBorder
      >
        <span className={"font-semibold text-2xl"}>Cloud cover</span>
        {chunk(weatherData.hourly.cloudCover, 24)[selectedDay][selectedHour || 0]}
        {weatherData.units.hourly.cloudCover}
      </Card>
      <Card
        className={"flex items-center justify-center flex-col gap-2"}
        showBorder
      >
        <span className={"font-semibold text-2xl"}>Rain probability</span>
        {chunk(weatherData.hourly.precipitationProbability, 24)[selectedDay][selectedHour || 0]}
        {weatherData.units.hourly.precipitationProbability}
      </Card>
    </>
  );
};

export default WeatherConditionsForHour;
