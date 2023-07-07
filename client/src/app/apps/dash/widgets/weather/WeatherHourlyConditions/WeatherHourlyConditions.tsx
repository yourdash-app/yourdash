import React, {useEffect, useState} from "react";
import useTranslate from "../../../../../../helpers/l10n";
import {Card} from "../../../../../../ui";
import csi from "../../../../../../helpers/csi";
import {getWeatherIconFromState} from "../../../../weather/location";
import DROPLET_ICON from "../../../../weather/weatherIcons/droplet.svg";
import HourlyConditionsHour from "./HourlyConditionsHour";

const WeatherHourlyConditions: React.FC = () => {
  const trans = useTranslate("dash");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    csi.getJson("/app/weather/hourly/London", res => {
      setWeatherData(res.data);
      setLocationData(res.location);
      console.log(res);
    });
  }, []);

  if (!weatherData || !locationData) {
    return null;
  }

  return (
    <Card className={"flex flex-col col-span-2"}>
      <span>
        {"Hourly weather conditions"} {locationData?.name}, {locationData?.admin1}, {locationData?.country}
      </span>
      <main className={"flex h-full"}>
        {
          weatherData?.hourly.time.map((hour: string, ind: number) => {
            const temperature = weatherData?.hourly.temperature_2m[ind];
            const condition = weatherData?.hourly.weathercode[ind];
            const conditionIcon = getWeatherIconFromState(condition);
            const rainChance = weatherData?.hourly.precipitation_probability[ind];
            const feelsLike = weatherData?.hourly.apparent_temperature[ind];
            const date = new Date(hour);
            const currentDate = new Date();

            if (date.getHours() < currentDate.getHours()) {
              return null;
            }

            const time = `${ date.getHours() < 10 ? `0${ date.getHours() }` : date.getHours() }:${ date.getMinutes() < 10 ? `0${ date.getMinutes() }` : date.getMinutes() }`;

            return (
              <HourlyConditionsHour conditionIcon={conditionIcon} time={time} feelsLike={feelsLike} rainChance={rainChance} temperature={temperature} key={hour}/>
            );
          })
        }
      </main>
      <span className={"mt-auto"}>
        {"Powered by open-meteo.com"}
      </span>
    </Card>
  );
};

export default WeatherHourlyConditions;
