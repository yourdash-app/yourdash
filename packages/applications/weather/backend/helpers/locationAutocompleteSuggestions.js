import { fetch } from "undici";
export default async function getGeolocationSuggestions(input, suggestionCount) {
    const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${input.replaceAll(" ", "+")}&count=${suggestionCount}&language=en&format=json`;
    try {
        const fetchRequest = await fetch(endpoint);
        const response = (await fetchRequest.json());
        if (!response) {
            return [];
        }
        return response.results.map((result) => {
            return {
                id: result.id,
                address: {
                    name: result.name,
                    admin1: result.admin1,
                    country: result.country
                },
                latitude: result.latitude,
                longitude: result.longitude
            };
        });
    }
    catch (_err) {
        return [];
    }
}
//# sourceMappingURL=locationAutocompleteSuggestions.js.map