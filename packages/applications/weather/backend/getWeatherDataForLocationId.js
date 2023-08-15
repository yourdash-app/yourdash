import { fetch } from "undici";
export default async function getWeatherDataForLocationId(latitude, longitude) {
    const TIMEZONE = "Europe/London";
    const fetchRequest = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=53.5405&longitude=-2.1183&hourly=temperature_2m,precipitation_probability,weathercode,cloudcover,windspeed_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max&current_weather=true&windspeed_unit=mph&timezone=${TIMEZONE.replaceAll("/", "%2F")}`);
    return fetchRequest.json();
}
//# sourceMappingURL=getWeatherDataForLocationId.js.map