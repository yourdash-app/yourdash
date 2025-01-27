/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/uikit/src/components/card/card";
import TextInput from "@yourdash/uikit/src/components/textInput/textInput";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI";
import APPLICATION_ICON from "../../assets/weatherIcons/partly_cloudy.svg";
import { ILocationSearchResult } from "../../../shared/locationSearchResult";
import THUNDER_BACKGROUND from "../../assets/weatherBackgrounds/thunder.jpg";
import CLOUDY_BACKGROUND from "../../assets/weatherBackgrounds/cloudy1.jpg";
import RAIN_BACKGROUND from "../../assets/weatherBackgrounds/rain1.jpg";
import SNOW_BACKGROUND from "../../assets/weatherBackgrounds/snow.jpg";
import CLEAR_BACKGROUND from "../../assets/weatherBackgrounds/clear.jpg";

const BACKGROUND_IMAGES: string[] = [THUNDER_BACKGROUND, CLOUDY_BACKGROUND, RAIN_BACKGROUND, SNOW_BACKGROUND, CLEAR_BACKGROUND];

const SelectLocationView: React.FC = () => {
  const navigate = useNavigate();
  const trans = useTranslate("uk-ewsgit-weather");
  const [locationQuery, setLocationQuery] = useState<ILocationSearchResult[]>([]);
  const [previousWeatherLocations, setPreviousWeatherLocations] = useState<{ name: string; id: number }[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    coreCSI.syncGetJson("/app/weather/previous/locations", (resp) => {
      setPreviousWeatherLocations(resp || []);
    });

    const backgroundIndex = Math.floor(Math.random() * 5);

    setBackgroundImage(BACKGROUND_IMAGES[backgroundIndex]);
  }, []);

  return (
    <main
      className={"flex h-full w-full items-center justify-center overflow-auto relative flex-col bg-cover bg-center"}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className={"pt-2 pb-2 pl-4 flex items-center absolute top-0 left-0 w-full gap-2"}>
        <img
          src={APPLICATION_ICON}
          alt={""}
          className={"aspect-square h-16"}
        />
        <h2 className={"text-base-50 font-semibold text-4xl drop-shadow-lg"}>{trans("APPLICATION_BRANDING")}</h2>
      </header>
      <Card className={"gap-2 flex flex-col p-4 w-full lg:max-w-4xl md:max-w-2xl max-w-[calc(100vw-1rem)] shadow-2xl"}>
        <div className={"flex gap-2 items-center justify-center w-full"}>
          <TextInput
            accessibleName={"weather location"}
            className={"w-full font-semibold tracking-wide text-3xl h-32"}
            onSubmit={() => {
              if (locationQuery[0]) {
                navigate(`/app/a/uk-ewsgit-weather/${locationQuery[0].id}`);
              }
            }}
            onChange={(value: string) => {
              coreCSI.syncGetJson(`/app/weather/geolocation/${value.replaceAll(" ", "+")}`, (resp) => {
                setLocationQuery(resp || []);
              });
            }}
            placeholder={trans("LOCATION")}
          />
          {/* <IconButton icon={YourDashIcon.Pin} onClick={( e ) => {*/}
          {/*  if ( navigator.geolocation ) {*/}
          {/*    navigator.geolocation.getCurrentPosition(*/}
          {/*      ( position ) => {*/}
          {/*        console.log( position )*/}
          {/*      },*/}
          {/*      () => {*/}
          {/*        alert( "Unable to get your location, please allow location access in your browser settings and try again." );*/}
          {/*      },*/}
          {/*      {*/}
          {/*        enableHighAccuracy: true,*/}
          {/*        timeout: 5000,*/}
          {/*        maximumAge: 0*/}
          {/*      } );*/}
          {/*  } else {*/}
          {/*    e.currentTarget.disabled = true;*/}
          {/*  }*/}
          {/* }}/>*/}
        </div>
        {locationQuery.length !== 0 && (
          <div className={clippy("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full")}>
            {locationQuery.map((item, ind) => (
              <Card
                key={item.id}
                className={clippy(
                  "hover:bg-button-hover-bg active:bg-button-active-bg hover:text-button-hover-fg active:text-button-active-fg transition-[var(--transition)] cursor-pointer w-full",
                  ind === 0 ? "bg-button-hover-bg text-button-hover-fg" : "bg-button-bg text-button-fg",
                )}
                onClick={() => {
                  navigate(`/app/a/uk-ewsgit-weather/${item.id}`);
                }}
              >
                <h2 className={"text-2xl font-semibold tracking-wide"}>
                  {item.address.name}
                  {item.address.country !== item.address.name && ","}
                </h2>
                <span>{item.address.admin1 && `${item.address.admin1}, `}</span>
                <span>{item.address.country !== item.address.name && item.address.country}</span>
              </Card>
            ))}
          </div>
        )}
      </Card>
      {/*   SAVED LOCATIONS (WIP)   */}
      {/*      <Card className={"mt-4 min-w-[16rem] flex flex-col gap-2"}>
        <h2 className={"text-2xl font-semibold tracking-wide text-center"}>Saved locations</h2>
        <div className={"w-full grid grid-cols-2 gap-2"}>
          <Card level={"secondary"}>
            <span>Test location</span>
          </Card>
          <Card level={"secondary"}>
            <span>Test location</span>
          </Card>
          <Card level={"secondary"}>
            <span>Test location</span>
          </Card>
          <Card level={"secondary"}>
            <span>Test location</span>
          </Card>
          <Card level={"secondary"}>
            <span>Test location</span>
          </Card>
        </div>
      </Card>*/}
      <a
        href="https://open-meteo.com/"
        className={"absolute bottom-0 right-0"}
      >
        {trans("POWERED_BY_WATERMARK", ["open-meteo.com"])}
      </a>
    </main>
  );
};

export default SelectLocationView;
