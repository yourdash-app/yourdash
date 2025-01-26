/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/chiplet/components/card/Card";
import Carousel from "@yourdash/chiplet/components/carousel/Carousel";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import React from "react";
import getDayNameForNumericDay from "../helpers/getDayNameForNumericDay";
import getWeatherIconFromState from "../helpers/getWeatherIconFromState";

const WeatherApplicationDaysCarousel: React.FC<{
  weatherData: IWeatherDataForLocation;
  setSelectedDay: (day: number) => void;
  selectedDay: number;
}> = ({ weatherData, setSelectedDay, selectedDay }) => {
  const trans = useTranslate("uk-ewsgit-weather");

  return (
    <Carousel
      className={"sticky top-[5.75rem] flex gap-1 p-2 pl-10 pr-10 w-full pt-0"}
      compactControls
    >
      {weatherData.daily.time.map((dayDateTime, index) => {
        const date = new Date(dayDateTime);

        return (
          <Card
            onClick={() => {
              setSelectedDay(index);
            }}
            key={dayDateTime}
            className={clippy(selectedDay === index ? "mb-4" : "mt-4")}
          >
            <div className={"flex gap-1 items-center"}>
              <h2 className={"flex gap-1 font-semibold text-3xl"}>
                {trans(getDayNameForNumericDay(date.getDay()))}
                <span
                  className={`${
                    date.getDate() === 1
                      ? "after:content-['st']"
                      : date.getDate() === 2
                        ? "after:content-['nd']"
                        : date.getDate() === 3
                          ? "after:content-['rd']"
                          : "after:content-['th']"
                  } after:font-light after:text-sm after:justify-self-start flex`}
                >
                  {date.getDate()}
                </span>
              </h2>
              <img
                className={"w-20 -mr-2 -mt-4"}
                alt={""}
                src={getWeatherIconFromState(weatherData.daily.weatherState[index])}
              />
            </div>
            <div className={"-mt-2"}>
              <div className={"font-black text-3xl flex gap-1 items-center"}>
                <Icon
                  icon={UKIcons.ChevronUp}
                  className={"h-4"}
                  color={"#43aa8b"}
                />
                <span>{weatherData.daily.temperature.max[index]}</span>
                <span className={"text-[#43aa8b]"}>{weatherData.units.daily.temperature.max}</span>
              </div>
              <div className={"text-xl flex gap-1 items-center"}>
                <Icon
                  icon={UKIcons.ChevronDown}
                  className={"h-4"}
                  color={"#f94144"}
                />
                <span>{weatherData.daily.temperature.min[index]}</span>
                <span className={"text-[#f94144]"}>{weatherData.units.daily.temperature.min}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </Carousel>
  );
};

export default WeatherApplicationDaysCarousel;
