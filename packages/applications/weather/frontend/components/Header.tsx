/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from "react";
import { IWeatherDataForLocation } from "../../shared/weatherDataForLocation";
import { IconButton } from "web-client/src/ui/index";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import getWeatherConditionFromState from "../helpers/getWeatherConditionFromState";
import useTranslate from "web-client/src/helpers/l10n";
import getWeatherBackgroundForCondition from "../helpers/getWeatherBackgroundForCondition";
import WeatherApplicationDaysCarousel from "./DaysCarousel";
import styles from "./Header.module.scss";
import clippy from "web-client/src/helpers/clippy";
import { WEATHER_STATES } from "../../shared/weatherStates";
import { useNavigate } from "react-router"

interface WeatherApplicationLocationPageHeaderProps {
  weatherData: IWeatherDataForLocation;
  scrollContainerRef: React.RefObject<HTMLDivElement>,
  setSelectedDay: ( day: number ) => void,
  selectedDay: number
}

const WeatherApplicationLocationPageHeader: React.FC<WeatherApplicationLocationPageHeaderProps> = ( {
  weatherData,
  scrollContainerRef,
  setSelectedDay,
  selectedDay
} ) => {
  const trans = useTranslate( "weather" );
  const navigate = useNavigate()
  const [isStuck, setIsStuck] = React.useState<boolean>( false );
  
  React.useEffect( () => {
    if ( !scrollContainerRef.current ) return
    
    const element = scrollContainerRef.current as HTMLDivElement
    
    const lastScrollTop = 0
    
    function listener(): void {
      if ( element.scrollTop > lastScrollTop ) {
        setIsStuck( true )
      } else {
        if ( element.scrollTop === 0 ) {
          setIsStuck( false )
        }
      }
    }
    
    element.addEventListener( "scroll", listener )

    return () => {
      element.removeEventListener( "scroll", listener )
    }
  }, [] )
  
  return <header
    style={ {
      backgroundImage: `url(${ getWeatherBackgroundForCondition(
        weatherData.currentWeather.weatherState
      ) }`
    } }
    className={ "bg-cover bg-center sticky top-0 left-0 w-full" }
  >
    <section className={ "p-4 flex gap-2 h-28 items-center justify-between from-base-700 to-transparent bg-gradient-to-b child:flex child:items-center" }>
      <section className={ "flex gap-2" }>
        <IconButton
          icon={ YourDashIcon.ChevronLeft16 }
          onClick={() => {
            navigate( "/app/a/weather" )
          }}
        />
        <div className={ "flex flex-col" }>
          <h1 className={ "tracking-wide font-bold text-5xl m-0" }>{ weatherData.location.name },</h1>
          <div className={ "flex gap-2 text-xl" }>
            <span>{ weatherData.location.admin1 },</span>
            <span>{ weatherData.location.country }</span>
          </div>
        </div>
      </section>
      <section className={"gap-2 flex"}>
        <IconButton icon={ YourDashIcon.Bookmark16 } />
        <IconButton
          icon={ isStuck ? YourDashIcon.ChevronDown16 : YourDashIcon.ChevronUp16 }
          onClick={() => {
            setIsStuck( !isStuck )
          }}
        />
      </section>
    </section>
    <section className={ clippy( styles.currentWeatherHeader, isStuck && styles.stuck ) }>
      <span>Currently { weatherData.currentWeather.temperature }{ weatherData.units.hourly.temperature } {weatherData.currentWeather.weatherState !== WEATHER_STATES.PARTLY_CLOUDY ? "with" : "and"} { trans( getWeatherConditionFromState( weatherData.currentWeather.weatherState ) ) }</span>
    </section>
    <WeatherApplicationDaysCarousel
      setSelectedDay={ ( day: number ) => {
        setSelectedDay( day )
        setIsStuck( true )
      }}
      selectedDay={selectedDay}
      weatherData={ weatherData }
    />
  </header>;
};

export default WeatherApplicationLocationPageHeader;