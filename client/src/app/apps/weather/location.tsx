import React, { useEffect, useState } from "react";
import BACKGROUND_IMAGE_CLEAR from "./weatherBackgrounds/clear.avif";
import BACKGROUND_IMAGE_CLOUDY1 from "./weatherBackgrounds/cloudy1.avif";
import BACKGROUND_IMAGE_CLOUDY2 from "./weatherBackgrounds/cloudy2.avif";
import BACKGROUND_IMAGE_FOG from "./weatherBackgrounds/foggy.avif";
import BACKGROUND_IMAGE_RAIN1 from "./weatherBackgrounds/rain1.avif";
import BACKGROUND_IMAGE_RAIN2 from "./weatherBackgrounds/rain2.avif";
import BACKGROUND_IMAGE_RAIN3 from "./weatherBackgrounds/rain3.avif";
import BACKGROUND_IMAGE_SNOW1 from "./weatherBackgrounds/snow.avif";
import BACKGROUND_IMAGE_SNOW2 from "./weatherBackgrounds/snow2.avif";
import BACKGROUND_IMAGE_THUNDER from "./weatherBackgrounds/thunder.avif";
import getJson from "helpers/fetch";
import { useParams } from "react-router-dom";
import { Card, Carousel, IconButton, MajorButton } from "../../../ui/index";
import { chunk } from "../../../helpers/array";
import clippy from "helpers/clippy";

/*
 TODO: create svg backgrounds for different weather types,
 rain
 clear
 fog
 thunder
 snow
 
 WMO Weather interpretation codes (WW)
 Code	Description
 0	Clear sky
 1, 2, 3	Mainly clear, partly cloudy, and overcast
 45, 48	Fog and depositing rime fog
 51, 53, 55	Drizzle: Light, moderate, and dense intensity
 56, 57	Freezing Drizzle: Light and dense intensity
 61, 63, 65	Rain: Slight, moderate and heavy intensity
 66, 67	Freezing Rain: Light and heavy intensity
 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
 77	Snow grains
 80, 81, 82	Rain showers: Slight, moderate, and violent
 85, 86	Snow showers slight and heavy
 95 *	Thunderstorm: Slight or moderate
 96, 99 *	Thunderstorm with slight and heavy hail
 (*) Thunderstorm forecast with hail is only available in Central Europe
 */

const backgroundImages: any[] = [
  BACKGROUND_IMAGE_CLEAR,
  BACKGROUND_IMAGE_CLOUDY1,
  BACKGROUND_IMAGE_CLOUDY2,
  BACKGROUND_IMAGE_FOG,
  BACKGROUND_IMAGE_RAIN1,
  BACKGROUND_IMAGE_RAIN2,
  BACKGROUND_IMAGE_RAIN3,
  BACKGROUND_IMAGE_SNOW1,
  BACKGROUND_IMAGE_SNOW2,
  BACKGROUND_IMAGE_RAIN1,
  BACKGROUND_IMAGE_RAIN2,
  BACKGROUND_IMAGE_RAIN3,
  BACKGROUND_IMAGE_THUNDER,
];

