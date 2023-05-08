import React, { useEffect, useState } from "react"
import csi from "../../../helpers/csi"
import { Button, Card, TextInput } from "../../../ui"

const WeatherApplication: React.FC = () => {
  const [locationQuery, setLocationQuery] = useState<any[]>( [] )
  const [
    previousWeatherLocations,
    setPreviousWeatherLocations
  ] = useState<{ name: string; id: number }[]>( [] )

  useEffect( () => {
    csi.getJson( "/app/weather/previous/locations", resp => {
      setPreviousWeatherLocations( resp || [] )
    } )
  }, [] )

  return (
    <main className={ "flex h-full w-full items-center justify-center overflow-auto relative flex-col" }>
      <h2 className={ "pt-4 pb-4 pl-4 text-base-50 font-semibold text-3xl bg-container-bg absolute top-0 left-0" +
                      " w-full" }
      >
        Weather
      </h2>
      <Card className={ "gap-2 flex flex-col mb-4" }>
        <span>Previous locations</span>
        { previousWeatherLocations.length !== 0
          ? (
            previousWeatherLocations.map( loc => (
              <Button
                key={ loc.id }
                onClick={ () => {
                  window.location.href = `#/app/a/weather/location/${ loc.id }`
                } }
              >
                { loc.name }
              </Button>
            ) )
          )
          : (
            <span>You have no previous locations</span>
          ) }
      </Card>
      <Card className={ "gap-2 flex flex-col" }>
        <TextInput
          onChange={ ( value: string ) => {
            csi.getJson( `/app/weather/location/${ value.replaceAll( " ", "+" ) }`, resp => {
              setLocationQuery( resp?.results || [] )
            } )
          } }
          label={ "Location" }
        />
        { locationQuery.map( item => (
          <Button
            key={ item.id }
            className={ "bg-button-bg hover:bg-button-hover-bg active:bg-button-active-bg text-button-fg " +
                        "hover:text-button-hover-fg active:text-button-active-fg pl-2 pr-2 pt-1 pb-1 " +
                        "transition-[var(--transition)] cursor-pointer" }
            onClick={ () => {
              window.location.href = `#/app/a/weather/location/${ item.id }`
            } }
          >
            { item.name }, { item.admin1 && `${item.admin1}, ` }{ item.admin2 && `${item.admin2}, ` }{ item.country }
          </Button>
        ) ) }
      </Card>
      <a href="https://open-meteo.com/" className={ "absolute bottom-0 right-0" }>
        Powered by open-meteo.com
      </a>
    </main>
  )
}

export default WeatherApplication
