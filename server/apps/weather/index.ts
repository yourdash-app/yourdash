/** @format */

import { Application as ExpressApplication } from "express";
import { fetch } from "undici";
import fs, { mkdirSync } from "fs";
import path from "path";
import YourDashUser from "~/core/user.js";
import weatherForecast from "../../../shared/apps/weather/forecast.js";

/*
 WMO Weather interpretation codes (WW)
 Code	Description
 0	Clear sky
 1, 2, 3	Mainly clear, partly cloudy, and overcast
 45, 48	Fog and depositing rime fog
 51, 53, 55	Drizzle: Light, moderate, and dense intensity
 56, 57	Freezing Drizzle: Light and dense intensity
 61, 63, 65	Rain: Slight, moderate and heavy intensity
 66, 67	Freezing Rain: Light and heavy intensity
 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
 77	Snow grains
 80, 81, 82	Rain showers: Slight, moderate, and violent
 85, 86	Snow showers slight and heavy
 95 *	Thunderstorm: Slight or moderate
 96, 99 *	Thunderstorm with slight and heavy hail
 (*) Thunderstorm forecast with hail is only available in Central Europe
*/

function parseWeatherCodes(code: number): weatherStates {
  switch (code) {
    case 0:
    case 1:
      return weatherStates.clear;
    case 2:
      return weatherStates.partlyCloudy;
    case 3:
      return weatherStates.cloudy;
    case 45:
    case 48:
      return weatherStates.fog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 66:
      return weatherStates.lightRain;
    case 63:
      return weatherStates.rain;
    case 64:
    case 67:
    case 65:
      return weatherStates.heavyRain;
    case 71:
      return weatherStates.lightSnow;
    case 75:
      return weatherStates.heavySnow;
    case 73:
    case 77:
    case 85:
    case 86:
      return weatherStates.snow;
    case 80:
      return weatherStates.lightRainShowers;
    case 81:
      return weatherStates.rainShowers;
    case 82:
      return weatherStates.heavyRainShowers;
    case 95:
    case 96:
    case 99:
      return weatherStates.thunder;
  }

  return 0;
}

let weatherForecastCache: { [key: string]: { cacheTime: Date; data: any } } = {};

