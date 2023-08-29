import getWeatherDataForLocationId from "./helpers/getWeatherDataForLocationId.js";
import geolocationApi from "./geolocationApi.js";
export const weatherForecastCache = {};
const main = ({ exp }) => {
    geolocationApi(exp);
    exp.get("/app/weather/location/:id", async (req, res) => {
        const { id } = req.params;
        if (weatherForecastCache[id]) {
            const currentTime = Math.floor(new Date().getTime() / 1000);
            if (currentTime > weatherForecastCache[id].cacheTime + 1_800_000) {
                return res.json(weatherForecastCache[id].data);
            }
            delete weatherForecastCache[id];
        }
        return res.json(await getWeatherDataForLocationId(id));
    });
};
export default main;
//# sourceMappingURL=index.js.map