import clippy from "helpers/clippy";
import csi from "helpers/csi";
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import {chunk} from "../../../helpers/array";
import {Card, Carousel, Icon, IconButton, MajorButton, Spinner} from "../../../ui";

import useTranslate from "../../../helpers/l10n";

import BACKGROUND_IMAGE_CLEAR from "./weatherBackgrounds/clear.avif";
import BACKGROUND_IMAGE_CLOUDY1 from "./weatherBackgrounds/cloudy1.avif";
import BACKGROUND_IMAGE_CLOUDY2 from "./weatherBackgrounds/cloudy2.jpg";
import BACKGROUND_IMAGE_FOG from "./weatherBackgrounds/foggy.jpg";
import BACKGROUND_IMAGE_RAIN1 from "./weatherBackgrounds/rain1.jpg";
import BACKGROUND_IMAGE_RAIN2 from "./weatherBackgrounds/rain2.jpg";
import BACKGROUND_IMAGE_RAIN3 from "./weatherBackgrounds/rain3.jpg";
import BACKGROUND_IMAGE_SNOW1 from "./weatherBackgrounds/snow.jpg";
import BACKGROUND_IMAGE_SNOW2 from "./weatherBackgrounds/snow2.jpg";
import BACKGROUND_IMAGE_THUNDER from "./weatherBackgrounds/thunder.jpg";
import WEATHER_ICON_CLEAR from "./weatherIcons/clear.svg";
import WEATHER_ICON_HEAVY_RAIN from "./weatherIcons/heavy_rain.svg";
import WEATHER_ICON_LIGHT_RAIN from "./weatherIcons/light_rain.svg";
import WEATHER_ICON_SNOW from "./weatherIcons/snow.svg";
import WEATHER_ICON_CLOUDY from "./weatherIcons/cloudy.svg";
import WEATHER_ICON_PARTLY_CLOUDY from "./weatherIcons/partly_cloudy.svg";

/**
 * WMO Weather interpretation codes ( WW )
 *
 *  Code        Description
 *  0           Clear sky
 *  1, 2, 3     Mainly clear, partly cloudy, and overcast
 *  45, 48      Fog and depositing rime fog
 *  51, 53, 55  Drizzle: Light, moderate, and dense intensity
 *  56, 57      Freezing Drizzle: Light and dense intensity
 *  61, 63, 65  Rain: Slight, moderate and heavy intensity
 *  66, 67      Freezing Rain: Light and heavy intensity
 *  71, 73, 75  Snow fall: Slight, moderate, and heavy intensity
 *  77          Snow grains
 *  80, 81, 82  Rain showers: Slight, moderate, and violent
 *  85, 86      Snow showers slight and heavy
 *  95          Thunderstorm: Slight or moderate (*)
 *  96, 99      Thunderstorm with slight and heavy hail (*)
 *
 * (*) Thunderstorm forecast with hail is only available in Central Europe
 *
 */

export const backgroundImages: any[] = [
  BACKGROUND_IMAGE_CLEAR,
  BACKGROUND_IMAGE_CLOUDY1,
  BACKGROUND_IMAGE_CLOUDY2,
  BACKGROUND_IMAGE_FOG,
  BACKGROUND_IMAGE_RAIN1,
  BACKGROUND_IMAGE_RAIN2,
  BACKGROUND_IMAGE_RAIN3,
  BACKGROUND_IMAGE_SNOW1,
  BACKGROUND_IMAGE_SNOW2,
  BACKGROUND_IMAGE_SNOW1,
  BACKGROUND_IMAGE_RAIN1,
  BACKGROUND_IMAGE_RAIN2,
  BACKGROUND_IMAGE_RAIN3,
  BACKGROUND_IMAGE_THUNDER
];

export enum weatherStates {
  clear,
  partlyCloudy,
  cloudy,
  fog,
  lightRain,
  rain,
  heavyRain,
  lightSnow,
  snow,
  heavySnow,
  lightRainShowers,
  rainShowers,
  heavyRainShowers,
  thunder,
}

