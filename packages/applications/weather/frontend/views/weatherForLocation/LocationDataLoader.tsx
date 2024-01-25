/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IWeatherDataForLocation } from "../../../shared/weatherDataForLocation";
import WeatherApplicationLocationPage from "./weatherForLocationView";
import { useParams } from "react-router";
import csi from "web-client/src/helpers/csi";
import { Spinner } from "web-client/src/ui/index";

const WeatherApplicationLocationById: React.FC = () => {
  const { id } = useParams();

  const [locationData, setLocationData] = React.useState<null | IWeatherDataForLocation>(null);

  React.useEffect(() => {
    csi.getJson(`/app/weather/location/${id}`, (data) => {
      setLocationData(data);
    });
  }, [id]);

  if (locationData !== null) {
    return <WeatherApplicationLocationPage weatherData={locationData} />;
  }

  return (
    <div className={"w-full min-h-full flex items-center justify-center"}>
      <Spinner />
    </div>
  );
};

export default WeatherApplicationLocationById;
