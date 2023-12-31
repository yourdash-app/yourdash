/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useFloating, offset, shift, autoUpdate, useHover, useFocus, useDismiss, useRole, useInteractions, autoPlacement } from "@floating-ui/react";
import DROPLET_ICON from "applications/weather/frontend/assets/weatherIcons/droplet.svg";
import { Card } from "web-client/src/ui/index";
import getWeatherConditionFromState from "applications/weather/frontend/helpers/getWeatherConditionFromState";
import useTranslate from "helpers/i18n";

export interface IHourlyConditionsHour {
  time: string,
  conditionIcon: string,
  temperature: number,
  feelsLike: number,
  rainChance: number,
  conditionState: number
}

const HourlyConditionsHour: React.FC<IHourlyConditionsHour> = ( {
  time,
  conditionIcon,
  conditionState,
  temperature,
  feelsLike,
  rainChance
} ) => {
  const trans = useTranslate( "weather" );
  const [ showTooltip, setShowTooltip ] = React.useState( false );
  const { refs, floatingStyles, context } = useFloating( {
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [
      // eslint-disable-next-line no-magic-numbers
      offset( 8 ),
      shift(),
      autoPlacement( {
        autoAlignment: true,
        padding: 8,
        altBoundary: true
      } )
    ],
    whileElementsMounted: autoUpdate
  } );

  const { getReferenceProps, getFloatingProps } = useInteractions( [
    useHover( context, { move: false } ),
    useFocus( context ),
    useDismiss( context ),
    useRole( context, { role: "tooltip" } )
  ] );

  return (
    <>
      {
        showTooltip && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <Card showBorder>
              <span>{`Temp: ${temperature}°C`}</span>
              <div>{trans( getWeatherConditionFromState( conditionState ) )}</div>
              <div className={"flex items-center justify-center"}>
                <img className={"h-full"} src={DROPLET_ICON} alt={""} />
                <span>{`Rain chance: ${rainChance}%`}</span>
              </div>
              <span>{`Feels like: ${feelsLike}°C`}</span>
            </Card>
          </div>
        )
      }
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={"h-max mt-auto mb-auto flex flex-col items-center justify-center"}
      >
        <Card
          className={"flex flex-col items-center justify-center"}
          onClick={() => {
            // TODO: implement logic on click of a "weather hour"
            console.log( "IMPLEMENT ME!!!" );
          }}
        >
          <span>{time}</span>
          <img alt={""} className={"aspect-square h-16"} src={conditionIcon} />
          <span>{`${temperature}°C`}</span>
          <div className={"flex items-center justify-center"}>
            <img className={"h-full"} src={DROPLET_ICON} alt={""} />
            <span>{`${rainChance}%`}</span>
          </div>
          <span>{`${feelsLike}°C`}</span>
        </Card>
      </div>
    </>
  );
};

export default HourlyConditionsHour;