export const numericDayName = [
  "DAY_SUNDAY",
  "DAY_MONDAY",
  "DAY_TUESDAY",
  "DAY_WEDNESDAY",
  "DAY_THURSDAY",
  "DAY_FRIDAY",
  "DAY_SATURDAY"
];

// returns the weather description for the given weather state
export function getWeatherConditionFromState(state: weatherStates): string {
  switch (state) {
    case weatherStates.clear:
      return "CONDITION_CLEAR_SKIES";
    case weatherStates.heavyRain:
      return "CONDITION_HEAVY_RAIN";
    case weatherStates.heavySnow:
      return "CONDITION_HEAVY_SNOW";
    case weatherStates.cloudy:
      return "CONDITION_CLOUDY";
    case weatherStates.lightSnow:
      return "CONDITION_LIGHT_SNOW";
    case weatherStates.fog:
      return "CONDITION_FOGGY";
    case weatherStates.lightRain:
      return "CONDITION_LIGHT_RAIN";
    case weatherStates.rainShowers:
      return "CONDITION_RAIN_SHOWER";
    case weatherStates.heavyRainShowers:
      return "CONDITION_HEAVY_RAIN_SHOWER";
    case weatherStates.lightRainShowers:
      return "CONDITION_LIGHT_RAIN_SHOWER";
    case weatherStates.partlyCloudy:
      return "CONDITION_PARTLY_CLOUDY";
    case weatherStates.rain:
      return "CONDITION_RAIN";
    case weatherStates.snow:
      return "CONDITION_SNOW";
    case weatherStates.thunder:
      return "CONDITION_THUNDER";
    default:
      return "unknown";
  }
}

// returns the corresponding icon for the given weather state
export function getWeatherIconFromState(state: weatherStates): string {
  switch (state) {
    case weatherStates.clear:
      return WEATHER_ICON_CLEAR;
    case weatherStates.heavyRain:
      return WEATHER_ICON_HEAVY_RAIN;
    case weatherStates.heavySnow:
      return WEATHER_ICON_SNOW;
    case weatherStates.cloudy:
      return WEATHER_ICON_CLOUDY;
    case weatherStates.lightSnow:
      return WEATHER_ICON_SNOW;
    case weatherStates.fog:
      return WEATHER_ICON_CLOUDY;
    case weatherStates.lightRain:
      return WEATHER_ICON_LIGHT_RAIN;
    case weatherStates.rainShowers:
      return WEATHER_ICON_LIGHT_RAIN;
    case weatherStates.heavyRainShowers:
      return WEATHER_ICON_HEAVY_RAIN;
    case weatherStates.lightRainShowers:
      return WEATHER_ICON_LIGHT_RAIN;
    case weatherStates.partlyCloudy:
      return WEATHER_ICON_PARTLY_CLOUDY;
    case weatherStates.rain:
      return WEATHER_ICON_LIGHT_RAIN;
    case weatherStates.snow:
      return WEATHER_ICON_SNOW;
    case weatherStates.thunder:
      return WEATHER_ICON_HEAVY_RAIN;
    default:
      return "/assets/productLogos/yourdash.svg";
  }
}

