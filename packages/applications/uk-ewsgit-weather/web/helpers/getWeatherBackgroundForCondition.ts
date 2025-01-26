/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BACKGROUND_IMAGE_CLEAR from "../assets/weatherBackgrounds/clear.avif";
import BACKGROUND_IMAGE_CLOUDY1 from "../assets/weatherBackgrounds/cloudy1.avif";
import BACKGROUND_IMAGE_CLOUDY2 from "../assets/weatherBackgrounds/cloudy2.jpg";
import BACKGROUND_IMAGE_FOG from "../assets/weatherBackgrounds/foggy.jpg";
import BACKGROUND_IMAGE_RAIN1 from "../assets/weatherBackgrounds/rain1.jpg";
import BACKGROUND_IMAGE_RAIN2 from "../assets/weatherBackgrounds/rain2.jpg";
import BACKGROUND_IMAGE_RAIN3 from "../assets/weatherBackgrounds/rain3.jpg";
import BACKGROUND_IMAGE_SNOW1 from "../assets/weatherBackgrounds/snow.jpg";
import BACKGROUND_IMAGE_SNOW2 from "../assets/weatherBackgrounds/snow2.jpg";
import BACKGROUND_IMAGE_THUNDER from "../assets/weatherBackgrounds/thunder.jpg";
import { WEATHER_STATES } from "../../shared/weatherStates";

export const backgroundImages: string[] = [
  BACKGROUND_IMAGE_CLEAR,
  BACKGROUND_IMAGE_CLOUDY1,
  BACKGROUND_IMAGE_CLOUDY2,
  BACKGROUND_IMAGE_FOG,
  BACKGROUND_IMAGE_RAIN1,
  BACKGROUND_IMAGE_RAIN2,
  BACKGROUND_IMAGE_RAIN3,
  BACKGROUND_IMAGE_SNOW1,
  BACKGROUND_IMAGE_SNOW2,
  BACKGROUND_IMAGE_SNOW1,
  BACKGROUND_IMAGE_RAIN1,
  BACKGROUND_IMAGE_RAIN2,
  BACKGROUND_IMAGE_RAIN3,
  BACKGROUND_IMAGE_THUNDER,
];

export default function getWeatherBackgroundForCondition(weatherState: WEATHER_STATES): string {
  return backgroundImages[weatherState];
}