export default function main(app: ExpressApplication) {
  app.get(`/app/weather/location/:locationName`, (req, res) => {
    if (req.params.locationName.indexOf(" ") !== -1) return res.json({ error: true });

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${req.params.locationName}&language=en&count=5&format=json`,
    )
      .then((resp) => resp.json())
      .then((json) => {
        return res.json(json);
      })
      .catch(() => {
        console.log(`Failed to fetch weather data from open-meteo`);
        return res.json({ error: true });
      });
  });

  app.get(`/app/weather/previous/locations`, (req, res) => {
    const { username } = req.headers as { username: string };

    const user = new YourDashUser(username);

    try {
      if (!fs.existsSync(path.resolve(user.getAppDataPath(), `weather`))) res.json([]);

      let rawFile = fs.readFileSync(path.resolve(user.getAppDataPath(), `weather/previous_locations.json`)).toString();

      return res.json(JSON.parse(rawFile));
    } catch (err) {
      return res.json([]);
    }
  });

  app.get(`/app/weather/location/`, (req, res) => {
    return res.json([]);
  });

  app.get(`/app/weather/forId/:id`, (req, res) => {
    if (!req.params.id) return res.json({ error: true });
    const { username } = req.headers as { username: string };

    const user = new YourDashUser(username);

    if (weatherForecastCache[req.params.id]) {
      let cache = weatherForecastCache[req.params.id];
      if (cache.cacheTime.getUTCMilliseconds() > new Date().getUTCMilliseconds() - 6000) {
        let file = "[]";

        if (!fs.existsSync(path.resolve(user.getAppDataPath(), `weather`)))
          mkdirSync(path.resolve(user.getAppDataPath(), `weather`));

        if (fs.existsSync(path.resolve(user.getAppDataPath(), `weather/previous_locations.json`))) {
          file = fs.readFileSync(path.resolve(user.getAppDataPath(), `weather/previous_locations.json`)).toString();
        }

        let parsedFile = JSON.parse(file);

        if (parsedFile.length > 5) parsedFile.shift();

        if (parsedFile.indexOf({ name: cache.data.name, id: req.params.id }) === -1) {
          parsedFile.push({ name: cache.data.name, id: req.params.id });
        }

        fs.writeFileSync(
          path.resolve(user.getAppDataPath(), `weather/previous_locations.json`),
          JSON.stringify(parsedFile),
        );

        return res.json(cache.data);
      } else {
        delete weatherForecastCache[req.params.id];
      }
    }

    fetch(`https://geocoding-api.open-meteo.com/v1/get?id=${req.params.id}&language=en&format=json`)
      .then((resp) => resp.json())
      .then((json: any) => {
        if (json?.error) return res.json({ error: true });

        let out: any = {
          name: json.name,
          admin1: json.admin1,
          country: json.country,
        };

        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${json.latitude}&longitude=${json.longitude}&hourly=temperature_2m,weathercode&models=best_match&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=${json.timezone}`,
        )
          .then((resp) => resp.json())
          .then((json: any) => {
            if (json?.error) return res.json({ error: true });

            out.weather = json;

            weatherForecastCache[req.params.id] = {
              data: {
                name: out.name,
                admin1: out.admin1,
                country: out.country,
                currentWeather: {
                  temp: json.current_weather.temperature,
                  condition: parseWeatherCodes(json.current_weather.weathercode),
                  time: json.current_weather.time,
                  wind: {
                    direction: json.current_weather.winddirection,
                    speed: json.current_weather.windspeed,
                  },
                },
                daily: {
                  unit: json.daily_units.temperature_2m_max,
                  days: json.daily.time.map((_, ind) => {
                    return {
                      date: json.daily.time[ind],
                      temp: {
                        min: json.daily.temperature_2m_min[ind],
                        max: json.daily.temperature_2m_max[ind],
                      },
                      condition: parseWeatherCodes(json.daily.weathercode[ind]),
                    };
                  }),
                },
                hourly: {
                  unit: json.hourly_units.temperature_2m,
                  hours: json.hourly.time.map((_, ind) => {
                    return {
                      condition: parseWeatherCodes(json.hourly.weathercode[ind]),
                      date: json.hourly.time[ind],
                      temp: json.hourly.temperature_2m[ind],
                    };
                  }),
                },
              },
              cacheTime: new Date(),
            };

            let file = "[]";

            if (!fs.existsSync(path.resolve(user.getAppDataPath(), `weather`)))
              mkdirSync(path.resolve(user.getAppDataPath(), `weather`));

            if (fs.existsSync(path.resolve(user.getAppDataPath(), `weather/previous_locations.json`))) {
              file = fs.readFileSync(path.resolve(user.getAppDataPath(), `weather/previous_locations.json`)).toString();
            }

            let parsedFile = JSON.parse(file);

            if (parsedFile.length > 5) parsedFile.shift();

            if (parsedFile.indexOf({ name: out.name, id: req.params.id }) === -1) {
              parsedFile.push({ name: out.name, id: req.params.id });
            }

            fs.writeFileSync(
              path.resolve(user.getAppDataPath(), `weather/previous_locations.json`),
              JSON.stringify(parsedFile),
            );

            return res.json(<weatherForecast>{
              name: out.name,
              admin1: out.admin1,
              country: out.country,
              currentWeather: {
                temp: json.current_weather.temperature,
                condition: parseWeatherCodes(json.current_weather.weathercode),
                time: json.current_weather.time,
                wind: {
                  direction: json.current_weather.winddirection,
                  speed: json.current_weather.windspeed,
                },
              },
              daily: {
                unit: json.daily_units.temperature_2m_max,
                days: json.daily.time.map((_, ind) => {
                  return {
                    date: json.daily.time[ind],
                    temp: {
                      min: json.daily.temperature_2m_min[ind],
                      max: json.daily.temperature_2m_max[ind],
                    },
                    condition: parseWeatherCodes(json.daily.weathercode[ind]),
                  };
                }),
              },
              hourly: {
                unit: json.hourly_units.temperature_2m,
                hours: json.hourly.time.map((_, ind) => {
                  return {
                    condition: parseWeatherCodes(json.hourly.weathercode[ind]),
                    date: json.hourly.time[ind],
                    temp: json.hourly.temperature_2m[ind],
                  };
                }),
              },
            });
          })
          .catch((err) => {
            console.log(`Failed to fetch weather data from open-meteo`, err);
            return res.json({ error: true });
          });
      })
      .catch((err) => {
        console.log(`Failed to fetch weather data from open-meteo`, err);
        return res.json({ error: true });
      });
  });
}