const WeatherApplicationLocationPage: React.FC = () => {
  const [displayedWeatherCondition, setDisplayedWeatherCondition] = useState<weatherStates>(weatherStates.clear);
  const {id: locationId} = useParams();
  const trans = useTranslate("weather");
  const [data, setData] = useState<{
    name: string;
    admin1: string;
    admin2: string;
    country: string;
    currentWeather: {
      temp: number;
      condition: weatherStates;
      wind: {
        direction: number;
        speed: number;
      };
      time: string;
    };
    daily: {
      unit: "°C" | "°F";
      days: {
        temp: {
          min: number;
          max: number;
        };
        date: string;
        condition: weatherStates;
      }[];
    };
    hourly: {
      unit: "°C" | "°F";
      hours: {
        temp: number;
        date: string;
        condition: weatherStates;
      }[];
    };
  } | null>(null);

  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [failedToLoad, setFailedToLoad] = useState<boolean>(false);
  const [transitioningOut, setTransitioningOut] = useState<boolean>(false);

  useEffect(() => {
    if (!locationId) {
      navigate("/app/a/weather");
    }

    csi.getJson(
      `/app/weather/forId/${ locationId }`,
      resp => {
        setData(resp);
        setDisplayedWeatherCondition(resp.currentWeather.condition);
      },
      () => {
        setFailedToLoad(true);
      }
    );
  }, [locationId]);

  if (!data) {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {failedToLoad
          ? (
            <main className={"flex flex-col items-center justify-center h-full w-full gap-2"}>
              <span className={"text-3xl pl-4 pr-4 text-center"}>
                {trans("PROBLEM_FETCHING_DATA")}
              </span>
              <MajorButton onClick={() => {
                navigate("/app/a/weather");
              }}
              >
                {"Go back"}
              </MajorButton>
            </main>
          )
          : (
            <div className={"w-full min-h-full flex items-center justify-center"}>
              <Spinner/>
            </div>
          )
        }
      </>
    );
  }

  return (
    <div
      className={clippy(
        "overflow-auto animate__animated animate__faster",
        transitioningOut ? "animate__fadeOutRight" : "animate__fadeIn"
      )}
    >
      <header
        style={{
          backgroundImage: `url("${ backgroundImages[displayedWeatherCondition] }")`
        }}
        className={"bg-center bg-cover bg-fixed pb-6 relative overflow-hidden"}
      >
        <div
          className={"flex pl-8 pt-8 pb-8 flex-row from-base-700 to-transparent bg-gradient-to-b animate__animated " +
                      "animate__fadeInDown"}
        >
          <IconButton
            icon={"arrow-left-16"}
            className={"mb-4"}
            onClick={() => {
              setTransitioningOut(true);

              // The duration for the exit animation in ms
              const TRANSITION_DURATION = 600;

              setTimeout(() => {
                navigate("/app/a/weather");
              }, TRANSITION_DURATION);
            }}
          />
          <div className={"ml-4"}>
            <h1
              className={"text-container-fg font-bold text-5xl stroke-2 stroke-base-900"}
            >
              {`${ data?.name },`}
            </h1>
            <span
              className={"mt-auto text-container-fg text-xl stroke-1 stroke-base-900 animate__animated animate__slideInDown"}
            >
              {data?.admin1 && `${ data.admin1 }, `}{data?.admin2 && `${ data.admin2 }, `}{data?.country}
            </span>
          </div>
        </div>
        <section className={"h-48 flex items-center justify-center"}>
          <span
            /* eslint-disable-next-line max-len */
            className={"animate__animated animate__fadeInUp text-6xl font-bold text-center [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))] leading-tight"}
          >
            {`${ trans("CURRENTLY") } ${ data?.currentWeather.temp.toFixed(0) }${ data?.daily.unit } `}
            {
              data?.currentWeather.condition !== weatherStates.cloudy &&
              data?.currentWeather.condition !== weatherStates.partlyCloudy &&
              data?.currentWeather.condition !== weatherStates.thunder
                ? `${ trans("WITH") } `
                : `${ trans("AND") } `
            }
            {
              trans(getWeatherConditionFromState(data?.currentWeather.condition || 0))
            }
          </span>
        </section>
        <Carousel
          compactControls
          containerClassName={"min-w-full h-64 p-10 pb-4 pt-4 max-w-full overflow-x-auto rounded-xl animate__animated animate__fadeInUp animate__duration_100ms"}
          className={"flex flex-row gap-2"}
        >
          {
            data.daily.days.map((day, ind) => (
              <div
                className={"w-48 relative"}
                key={day.date}
              >
                <Card
                  onClick={() => {
                    setSelectedDay(ind);
                  }}
                  className={clippy(
                    "w-full h-[10.5rem] flex-col transition-[var(--transition)] absolute",
                    selectedDay === ind
                      ? "bottom-[3.5rem]"
                      : "bottom-0"
                  )}
                >
                  <section className={"flex items-center justify-between"}>
                    <h2 className={"font-bold text-6xl flex"}>{new Date(day.date).getDate()}
                      {/* eslint-disable-next-line no-magic-numbers */}
                      <div className={"font-normal text-2xl mb-auto"}>{new Date(day.date).getDate() === 1 ? "st" : new Date(day.date).getDate() === 2 ? "nd" : new Date(day.date).getDate() === 3 ? "rd" : "th"}</div>
                    </h2>
                    <img
                      src={getWeatherIconFromState(day.condition)}
                      draggable={false}
                      alt={""}
                      className={"w-16 pl-2"}
                    />
                  </section>
                  <section className={"font-normal text-3xl"}>
                    {trans(numericDayName[new Date(day.date).getDay()])}
                  </section>
                  <section className={"flex justify-between items-center"}>
                    <span className={"flex items-center justify-center"}>
                      <Icon name={"triangle-down-16"} color={"rgb(var(--container-fg))"} className={"h-8"}/>
                      {day?.temp.min}{"°C"}
                    </span>
                    <span className={"flex items-center justify-center"}>
                      <Icon name={"triangle-up-16"} color={"rgb(var(--container-fg))"} className={"h-8"}/>
                      {day?.temp.max}{"°C"}
                    </span>
                  </section>
                </Card>
              </div>
            ))
          }
        </Carousel>
        <footer>
          <a
            href="https://open-meteo.com/"
            className={"absolute bottom-0 right-0 text-xs text-opacity-50 text-white animate__animated animate__fadeIn animate__500ms pr-1 pb-0.5"}
          >
            {trans("POWERED_BY_WATERMARK", ["open-meteo.com"])}
          </a>
        </footer>
      </header>
      <main className={"flex flex-col w-full"}>
        <Carousel
          compactControls
          containerClassName={"min-w-full p-10 pb-4 pt-4 max-w-full overflow-x-auto rounded-xl animate__animated animate__fadeIn animate__500ms h-80"}
          className={"flex flex-row gap-2"}
        >
          {
            // eslint-disable-next-line no-magic-numbers
            chunk(data.hourly.hours, 24)[selectedDay].map(hour => (
              <div
                className={"relative h-full flex justify-center"}
                key={hour.date}
              >
                <Card
                  style={{
                    marginBottom: `${ (
                      (hour?.temp - data.daily.days[selectedDay]?.temp.min) / (data.daily.days[selectedDay]?.temp.max - data.daily.days[selectedDay]?.temp.min)) * 8.25 }rem` // eslint-disable-line no-magic-numbers
                  }}
                  className={clippy(
                    "w-full flex flex-col items-center justify-center h-[9.75rem] mt-auto"
                  )}
                >
                  <h2 className={"font-bold text-3xl flex"}>{
                    /* eslint-disable-next-line no-magic-numbers */
                    new Date(hour.date).getHours() < 10
                      ? `0${ new Date(hour.date).getHours() }:00`
                      : `${ new Date(hour.date).getHours() }:00`}
                  </h2>
                  <img
                    src={getWeatherIconFromState(hour.condition)}
                    draggable={false}
                    alt={""}
                    className={"w-16"}
                  />
                  <section className={"flex justify-center items-center w-full text-center"}>
                    {`${ hour?.temp }°C` || "ERROR"}
                  </section>
                </Card>
              </div>
            ))
          }
        </Carousel>
      </main>
    </div>
  );
};

export default WeatherApplicationLocationPage;
