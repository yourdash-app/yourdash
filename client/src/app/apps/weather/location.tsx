import clippy from "helpers/clippy"
import getJson from "helpers/fetch"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { chunk } from "../../../helpers/array"
import { Card, Carousel, Icon, IconButton, MajorButton } from "../../../ui"
import BACKGROUND_IMAGE_CLEAR from "./weatherBackgrounds/clear.avif"
import BACKGROUND_IMAGE_CLOUDY1 from "./weatherBackgrounds/cloudy1.avif"
import BACKGROUND_IMAGE_CLOUDY2 from "./weatherBackgrounds/cloudy2.jpg"
import BACKGROUND_IMAGE_FOG from "./weatherBackgrounds/foggy.jpg"
import BACKGROUND_IMAGE_RAIN1 from "./weatherBackgrounds/rain1.jpg"
import BACKGROUND_IMAGE_RAIN2 from "./weatherBackgrounds/rain2.jpg"
import BACKGROUND_IMAGE_RAIN3 from "./weatherBackgrounds/rain3.jpg"
import BACKGROUND_IMAGE_SNOW1 from "./weatherBackgrounds/snow.jpg"
import BACKGROUND_IMAGE_SNOW2 from "./weatherBackgrounds/snow2.jpg"
import BACKGROUND_IMAGE_THUNDER from "./weatherBackgrounds/thunder.jpg"