enum weatherStates {
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

const numericDayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getWeatherConditionFromState(state: weatherStates): string {
  switch (state) {
    case weatherStates.clear:
      return "clear skies";
    case weatherStates.heavyRain:
      return "heavy rain";
    case weatherStates.heavySnow:
      return "heavy snow";
    case weatherStates.cloudy:
      return "cloudy";
    case weatherStates.lightSnow:
      return "light snow";
    case weatherStates.fog:
      return "foggy";
    case weatherStates.lightRain:
      return "light rain";
    case weatherStates.rainShowers:
      return "rain showers";
    case weatherStates.heavyRainShowers:
      return "heavy rain showers";
    case weatherStates.lightRainShowers:
      return "light rain showers";
    case weatherStates.partlyCloudy:
      return "partly cloudy";
    case weatherStates.rain:
      return "raining";
    case weatherStates.snow:
      return "snowing";
    case weatherStates.thunder:
      return "thunder";
  }
}

const WeatherApplicationLocationPage: React.FC = () => {
  const [displayedWeatherCondition, setDisplatedWeatherCondition] =
    useState<weatherStates>(weatherStates.clear);
  const { id: locationId } = useParams();
  const [data, setData] = useState<{
    name: string;
    admin1: string;
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
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [failedToLoad, setFailedToLoad] = useState<boolean>(false);

  useEffect(() => {
    if (!locationId) window.location.href = "#/app/a/weather";

    getJson(
      `/app/weather/forId/${locationId}`,
      (resp) => {
        setData(resp);
        setDisplatedWeatherCondition(resp.currentWeather.condition);
        console.log(resp);
      },
      () => {
        setFailedToLoad(true);
      }
    );
  }, [locationId]);

  if (!data)
    return (
      <>
        {failedToLoad && (
          <main>
            <span>Unable to gather data for this location at this moment</span>
            <MajorButton>Go back</MajorButton>
          </main>
        )}
        {/* TODO: add loading indicator and show an error if one occurs */}
      </>
    );

  return (
    <div className={`relative overflow-auto`}>
      <header
        style={{
          backgroundImage: `url("${backgroundImages[displayedWeatherCondition]}")`,
        }}
        className={`bg-center bg-cover bg-fixed`}
      >
        <div
          className={`flex pl-8 pt-8 pb-8 flex-row from-base-700 to-transparent bg-gradient-to-b`}
        >
          <IconButton
            icon={`arrow-left-16`}
            className={`mb-4`}
            onClick={() => {
              window.location.href = "#/app/a/weather";
            }}
          />
          <div className={`ml-4`}>
            <h1
              className={`text-container-fg font-bold text-5xl stroke-2 stroke-base-900`}
            >
              {data?.name},
            </h1>
            <span
              className={`mt-auto text-container-fg text-xl stroke-1 stroke-base-900`}
            >
              {data?.admin1}, {data?.country}
            </span>
          </div>
        </div>
        <section className={`h-48 flex items-center justify-center`}>
          <span
            className={`text-6xl font-bold text-center [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))]`}
          >
            Currently {data?.currentWeather.temp.toFixed(0)}
            {data?.daily.unit}{" "}
            {data?.currentWeather.condition !== weatherStates.cloudy &&
            data?.currentWeather.condition !== weatherStates.partlyCloudy &&
            data?.currentWeather.condition !== weatherStates.thunder
              ? "with"
              : "and"}{" "}
            {getWeatherConditionFromState(data?.currentWeather.condition || 0)}
          </span>
        </section>
        <Carousel
          className={`flex flex-row gap-2 min-w-full p-4 max-w-full overflow-x-auto`}
        >
          {chunk(data?.hourly.hours || [], 24)[0]?.map((hour, ind) => {
            if (ind < new Date().getHours())
              return <React.Fragment key={hour.date}></React.Fragment>;

            return (
              <Card className={`flex flex-col`} key={hour.date}>
                <span className={`text-4xl font-bold text-center`}>
                  {hour.temp.toFixed(0)}
                  {data?.daily.unit}
                </span>
                <span className={`pt-2 text-2xl text-center`}>
                  {new Date(hour.date).getHours() < 10
                    ? "0" + new Date(hour.date).getHours()
                    : new Date(hour.date).getHours()}
                  :00
                </span>
                <span className={`pt-2 text-2xl mt-auto`}>
                  {getWeatherConditionFromState(hour.condition)}
                </span>
              </Card>
            );
          })}
        </Carousel>
      </header>
      <main className={`flex flex-col w-full`}>
        <h2 className={`font-semibold text-2xl pl-4 pt-4`}>
          Over the next six days
        </h2>
        <section
          className={`grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 p-4 gap-2`}
        >
          {data?.daily.days.slice(1).map((day, ind) => {
            return (
              <Card
                className={clippy(
                  `flex flex-col`,
                  selectedDay === ind &&
                    "outline-2 outline-container-fg outline"
                )}
                key={day.date}
                onClick={() => {
                  if (selectedDay === ind) return setSelectedDay(null);
                  setSelectedDay(ind);
                }}
              >
                <div className={`flex flex-row justify-between w-full`}>
                  <span className={`text-4xl font-bold mr-auto`}>
                    {((day.temp.max + day.temp.min) / 2).toFixed(0)}
                    {data?.daily.unit}
                  </span>
                  <div className={`flex flex-col text-right`}>
                    <span>
                      high {day.temp.min.toFixed(0)}
                      {data?.daily.unit}
                    </span>
                    <span>
                      low {day.temp.max.toFixed(0)}
                      {data?.daily.unit}
                    </span>
                  </div>
                </div>
                <span className={`pt-2 text-2xl mt-auto text-center`}>
                  {getWeatherConditionFromState(day.condition)}
                </span>
                <span className={`pt-2 text-2xl mt-auto`}>
                  {numericDayName[new Date(day.date).getDay()]}
                </span>
              </Card>
            );
          })}
        </section>
        {selectedDay !== null && (
          <>
            <h2 className={`font-semibold text-2xl pl-4`}>
              {
                numericDayName[
                  new Date(data?.daily.days[selectedDay].date || "").getDay()
                ]
              }{" "}
              - Hourly
            </h2>
            <section
              className={`grid 2xl:grid-cols-[repeat(12,1fr)] xl:grid-cols-9 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-2 min-w-full p-4`}
            >
              {chunk(data?.hourly.hours || [], 24)[selectedDay]?.map(
                (hour, ind) => {
                  return (
                    <Card className={`flex flex-col`} key={hour.date}>
                      <span className={`text-4xl font-bold text-center`}>
                        {hour.temp.toFixed(0)}
                        {data?.daily.unit}
                      </span>
                      <span className={`pt-2 text-2xl text-center`}>
                        {new Date(hour.date).getHours() < 10
                          ? "0" + new Date(hour.date).getHours()
                          : new Date(hour.date).getHours()}
                        :00
                      </span>
                      <span className={`pt-2 text-2xl mt-auto`}>
                        {getWeatherConditionFromState(hour.condition)}
                      </span>
                    </Card>
                  );
                }
              )}
            </section>
          </>
        )}
      </main>
      <footer>
        <a
          href="https://open-meteo.com/"
          className={`fixed bottom-0 right-0 text-xs`}
        >
          powered by open-meteo
        </a>
      </footer>
    </div>
  );
};

export default WeatherApplicationLocationPage;
