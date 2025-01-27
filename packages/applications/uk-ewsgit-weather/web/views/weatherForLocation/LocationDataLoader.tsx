/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Spinner from "@yourdash/chiplet/components/spinner/Spinner";
import React from "react";
import { IWeatherDataForLocation } from "../../../shared/weatherDataForLocation";
import WeatherApplicationLocationPage from "./weatherForLocationView";
import { useParams } from "react-router";
import coreCSI from "@yourdash/csi/coreCSI";

const WeatherApplicationLocationById: React.FC = () => {
  const { id } = useParams();

  const [locationData, setLocationData] = React.useState<null | IWeatherDataForLocation>(null);

  React.useEffect(() => {
    coreCSI.syncGetJson(`/app/weather/location/${id}`, (data) => {
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
