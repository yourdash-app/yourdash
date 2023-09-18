import { weatherStates } from "./weatherStates.js";
interface weatherForecast {
    name: string;
    admin1: string;
    country: string;
    currentWeather: {
        temp: number;
        condition: weatherStates;
        wind: {
            direction: number;
            speed: number;
        };
        time: string;
    };
    daily: {
        unit: "°C" | "°F";
        days: {
            temp: {
                min: number;
                max: number;
            };
            date: string;
            condition: weatherStates;
        }[];
    };
    hourly: {
        unit: "°C" | "°F";
        hours: {
            temp: number;
            date: string;
            condition: weatherStates;
        }[];
    };
}
export { type weatherForecast };
