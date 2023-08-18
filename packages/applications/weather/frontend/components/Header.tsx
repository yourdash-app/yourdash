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

interface WeatherApplicationLocationPageHeaderProps {
  weatherData: IWeatherDataForLocation;
}

const WeatherApplicationLocationPageHeader: React.FC<WeatherApplicationLocationPageHeaderProps> = ( {
  weatherData
} ) => {
  const trans = useTranslate( "weather" );
  const stickyRef = React.useRef<HTMLDivElement>( null );
  const [isStuck, setIsStuck] = React.useState<boolean>( false );
  
  React.useEffect( () => {
    
    if ( !stickyRef.current ) return
    
    const parentElement = stickyRef.current.parentElement as HTMLDivElement
    
    function listener(): void {
      if ( parentElement.scrollTop > 0 ) {
        setIsStuck( true );
      } else {
        setIsStuck( false );
      }
    }
    
    parentElement.addEventListener( "scroll", listener )

    return () => {
      parentElement.removeEventListener( "scroll", listener )
    }
  }, [] )
  
  React.useEffect( () => {
    if ( !stickyRef.current ) return
    
    const element = stickyRef.current as HTMLDivElement
    const parentElement = stickyRef.current.parentElement as HTMLDivElement
    
    if ( isStuck ) {
      parentElement.scrollTo( { behavior: "instant", top: element.getBoundingClientRect().height } )
      parentElement.style.paddingBottom = element.getBoundingClientRect().height + "px"
    } else {
      parentElement.scrollTo( { behavior: "instant", top: 0 } )
      parentElement.style.paddingBottom = "0px"
    }
  }, [isStuck] )
  
  return <header
    style={ { backgroundImage: `url(${ getWeatherBackgroundForCondition(
      weatherData.currentWeather.weatherState
    ) }` } }
    className={ "bg-cover bg-center sticky top-0" }
    ref={stickyRef}
  >
    <section className={ "p-4 flex gap-2 h-32 items-center justify-between from-base-700 to-transparent bg-gradient-to-b child:flex child:items-center" }>
      <section className={ "flex gap-2" }>
        <IconButton icon={ YourDashIcon.ChevronLeft16 } />
        <div className={ "flex flex-col" }>
          <h1 className={ "tracking-wide font-bold text-5xl m-0" }>{ weatherData.location.name },</h1>
          <div className={ "flex gap-2 text-xl" }>
            <span>{ weatherData.location.admin1 },</span>
            <span>{ weatherData.location.country }</span>
          </div>
        </div>
      </section>
      <section>
        <IconButton icon={ YourDashIcon.Bookmark16 } />
      </section>
    </section>
    <section className={ clippy( styles.currentWeatherHeader, isStuck && styles.stuck ) }>
      <span>Currently { weatherData.currentWeather.temperature }{ weatherData.units.hourly.temperature } with { trans( getWeatherConditionFromState( weatherData.currentWeather.weatherState ) ) }</span>
    </section>
    <WeatherApplicationDaysCarousel weatherData={ weatherData } />
  </header>;
};

export default WeatherApplicationLocationPageHeader;