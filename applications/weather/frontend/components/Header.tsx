/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import useTranslate from "@yourdash/shared/web/helpers/i18n";
import Heading from "@yourdash/uikit/depChiplet/components/heading/Heading";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import React from "react";
import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import generateWeatherDescriptionFromData from "../helpers/generateWeatherDescriptionFromData";
import getWeatherBackgroundForCondition from "../helpers/getWeatherBackgroundForCondition";
import WeatherApplicationDaysCarousel from "./DaysCarousel";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router";

interface WeatherApplicationLocationPageHeaderProps {
  weatherData: IWeatherDataForLocation;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  setSelectedDay: (day: number) => void;
  selectedDay: number;
}

const WeatherApplicationLocationPageHeader: React.FC<WeatherApplicationLocationPageHeaderProps> = ({
  weatherData,
  scrollContainerRef,
  setSelectedDay,
  selectedDay,
}) => {
  const navigate = useNavigate();
  const trans = useTranslate("weather");
  const [isStuck, setIsStuck] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!scrollContainerRef.current) return;

    const element = scrollContainerRef.current as HTMLDivElement;

    const lastScrollTop = 0;

    function listener(): void {
      if (element.scrollTop > lastScrollTop) {
        setIsStuck(true);
      } else {
        if (element.scrollTop === 0) {
          setIsStuck(false);
        }
      }
    }

    element.addEventListener("scroll", listener);

    return () => {
      element.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <header
      style={{
        backgroundImage: `url(${getWeatherBackgroundForCondition(weatherData.currentWeather.weatherState)}`,
      }}
      className={"bg-cover bg-center sticky top-0 left-0 w-full"}
    >
      <section
        className={
          "p-4 flex gap-2 h-28 items-center justify-between from-base-700 to-transparent bg-gradient-to-b child:flex child:items-center"
        }
      >
        <section className={"flex gap-2"}>
          <IconButton
            icon={YourDashIcon.ChevronLeft}
            onClick={() => {
              navigate("/app/a/weather");
            }}
          />
          <div className={"flex flex-col"}>
            <h1 className={"tracking-wide font-bold text-5xl m-0"}>{weatherData.location.name},</h1>
            <div className={"flex gap-2 text-xl"}>
              <span>{weatherData.location.admin1},</span>
              <span>{weatherData.location.country}</span>
            </div>
          </div>
        </section>
        <section className={"gap-2 flex"}>
          <IconButton icon={YourDashIcon.Bookmark} />
          <IconButton
            icon={isStuck ? YourDashIcon.ChevronDown : YourDashIcon.ChevronUp}
            onClick={() => {
              setIsStuck(!isStuck);
            }}
          />
        </section>
      </section>
      <section className={clippy(styles.currentWeatherHeader, isStuck && styles.stuck)}>
        <Heading>{generateWeatherDescriptionFromData(trans, weatherData.currentWeather, false)}</Heading>
      </section>
      <WeatherApplicationDaysCarousel
        setSelectedDay={(day: number) => {
          setSelectedDay(day);
          setIsStuck(true);
        }}
        selectedDay={selectedDay}
        weatherData={weatherData}
      />
    </header>
  );
};

export default WeatherApplicationLocationPageHeader;
