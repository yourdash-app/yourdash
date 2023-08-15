import { WEATHER_STATES } from "../shared/weatherStates.js";
export default function parseWeatherCodes(code) {
    switch (code) {
        case 0:
        case 1:
            return WEATHER_STATES.CLEAR;
        case 2:
            return WEATHER_STATES.PARTLY_CLOUDY;
        case 3:
            return WEATHER_STATES.CLOUDY;
        case 45:
        case 48:
            return WEATHER_STATES.FOG;
        case 51:
        case 53:
        case 55:
        case 56:
        case 61:
        case 66:
            return WEATHER_STATES.LIGHT_RAIN;
        case 63:
        case 57:
            return WEATHER_STATES.RAIN;
        case 64:
        case 67:
        case 65:
            return WEATHER_STATES.HEAVY_RAIN;
        case 71:
            return WEATHER_STATES.LIGHT_SNOW;
        case 75:
            return WEATHER_STATES.HEAVY_SNOW;
        case 73:
        case 77:
        case 85:
        case 86:
            return WEATHER_STATES.SNOW;
        case 80:
            return WEATHER_STATES.LIGHT_RAIN_SHOWERS;
        case 81:
            return WEATHER_STATES.RAIN_SHOWERS;
        case 82:
            return WEATHER_STATES.HEAVY_RAIN_SHOWERS;
        case 95:
        case 96:
        case 99:
            return WEATHER_STATES.THUNDER;
        default:
            return 0;
    }
}
//# sourceMappingURL=parseWeatherState.js.map