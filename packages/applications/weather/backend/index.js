import YourDashModule from "backend/src/core/yourDashModule.js";
import getWeatherDataForLocationId from "./helpers/getWeatherDataForLocationId.js";
import geolocationApi from "./geolocationApi.js";
export const weatherForecastCache = {};
export default class WeatherModule extends YourDashModule {
    constructor(args) {
        super(args);
        geolocationApi(this.API().request);
        this.API().request.get("/app/weather/location/:id", async (req, res) => {
            const { id } = req.params;
            if (weatherForecastCache[id]) {
                const currentTime = Math.floor(new Date().getTime() / 1_000);
                if (currentTime > weatherForecastCache[id].cacheTime + 1_800_000) {
                    return res.json({ ...weatherForecastCache[id].data, collectedAt: weatherForecastCache[id].cacheTime });
                }
                delete weatherForecastCache[id];
            }
            return res.json(await getWeatherDataForLocationId(id));
        });
    }
}
//# sourceMappingURL=index.js.map