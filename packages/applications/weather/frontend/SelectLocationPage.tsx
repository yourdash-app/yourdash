import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import csi from "web-client/src/helpers/csi";
import { Card, TextInput, IconButton } from "web-client/src/ui";
import useTranslate from "web-client/src/helpers/l10n";
import APPLICATION_ICON from "./assets/weatherIcons/partly_cloudy.svg"
import clippy from "web-client/src/helpers/clippy";
import { ILocationAutocompleteSuggestion } from "../shared/locationAutocompleteSuggestion";
import BACKGROUND_IMAGE from "./assets/weatherBackgrounds/thunder.jpg"
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SelectLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const trans = useTranslate( "weather" );
  const [locationQuery, setLocationQuery] = useState<ILocationAutocompleteSuggestion[]>( [] );
  const [ previousWeatherLocations, setPreviousWeatherLocations] = useState<{ name: string; id: number }[]>( [] );

  useEffect( () => {
    csi.getJson( "/app/weather/previous/locations", resp => {
      setPreviousWeatherLocations( resp || [] );
    } );
  }, [] );

  return (
    <main className={"flex h-full w-full items-center justify-center overflow-auto relative flex-col background-cover background-center"} style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}>
      <header className={"pt-2 pb-2 pl-4 flex items-center absolute top-0 left-0 w-full gap-2"}>
        <img src={APPLICATION_ICON} alt={""} className={"aspect-square h-16"}/>
        <h2 className={"text-base-50 font-semibold text-4xl"}>
          {trans( "APPLICATION_BRANDING" )}
        </h2>
      </header>
      <Card className={"gap-2 flex flex-col p-4 w-full lg:max-w-4xl md:max-w-2xl max-w-[calc(100vw-1rem)]"}>
        <div className={"flex gap-2 items-center justify-center w-full"}>
          <TextInput
            className={"w-full font-semibold tracking-wide text-3xl"}
            autoComplete={"false"}
            onKeyDown={e => {
              if ( e.key === "Enter" ) {
                if ( locationQuery[0] ) {
                  navigate( `/app/a/weather/${ locationQuery[0].id }` );
                }
              }
            }}
            onChange={( value: string ) => {
              csi.getJson( `/app/weather/geolocation/${ value.replaceAll( " ", "+" ) }`, resp => {
                setLocationQuery( resp || [] );
              } );
            }}
            label={trans( "LOCATION" )}
          />
          {/*<IconButton icon={YourDashIcon.Pin16} onClick={( e ) => {*/}
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
          {/*}}/>*/}
        </div>
        {
          locationQuery.length !== 0 && <div className={clippy(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full"
          )}>
            {locationQuery.map( ( item, ind ) => (
              <Card
                key={item.id}
                className={clippy( "hover:bg-button-hover-bg active:bg-button-active-bg hover:text-button-hover-fg active:text-button-active-fg transition-[var(--transition)] cursor-pointer w-full",
                  ind === 0 ? "bg-button-hover-bg text-button-hover-fg" : "bg-button-bg text-button-fg" ) }
                onClick={() => {
                  navigate( `/app/a/weather/${ item.id }` );
                }}
              >
                <h2 className={"text-2xl font-semibold tracking-wide"}>{item.address.name}{item.address.country !== item.address.name && ","}</h2>
                <span>{item.address.admin1 && `${ item.address.admin1 }, `}</span>
                <span>{item.address.country !== item.address.name && item.address.country}</span>
              </Card>
            ) )}
          </div>
        }
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
      <a href="https://open-meteo.com/" className={"absolute bottom-0 right-0"}>
        {trans( "POWERED_BY_WATERMARK", ["open-meteo.com"] )}
      </a>
    </main>
  );
};

export default SelectLocationPage;
