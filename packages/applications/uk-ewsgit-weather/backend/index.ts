/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// // WORK IN PROGRESS APPLICATION
// // https://open-meteo.com/en/docs#***REMOVED***&hourly=temperature_2m,precipitation_probability,weathercode,cloudcover,windspeed_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max&current_weather=true&windspeed_unit=mph&timezone=Europe%2FLondon

// import geolocationApi from "./geolocationApi.js";
// import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
// import core from "@yourdash/backend/src/core/core.js";

// export const weatherForecastCache: { [key: string]: { cacheTime: number; data: unknown } } = {};

// export default class WeatherModule extends YourDashBackendModule {
//   constructor(args: YourDashModuleArguments) {
//     super(args);
//   }

//   public loadEndpoints() {
//     super.loadEndpoints();

//     geolocationApi(core.rawExpressJs);

//     core.request.setNamespace(`app/${this.api.moduleId}`);

//     // TODO: remake the weather application

//     // core.request.get("/location/:id", async (req, res) => {
//     //   const { id } = req.params;
//     //
//     //   if (weatherForecastCache[id]) {
//     //     const currentTime = Math.floor(new Date().getTime() / 1_000);
//     //
//     //     if (currentTime > weatherForecastCache[id].cacheTime + 1_800_000 /* 30 minutes */) {
//     //       this.api.core.log.info("app/weather", `Responding with cached weather data for location '${id}'`);
//     //       return res.json({
//     //         ...(weatherForecastCache[id].data as object),
//     //         collectedAt: weatherForecastCache[id].cacheTime,
//     //       });
//     //     }
//     //
//     //     delete weatherForecastCache[id];
//     //   }
//     //
//     //   return res.json(await getWeatherDataForLocationId(id));
//     // });
//     //
//     // core.request.get("/previous/locations", async (req, res) => {
//     //   return res.json([]);
//     // });
//     //
//     // weatherPredictionEngine(core.request.rawExpress);
//   }
// }

import { YourDashApplication } from "@yourdash/backend/resrc/applications.js";

export default class Application extends YourDashApplication {
  constructor() {
    super({
      version: {
        major: 1,
        minor: 0,
      },
      configVersion: 1,
      credits: {
        authors: [{ name: "Ewsgit", site: "https://ewsgit.uk" }],
      },
      frontend: {
        entryPoint: "../web/index.tsx",
      },
      displayName: "Weather",
      description: "The YourDash weather application.",
      id: "uk-ewsgit-weather",
    });
  }

  public onLoad(): this {
    return super.onLoad();
  }
}
