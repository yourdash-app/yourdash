/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import React from "react";
import DROPLET_ICON from "@yourdash/applications/weather/web/assets/weatherIcons/droplet.svg";

export interface IHourlyConditionsHour {
  time: string;
  conditionIcon: string;
  temperature: number;
  feelsLike: number;
  rainChance: number;
  conditionState: number;
}

const HourlyConditionsHour: React.FC<IHourlyConditionsHour> = ({
  time,
  conditionIcon,
  conditionState,
  temperature,
  feelsLike,
  rainChance,
}) => {
  const trans = useTranslate("uk-ewsgit-weather");
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <>
      {/* {showTooltip && ( */}
      {/*   <div> */}
      {/*     <Card showBorder> */}
      {/*       <span>{`Temp: ${temperature}°C`}</span> */}
      {/*       <div>{trans(getWeatherConditionFromState(conditionState))}</div> */}
      {/*       <div className={"flex items-center justify-center"}> */}
      {/*         <img className={"h-full"} src={DROPLET_ICON} alt={""} /> */}
      {/*         <span>{`Rain chance: ${rainChance}%`}</span> */}
      {/*       </div> */}
      {/*       <span>{`Feels like: ${feelsLike}°C`}</span> */}
      {/*     </Card> */}
      {/*   </div> */}
      {/* )} */}
      <div className={"h-max mt-auto mb-auto flex flex-col items-center justify-center"}>
        <Card
          className={"flex flex-col items-center justify-center"}
          onClick={() => {
            // TODO: implement logic on click of a "weather hour"
            console.log("IMPLEMENT ME!!!");
          }}
        >
          <span>{time}</span>
          <img
            alt={""}
            className={"aspect-square h-16"}
            src={conditionIcon}
          />
          <span>{`${temperature}°C`}</span>
          <div className={"flex items-center justify-center"}>
            <img
              className={"h-full"}
              src={DROPLET_ICON}
              alt={""}
            />
            <span>{`${rainChance}%`}</span>
          </div>
          <span>{`${feelsLike}°C`}</span>
        </Card>
      </div>
    </>
  );
};

export default HourlyConditionsHour;
