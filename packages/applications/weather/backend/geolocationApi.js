import log, { logTypes } from "backend/src/helpers/log.js";
import getGeolocationSuggestions from "./helpers/locationAutocompleteSuggestions.js";
export default function geolocationApi(exp) {
    const geolocationApiCache = new Map();
    exp.get("/app/weather/geolocation/:locationName", async (req, res) => {
        const locationName = req.params.locationName;
        if (req.params.locationName.length < 3) {
            return res.json([]);
        }
        if (geolocationApiCache.get(req.params.locationName))
            return res.json(geolocationApiCache.get(req.params.locationName));
        log(logTypes.info, `Fetching location suggestions for ${req.params.locationName}`);
        const suggestions = await getGeolocationSuggestions(locationName, 8);
        geolocationApiCache.set(req.params.locationName, suggestions);
        return res.json(suggestions);
    });
}
//# sourceMappingURL=geolocationApi.js.map