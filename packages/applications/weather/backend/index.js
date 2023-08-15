import getLocationAutocompleteSuggestions from "./locationAutocompleteSuggestions.js";
export const weatherForecastCache = {};
const main = ({ app }) => {
    app.get("/app/weather/geolocation/:locationName", async (req, res) => {
        const locationName = req.params.locationName;
        return res.json(await getLocationAutocompleteSuggestions(locationName, 8));
    });
};
export default main;
//# sourceMappingURL=index.js.map