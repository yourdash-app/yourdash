import { promises as fs } from "fs";
import path from "path";
import { fetch } from "undici";
import { weatherStates } from "../../../../shared/apps/weather/weatherStates.js";
import YourDashUser from "../../helpers/user.js";
import log, { logTypes } from "../../helpers/log.js";
const OPEN_METEO_INSTANCE = "open-meteo.com";
function parseWeatherCodes(code) {
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
        case 61:
        case 66:
            return weatherStates.lightRain;
        case 63:
        case 57:
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
        default:
            return 0;
    }
}
const weatherForecastCache = {};
const main = ({ app }) => {
    app.get("/app/weather/location/:locationName", (req, res) => {
        if (!req.params.locationName) {
            return res.json({ error: true });
        }
        fetch(`https://geocoding-api.${OPEN_METEO_INSTANCE}/v1/search?name=${req.params.locationName}&language=en&count=5&format=json`).then(resp => resp.json()).then(json => res.json(json)).catch(() => {
            log(logTypes.error, "Failed to fetch weather data from open-meteo");
            return res.json({ error: true });
        });
    });
    app.get("/app/weather/previous/locations", async (req, res) => {
        const { username } = req.headers;
        const user = new YourDashUser(username);
        try {
            await fs.access(path.resolve(user.getAppDataPath(), "weather"));
            const rawFile = (await fs.readFile(path.resolve(user.getAppDataPath(), "weather/previous_locations.json"))).toString() || "[]";
            const parsedFile = JSON.parse(rawFile) || [];
            return res.json(parsedFile);
        }
        catch (_err) {
            return res.json([]);
        }
    });
    app.get("/app/weather/location/", (_req, res) => res.json([]));
    app.get("/app/weather/forId/:id", async (req, res) => {
        if (!req.params.id) {
            return res.json({ error: true });
        }
        const { username } = req.headers;
        const user = new YourDashUser(username);
        if (weatherForecastCache[req.params.id]) {
            const cache = weatherForecastCache[req.params.id];
            if (cache.cacheTime.getUTCMilliseconds() > new Date().getUTCMilliseconds() - 6000) {
                let file = "[]";
                await fs.access(path.resolve(user.getAppDataPath(), "weather")).catch(async () => {
                    await fs.mkdir(path.resolve(user.getAppDataPath(), "weather"));
                });
                try {
                    await fs.access(path.resolve(user.getAppDataPath(), "weather"));
                    file = (await fs.readFile(path.resolve(user.getAppDataPath(), "weather/previous_locations.json"))).toString() || "[]";
                }
                catch (_err) {
                    file = "[]";
                }
                const parsedFile = JSON.parse(file);
                if (parsedFile.length > 5) {
                    parsedFile.shift();
                }
                if (parsedFile.find(obj => obj.id === req.params.id) === undefined) {
                    parsedFile.push({
                        name: cache.data.name,
                        id: req.params.id
                    });
                }
                await fs.writeFile(path.resolve(user.getAppDataPath(), "weather/previous_locations.json"), JSON.stringify(parsedFile || []));
                return res.json(cache.data);
            }
            else {
                delete weatherForecastCache[req.params.id];
            }
        }
        fetch(`https://geocoding-api.${OPEN_METEO_INSTANCE}/v1/get?id=${req.params.id}&language=en&format=json`).then(resp => resp.json()).then((json) => {
            if (json?.error) {
                return res.json({ error: true });
            }
            const out = {
                name: json.name,
                admin1: json.admin1,
                country: json.country
            };
            fetch(`https://api.${OPEN_METEO_INSTANCE}/v1/forecast?latitude=${json.latitude}&longitude=${json.longitude}&hourly=temperature_2m,weathercode&models=best_match&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=${json.timezone}`).then(resp => resp.json()).then(async (json) => {
                if (json?.error) {
                    return res.json({ error: true });
                }
                out.weather = json;
                weatherForecastCache[req.params.id] = {
                    data: {
                        name: out.name,
                        admin1: out.admin1,
                        admin2: out.admin2,
                        country: out.country,
                        currentWeather: {
                            temp: json.current_weather.temperature,
                            condition: parseWeatherCodes(json.current_weather.weathercode),
                            time: json.current_weather.time,
                            wind: {
                                direction: json.current_weather.winddirection,
                                speed: json.current_weather.windspeed
                            }
                        },
                        daily: {
                            unit: json.daily_units.temperature_2m_max,
                            days: json.daily.time.map((_, ind) => ({
                                date: json.daily.time[ind],
                                temp: {
                                    min: json.daily.temperature_2m_min[ind],
                                    max: json.daily.temperature_2m_max[ind]
                                },
                                condition: parseWeatherCodes(json.daily.weathercode[ind])
                            }))
                        },
                        hourly: {
                            unit: json.hourly_units.temperature_2m,
                            hours: json.hourly.time.map((_, ind) => ({
                                condition: parseWeatherCodes(json.hourly.weathercode[ind]),
                                date: json.hourly.time[ind],
                                temp: json.hourly.temperature_2m[ind]
                            }))
                        }
                    },
                    cacheTime: new Date()
                };
                let file = "[]";
                try {
                    file = (await fs.readFile(path.resolve(user.getAppDataPath(), "weather/previous_locations.json"))).toString() || "[]";
                }
                catch (_err) {
                    file = "[]";
                    try {
                        fs.mkdir(path.resolve(user.getAppDataPath(), "weather"));
                    }
                    catch (_err2) {
                    }
                }
                const parsedFile = JSON.parse(file);
                if (parsedFile.length > 5) {
                    parsedFile.shift();
                }
                if (parsedFile.find(obj => obj.id === req.params.id) === undefined) {
                    parsedFile.push({
                        name: out.name,
                        id: req.params.id
                    });
                }
                await fs.writeFile(path.resolve(user.getAppDataPath(), "weather/previous_locations.json"), JSON.stringify(parsedFile));
                return res.json({
                    name: out.name,
                    admin1: out.admin1,
                    country: out.country,
                    currentWeather: {
                        temp: json.current_weather.temperature,
                        condition: parseWeatherCodes(json.current_weather.weathercode),
                        time: json.current_weather.time,
                        wind: {
                            direction: json.current_weather.winddirection,
                            speed: json.current_weather.windspeed
                        }
                    },
                    daily: {
                        unit: json.daily_units.temperature_2m_max,
                        days: json.daily.time.map((_, ind) => ({
                            date: json.daily.time[ind],
                            temp: {
                                min: json.daily.temperature_2m_min[ind],
                                max: json.daily.temperature_2m_max[ind]
                            },
                            condition: parseWeatherCodes(json.daily.weathercode[ind])
                        }))
                    },
                    hourly: {
                        unit: json.hourly_units.temperature_2m,
                        hours: json.hourly.time.map((_, ind) => ({
                            condition: parseWeatherCodes(json.hourly.weathercode[ind]),
                            date: json.hourly.time[ind],
                            temp: json.hourly.temperature_2m[ind]
                        }))
                    }
                });
            }).catch(err => {
                log(logTypes.error, "Failed to fetch weather data from open-meteo", err);
                return res.json({ error: true });
            });
        }).catch(err => {
            log(logTypes.error, "Failed to fetch weather data from open-meteo", err);
            return res.json({ error: true });
        });
    });
    app.get("/app/weather/hourly/:location", async (req, res) => {
        const { location } = req.params;
        fetch(`https://geocoding-api.${OPEN_METEO_INSTANCE}/v1/search?name=${location}&language=en&count=5&format=json`)
            .then(async (resp) => {
            const locationData = (await resp.json()).results;
            const { latitude, longitude } = {
                latitude: locationData[0]?.latitude || 51.5085,
                longitude: locationData[0]?.longitude || -0.1257
            };
            fetch(`https://api.${OPEN_METEO_INSTANCE}/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode&current_weather=true&forecast_days=1`)
                .then(data => data.json()).then(weatherData => {
                return res.json({
                    data: weatherData,
                    location: locationData[0]
                });
            })
                .catch(_err => {
                log(logTypes.error, "Unable to fetch weather data for location: ", { locationData });
                return res.json({ error: true });
            });
        })
            .catch(_err => {
            log(logTypes.error, "Unable to fetch weather data for location: ", { location });
            return res.json({ error: true });
        });
    });
};
export default main;
//# sourceMappingURL=index.js.map