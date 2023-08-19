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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "web-client/src/helpers/l10n";
import { IWeatherDataForLocation } from "../shared/weatherDataForLocation";
import WeatherApplicationLocationPageHeader from "./components/Header";
import { Column, Button } from "web-client/src/ui/index";

const WeatherApplicationLocationPage: React.FC<{ weatherData: IWeatherDataForLocation }> = ( { weatherData } ) => {
  const trans = useTranslate( "weather" );
  const navigate = useNavigate();
  const scrollContainerRef = React.useRef<HTMLDivElement>( null )

  const [selectedDay, setSelectedDay] = useState<number>( 0 );
  const [failedToLoad, setFailedToLoad] = useState<boolean>( false );
  const [transitioningOut, setTransitioningOut] = useState<boolean>( false );
  
  return (
    <div className={"overflow-hidden h-full grid grid-rows-[auto,1fr]"}>
      <WeatherApplicationLocationPageHeader scrollContainerRef={scrollContainerRef} weatherData={weatherData}/>
      <div ref={scrollContainerRef} className={"h-full overflow-auto"}>
        <Column>
          {weatherData.hourly.time.map( ( hourDate, ind ) => {
            const date = new Date( hourDate )
            
            return <Button>
              {date.getHours()}
            </Button>
          } )}
        </Column>
      </div>
    </div>
  );
};

export default WeatherApplicationLocationPage;
