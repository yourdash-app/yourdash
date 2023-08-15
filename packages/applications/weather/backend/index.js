import getLocationAutocompleteSuggestions from "./locationAutocompleteSuggestions.js";
import getWeatherDataForLocationId from "./getWeatherDataForLocationId.js";
export const weatherForecastCache = {};
const main = ({ app }) => {
    app.get("/app/weather/geolocation/:locationName", async (req, res) => {
        const locationName = req.params.locationName;
        return res.json(await getLocationAutocompleteSuggestions(locationName, 8));
    });
    app.get("/app/weather/for/:latitude/:longitude", async (req, res) => {
        const { latitude, longitude } = req.params;
        if (weatherForecastCache[latitude + ":" + longitude]) {
            const currentTime = Math.floor(new Date().getTime() / 1000);
            if (currentTime > weatherForecastCache[latitude + ":" + longitude].cacheTime + 1_800_000) {
                return res.json(weatherForecastCache[latitude + ":" + longitude].data);
            }
            delete weatherForecastCache[latitude + ":" + longitude];
        }
        return res.json(await getWeatherDataForLocationId(latitude, longitude));
    });
};
export default main;
//# sourceMappingURL=index.js.map