/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import Row from "@yourdash/chiplet/components/row/Row";
import Spinner from "@yourdash/chiplet/components/spinner/Spinner";
import React, { useEffect, useState } from "react";
import coreCSI from "@yourdash/csi/coreCSI";
import generateWeatherDescriptionFromData from "@yourdash/applications/weather/web/helpers/generateWeatherDescriptionFromData";
import getWeatherIconFromState from "@yourdash/applications/weather/web/helpers/getWeatherIconFromState";
import { IWeatherDataForLocation } from "@yourdash/applications/weather/shared/weatherDataForLocation";
import HourlyConditionsHour from "./components/HourlyConditionsHour";
import styles from "./WeatherHourlyConditionsWidget.module.scss";

const WeatherHourlyConditionsWidget: React.FC = () => {
  const trans = useTranslate("uk-ewsgit-weather");
  const [weatherData, setWeatherData] = useState<IWeatherDataForLocation | null>(null);

  useEffect(() => {
    // fetch the user's defined location but default to London
    coreCSI.syncGetJson(`/app/weather/location/${coreCSI.userDB.get("app/dash:widget:weather:location") || "2643743"}`, (res) => {
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
      <a
        href={"https://open-meteo.com"}
        className={"mt-auto ml-auto pr-1.5 pt-1 text-[#ffffff55] text-sm"}
      >
        {"Powered by open-meteo.com"}
      </a>
    </Card>
  );
};

export default WeatherHourlyConditionsWidget;
