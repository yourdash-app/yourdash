import getLocationAutocompleteSuggestions from "./helpers/locationAutocompleteSuggestions.js";
import getWeatherDataForLocationId from "./helpers/getWeatherDataForLocationId.js";
export const weatherForecastCache = {};
const main = ({ app }) => {
    app.get("/app/weather/geolocation/:locationName", async (req, res) => {
        const locationName = req.params.locationName;
        return res.json(await getLocationAutocompleteSuggestions(locationName, 8));
    });
    app.get("/app/weather/location/:id", async (req, res) => {
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