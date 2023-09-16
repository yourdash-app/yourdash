/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

var weatherStates;
(function (weatherStates) {
    weatherStates[weatherStates["clear"] = 0] = "clear";
    weatherStates[weatherStates["partlyCloudy"] = 1] = "partlyCloudy";
    weatherStates[weatherStates["cloudy"] = 2] = "cloudy";
    weatherStates[weatherStates["fog"] = 3] = "fog";
    weatherStates[weatherStates["lightRain"] = 4] = "lightRain";
    weatherStates[weatherStates["rain"] = 5] = "rain";
    weatherStates[weatherStates["heavyRain"] = 6] = "heavyRain";
    weatherStates[weatherStates["lightSnow"] = 7] = "lightSnow";
    weatherStates[weatherStates["snow"] = 8] = "snow";
    weatherStates[weatherStates["heavySnow"] = 9] = "heavySnow";
    weatherStates[weatherStates["lightRainShowers"] = 10] = "lightRainShowers";
    weatherStates[weatherStates["rainShowers"] = 11] = "rainShowers";
    weatherStates[weatherStates["heavyRainShowers"] = 12] = "heavyRainShowers";
    weatherStates[weatherStates["thunder"] = 13] = "thunder";
})(weatherStates || (weatherStates = {}));
export { weatherStates };
//# sourceMappingURL=weatherStates.js.map