/**
 TODO: create svg backgrounds for different weather types,
 rain
 clear
 fog
 thunder
 snow
 
 WMO Weather interpretation codes (WW)
 Code    Description
 0    Clear sky
 1, 2, 3    Mainly clear, partly cloudy, and overcast
 45, 48    Fog and depositing rime fog
 51, 53, 55    Drizzle: Light, moderate, and dense intensity
 56, 57    Freezing Drizzle: Light and dense intensity
 61, 63, 65    Rain: Slight, moderate and heavy intensity
 66, 67    Freezing Rain: Light and heavy intensity
 71, 73, 75    Snow fall: Slight, moderate, and heavy intensity
 77    Snow grains
 80, 81, 82    Rain showers: Slight, moderate, and violent
 85, 86    Snow showers slight and heavy
 95 *    Thunderstorm: Slight or moderate
 96, 99 *    Thunderstorm with slight and heavy hail
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
  BACKGROUND_IMAGE_SNOW1,
  BACKGROUND_IMAGE_RAIN1,
  BACKGROUND_IMAGE_RAIN2,
  BACKGROUND_IMAGE_RAIN3,
  BACKGROUND_IMAGE_THUNDER
]

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
  "Saturday"
]

function getWeatherConditionFromState( state: weatherStates ): string {
  switch ( state ) {
    case weatherStates.clear:
      return "clear skies"
    case weatherStates.heavyRain:
      return "heavy rain"
    case weatherStates.heavySnow:
      return "heavy snow"
    case weatherStates.cloudy:
      return "cloudy"
    case weatherStates.lightSnow:
      return "light snow"
    case weatherStates.fog:
      return "foggy"
    case weatherStates.lightRain:
      return "light rain"
    case weatherStates.rainShowers:
      return "rain showers"
    case weatherStates.heavyRainShowers:
      return "heavy rain showers"
    case weatherStates.lightRainShowers:
      return "light rain showers"
    case weatherStates.partlyCloudy:
      return "partly cloudy"
    case weatherStates.rain:
      return "raining"
    case weatherStates.snow:
      return "snowing"
    case weatherStates.thunder:
      return "thunder"
    default:
      return "unknown"
  }
}

const WeatherApplicationLocationPage: React.FC = () => {
  const [displayedWeatherCondition, setDisplayedWeatherCondition] =
    useState<weatherStates>( weatherStates.clear )
  const { id: locationId } = useParams()
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
  } | null>( null )

  const [selectedDay, setSelectedDay] = useState<number>( 0 )
  const [failedToLoad, setFailedToLoad] = useState<boolean>( false )
  const [transitioningOut, setTransitioningOut] = useState<boolean>( false )

  useEffect( () => {
    if ( !locationId ) {
      window.location.href = "#/app/a/weather"
    }

    getJson(
      `/app/weather/forId/${ locationId }`,
      resp => {
        setData( resp )
        setDisplayedWeatherCondition( resp.currentWeather.condition )
      },
      () => {
        setFailedToLoad( true )
      }
    )
  }, [locationId] )

  if ( !data ) {
    return (
      <>
        { failedToLoad && (
          <main className={ "flex flex-col items-center justify-center h-full w-full gap-2" }>
            <span className={ "text-3xl pl-4 pr-4 text-center" }>Unable to gather data for this location at this moment</span>
            <MajorButton onClick={ () => {
              window.location.href = "#/app/a/weather"
            } }
            >Go back</MajorButton>
          </main>
        ) }
        {/* TODO: add loading indicator and show an error if one occurs */ }
      </>
    )
  }

  return (
    <div
      className={ clippy(
        "overflow-auto animate__animated animate__faster",
        transitioningOut ? "animate__fadeOutRight" : "animate__fadeIn"
      ) }
    >
      <header
        style={ {
          backgroundImage: `url("${ backgroundImages[displayedWeatherCondition] }")`
        } }
        className={ "bg-center bg-cover bg-fixed pb-6 relative overflow-hidden" }
      >
        <div
          className={ "flex pl-8 pt-8 pb-8 flex-row from-base-700 to-transparent bg-gradient-to-b animate__animated" +
                      " animate__fadeInDown" }
        >
          <IconButton
            icon={ "arrow-left-16" }
            className={ "mb-4" }
            onClick={ () => {
              setTransitioningOut( true )

              setTimeout( () => {
                window.location.href = "#/app/a/weather"
              }, 600 )
            } }
          />
          <div className={ "ml-4" }>
            <h1
              className={ "text-container-fg font-bold text-5xl stroke-2 stroke-base-900" }
            >
              { data?.name },
            </h1>
            <span
              className={ "mt-auto text-container-fg text-xl stroke-1 stroke-base-900 animate__animated" +
                          " animate__slideInDown animate__delay-100" }
            >
              { data?.admin1 && `${ data.admin1 }, ` }{ data?.admin2 && `${ data.admin2 }, ` }{ data?.country }
            </span>
          </div>
        </div>
        <section className={ "h-48 flex items-center justify-center" }>
          <span
            /* eslint-disable-next-line max-len */
            className={ "animate__animated animate__fadeInUp text-6xl font-bold text-center" +
                        " [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop" +
                        "-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px" +
                        "_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))]" }
          >
            Currently { data?.currentWeather.temp.toFixed( 0 ) }
            { data?.daily.unit }{ " " }
            { data?.currentWeather.condition !== weatherStates.cloudy &&
              data?.currentWeather.condition !== weatherStates.partlyCloudy &&
              data?.currentWeather.condition !== weatherStates.thunder
              ? "with"
              : "and" }{ " " }
            { getWeatherConditionFromState( data?.currentWeather.condition || 0 ) }
          </span>
        </section>
        <Carousel
          compactControls
          containerClassName={ "min-w-full p-10 pb-4 pt-4 max-w-full overflow-x-auto rounded-xl" +
                               " animate__animated animate__fadeInUp" }
          className={ "flex flex-row gap-2" }
        >
          {/*{chunk( data?.hourly.hours || [], 24 )[0]?.map( ( hour, ind ) => {*/ }
          {/*  if ( ind < new Date().getHours() ) {*/ }
          {/*    return null*/ }
          {/*  }*/ }

          {/*  return (*/ }
          {/*    <Card className={ "flex !flex-col" } key={ hour.date }>*/ }
          {/*      <span className={ "text-4xl font-bold text-center" }>*/ }
          {/*        {hour.temp.toFixed( 0 )}*/ }
          {/*        {data?.daily.unit}*/ }
          {/*      </span>*/ }
          {/*      <span className={ "pt-2 text-2xl text-center" }>*/ }
          {/*        {new Date( hour.date ).getHours() < 10*/ }
          {/*          ? `0${ new Date( hour.date ).getHours()}`*/ }
          {/*          : new Date( hour.date ).getHours()}*/ }
          {/*        :00*/ }
          {/*      </span>*/ }
          {/*      <span className={ "pt-2 text-2xl mt-auto" }>*/ }
          {/*        {getWeatherConditionFromState( hour.condition )}*/ }
          {/*      </span>*/ }
          {/*    </Card>*/ }
          {/*  )*/ }
          {/*} )}*/ }

          <div className={ "w-48 relative" }>
            <Card
              onClick={ () => {
                setSelectedDay( 0 )
              } }
              className={ clippy(
                "w-full h-[10.5rem] flex-col transition-[var(--transition)] absolute",
                selectedDay === 0
                  ? "bottom-[3.5rem]"
                  : "bottom-0"
              ) }
            >
              <section className={ "flex items-center justify-between" }>
                <h2 className={ "font-bold text-6xl flex" }>{ new Date( data.daily.days[0].date ).getDate() }
                  <div className={ "font-normal text-2xl mb-auto" }>th</div>
                </h2>
                <img src={ "/assets/productLogos/yourdash.svg" } draggable={ false } alt={ "" } className={ "w-16" }/>
              </section>
              <section className={ "font-normal text-3xl" }>
                { numericDayName[new Date( data.daily.days[0].date ).getDay()] }
              </section>
              <section className={ "flex justify-between items-center" }>
                <span className={ "flex items-center justify-center" }>
                  <Icon name={ "triangle-down-16" } color={ "rgb(var(--container-fg))" } className={ "h-8" }/>
                  { data.daily.days[0]?.temp.min }°C
                </span>
                <span className={ "flex items-center justify-center" }>
                  <Icon name={ "triangle-up-16" } color={ "rgb(var(--container-fg))" } className={ "h-8" }/>
                  { data.daily.days[0]?.temp.max }°C
                </span>
              </section>
            </Card>
          </div>

          {
            data.daily.days.slice( 1 ).map( ( day, ind ) => {
              return (
                <div
                  className={ "w-48 relative" }
                  key={ day.date }
                >
                  <Card
                    onClick={ () => {
                      setSelectedDay( ind + 1 )
                    } }
                    className={ clippy(
                      "w-full h-[10.5rem] flex-col transition-[var(--transition)] absolute",
                      selectedDay === ind + 1
                        ? "bottom-[3.5rem]"
                        : "bottom-0"
                    ) }
                  >
                    <section className={ "flex items-center justify-between" }>
                      <h2 className={ "font-bold text-6xl flex" }>{ new Date( day.date ).getDate() }
                        <div className={ "font-normal text-2xl mb-auto" }>th</div>
                      </h2>
                      <img
                        src={ "/assets/productLogos/yourdash.svg" }
                        draggable={ false }
                        alt={ "" }
                        className={ "w-16" }
                      />
                    </section>
                    <section className={ "font-normal text-3xl" }>
                      { numericDayName[new Date( day.date ).getDay()] }
                    </section>
                    <section className={ "flex justify-between items-center" }>
                      <span className={ "flex items-center justify-center" }>
                        <Icon name={ "triangle-down-16" } color={ "rgb(var(--container-fg))" } className={ "h-8" }/>
                        { day?.temp.min }°C
                      </span>
                      <span className={ "flex items-center justify-center" }>
                        <Icon name={ "triangle-up-16" } color={ "rgb(var(--container-fg))" } className={ "h-8" }/>
                        { day?.temp.max }°C
                      </span>
                    </section>
                  </Card>
                </div>
              )
            } )
          }
        </Carousel>
        <footer>
          <a
            href="https://open-meteo.com/"
            className={ "absolute bottom-0 right-0 text-xs text-opacity-50 text-white animate__animated animate__fadeIn animate__delay-500ms pr-1 pb-0.5" }
          >
            powered by open-meteo
          </a>
        </footer>
      </header>
      <main className={ "flex flex-col w-full" }>
        {/*<h2 className={ "font-semibold text-2xl pl-4 pt-4" }>*/ }
        {/*  Over the next six days*/ }
        {/*</h2>*/ }
        {/*<section*/ }
        {/*className={"grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 p-4 gap-2"}*/ }
        {/*>*/ }
        {/*  {data?.daily.days.slice( 1 ).map( ( day, ind ) => (*/ }
        {/*    <Card*/ }
        {/*      className={ clippy(*/ }
        {/*        "flex flex-col",*/ }
        {/*        selectedDay === ind &&*/ }
        {/*            "outline-2 outline-container-fg outline",*/ }
        {/*      ) }*/ }
        {/*      key={ day.date }*/ }
        {/*      onClick={ () => {*/ }
        {/*        if ( selectedDay === ind ) {*/ }
        {/*          return setSelectedDay( null )*/ }
        {/*        }*/ }
        {/*        setSelectedDay( ind )*/ }
        {/*      } }*/ }
        {/*    >*/ }
        {/*      <div className={ "flex flex-row justify-between w-full" }>*/ }
        {/*        <span className={ "text-4xl font-bold mr-auto" }>*/ }
        {/*          {( ( day.temp.max + day.temp.min ) / 2 ).toFixed( 0 )}*/ }
        {/*          {data?.daily.unit}*/ }
        {/*        </span>*/ }
        {/*        <div className={ "flex flex-col text-right" }>*/ }
        {/*          <span>*/ }
        {/*            high {day.temp.min.toFixed( 0 )}*/ }
        {/*            {data?.daily.unit}*/ }
        {/*          </span>*/ }
        {/*          <span>*/ }
        {/*            low {day.temp.max.toFixed( 0 )}*/ }
        {/*            {data?.daily.unit}*/ }
        {/*          </span>*/ }
        {/*        </div>*/ }
        {/*      </div>*/ }
        {/*      <span className={ "pt-2 text-2xl mt-auto text-center" }>*/ }
        {/*        {getWeatherConditionFromState( day.condition )}*/ }
        {/*      </span>*/ }
        {/*      <span className={ "pt-2 text-2xl mt-auto" }>*/ }
        {/*        {numericDayName[new Date( day.date ).getDay()]}*/ }
        {/*      </span>*/ }
        {/*    </Card>*/ }
        {/*  ) )}*/ }
        {/*</section>*/ }
        {/*{selectedDay !== null && (*/ }
        {/*  <>*/ }
        {/*    <h2 className={ "font-semibold text-2xl pl-4" }>*/ }
        {/*      {*/ }
        {/*        numericDayName[*/ }
        {/*          new Date( data?.daily.days[selectedDay].date || "" ).getDay()*/ }
        {/*        ]*/ }
        {/*      }{" "}*/ }
        {/*      - Hourly*/ }
        {/*    </h2>*/ }
        {/*    <section*/ }
        {/*      className={ "grid 2xl:grid-cols-[repeat(12,1fr)] xl:grid-cols-9 lg:grid-cols-7" +*/ }
        {/*                  " md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-2 min-w-full p-4" }*/ }
        {/*    >*/ }
        {/*      {chunk( data?.hourly.hours || [], 24 )[selectedDay]?.map(*/ }
        {/*        hour => (*/ }
        {/*          <Card className={ "flex flex-col" } key={ hour.date }>*/ }
        {/*            <span className={ "text-4xl font-bold text-center" }>*/ }
        {/*              {hour.temp.toFixed( 0 )}*/ }
        {/*              {data?.daily.unit}*/ }
        {/*            </span>*/ }
        {/*            <span className={ "pt-2 text-2xl text-center" }>*/ }
        {/*              {new Date( hour.date ).getHours() < 10*/ }
        {/*                ? `0${ new Date( hour.date ).getHours()}`*/ }
        {/*                : new Date( hour.date ).getHours()}*/ }
        {/*              :00*/ }
        {/*            </span>*/ }
        {/*            <span className={ "pt-2 text-2xl mt-auto" }>*/ }
        {/*              {getWeatherConditionFromState( hour.condition )}*/ }
        {/*            </span>*/ }
        {/*          </Card>*/ }
        {/*        ),*/ }
        {/*      )}*/ }
        {/*    </section>*/ }
        {/*  </>*/ }
        {/*)}*/ }
        <Carousel
          compactControls
          containerClassName={ "min-w-full p-10 pb-4 pt-4 max-w-full overflow-x-auto rounded-xl" +
                               " animate__animated animate__fadeIn animate__delay-500ms" }
          className={ "flex flex-row gap-2" }
        >
          {/*{chunk( data?.hourly.hours || [], 24 )[0]?.map( ( hour, ind ) => {*/ }
          {/*  if ( ind < new Date().getHours() ) {*/ }
          {/*    return null*/ }
          {/*  }*/ }

          {/*  return (*/ }
          {/*    <Card className={ "flex !flex-col" } key={ hour.date }>*/ }
          {/*      <span className={ "text-4xl font-bold text-center" }>*/ }
          {/*        {hour.temp.toFixed( 0 )}*/ }
          {/*        {data?.daily.unit}*/ }
          {/*      </span>*/ }
          {/*      <span className={ "pt-2 text-2xl text-center" }>*/ }
          {/*        {new Date( hour.date ).getHours() < 10*/ }
          {/*          ? `0${ new Date( hour.date ).getHours()}`*/ }
          {/*          : new Date( hour.date ).getHours()}*/ }
          {/*        :00*/ }
          {/*      </span>*/ }
          {/*      <span className={ "pt-2 text-2xl mt-auto" }>*/ }
          {/*        {getWeatherConditionFromState( hour.condition )}*/ }
          {/*      </span>*/ }
          {/*    </Card>*/ }
          {/*  )*/ }
          {/*} )}*/ }

          {
            selectedDay !== 0
              ? chunk( data.hourly.hours, 24 )[selectedDay].map( hour => {
                return (
                  <div
                    className={ "w-48 relative h-[7.5rem] mt-auto mb-auto" }
                    key={ hour.date }
                  >
                    <Card
                      className={ clippy(
                        "w-full h-full flex-col transition-[var(--transition)] absolute"
                      ) }
                    >
                      <section className={ "flex items-center justify-between" }>
                        <h2 className={ "font-bold text-3xl flex" }>{ new Date( hour.date ).getHours() < 10
                          ? `0${
                            new Date( hour.date ).getHours() }:00`
                          : `${ new Date( hour.date ).getHours() }:00` }</h2>
                        <img
                          src={ "/assets/productLogos/yourdash.svg" }
                          draggable={ false }
                          alt={ "" }
                          className={ "w-16" }
                        />
                      </section>
                      <section className={ "flex justify-center items-center w-full text-center" }>
                        { hour?.temp }°C
                      </section>
                    </Card>
                  </div>
                )
              } )
              : chunk( data.hourly.hours, 24 )[0].slice( new Date().getHours() ).map( hour => {
                return (
                  <div
                    className={ "w-48 relative h-[7.5rem] mt-auto mb-auto" }
                    key={ hour.date }
                  >
                    <Card
                      className={ clippy(
                        "w-full h-full flex-col transition-[var(--transition)] absolute"
                      ) }
                    >
                      <section className={ "flex items-center justify-between" }>
                        <h2 className={ "font-bold text-3xl flex" }>{ new Date( hour.date ).getHours() < 10
                          ? `0${
                            new Date( hour.date ).getHours() }:00`
                          : `${ new Date( hour.date ).getHours() }:00` }</h2>
                        <img
                          src={ "/assets/productLogos/yourdash.svg" }
                          draggable={ false }
                          alt={ "" }
                          className={ "w-16" }
                        />
                      </section>
                      <section className={ "flex justify-center items-center w-full text-center" }>
                        { hour?.temp }°C
                      </section>
                    </Card>
                  </div>
                )
              } )
          }
        </Carousel>
      </main>
    </div>
  )
}

export default WeatherApplicationLocationPage
