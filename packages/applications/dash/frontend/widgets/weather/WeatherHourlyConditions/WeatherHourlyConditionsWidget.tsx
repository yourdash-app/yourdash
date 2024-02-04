/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import useTranslate from "@yourdash/web-client/src/helpers/i18n";
import { Card, Row, Spinner } from "@yourdash/web-client/src/ui";
import csi from "@yourdash/web-client/src/helpers/csi";
import generateWeatherDescriptionFromData from "@yourdash/applications/weather/frontend/helpers/generateWeatherDescriptionFromData";
import getWeatherIconFromState from "@yourdash/applications/weather/frontend/helpers/getWeatherIconFromState";
import { IWeatherDataForLocation } from "@yourdash/applications/weather/shared/weatherDataForLocation";
import HourlyConditionsHour from "./components/HourlyConditionsHour";
import styles from "./WeatherHourlyConditionsWidget.module.scss";

const WeatherHourlyConditionsWidget: React.FC = () => {
  const trans = useTranslate("weather");
  const [weatherData, setWeatherData] = useState<IWeatherDataForLocation | null>(null);

  useEffect(() => {
    // fetch the user's defined location but default to London
    csi.getJson(`/app/weather/location/${csi.userDB.get("app:dash:widget:weather:location") || "2643743"}`, (res) => {
      setWeatherData(res);
      console.log(res);
    });
  }, []);

  if (!weatherData) {
    return <Spinner />;
  }

  return (
    <Card className={styles.widget}>
      <section className={styles.header}>
        <div>{generateWeatherDescriptionFromData(trans, weatherData.currentWeather, false)}</div>
      </section>
      <Row className={styles.hours}>
        {weatherData?.hourly.time.map((hour: string, ind: number) => {
          const temperature = weatherData?.hourly.temperature[ind];
          const condition = weatherData?.hourly.weatherState[ind];
          const conditionIcon = getWeatherIconFromState(condition);
          const rainChance = weatherData?.hourly.precipitationProbability[ind];
          const feelsLike = weatherData?.hourly.temperature[ind]; // TODO: request feel like temperatures from the API
          const date = new Date(hour);
          const currentDate = new Date();
          const conditionState = condition;

          if (date.getHours() < currentDate.getHours()) {
            return null;
          }

          // eslint-disable-next-line no-magic-numbers
          const time = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
          }`;

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
        })}
      </Row>
      <a href={"https://open-meteo.com"} className={"mt-auto ml-auto pr-1.5 pt-1 text-[#ffffff55] text-sm"}>
        {"Powered by open-meteo.com"}
      </a>
    </Card>
  );
};

export default WeatherHourlyConditionsWidget;
