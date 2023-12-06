/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "web-client/src/helpers/clippy";
import { Card, Column } from "web-client/src/ui/index";
import CLEAR_BACKGROUND from "../../assets/weatherBackgrounds/clear.jpg";
import CLOUDY_BACKGROUND from "../../assets/weatherBackgrounds/cloudy1.jpg";
import RAIN_BACKGROUND from "../../assets/weatherBackgrounds/rain1.jpg";
import SNOW_BACKGROUND from "../../assets/weatherBackgrounds/snow.jpg";
import THUNDER_BACKGROUND from "../../assets/weatherBackgrounds/thunder.jpg";
import LocationSearchBar from "./components/LocationSearchBar/LocationSearchBar";
import styles from "./MenuView.module.scss"
import { useEffect, useState } from "react";

const BACKGROUND_IMAGES: string[] = [
  THUNDER_BACKGROUND,
  CLOUDY_BACKGROUND,
  RAIN_BACKGROUND,
  SNOW_BACKGROUND,
  CLEAR_BACKGROUND
]

const MenuView: React.FC = () => {
  const [ backgroundImage, setBackgroundImage ] = useState<string>( "" )

  useEffect( () => {
    const backgroundIndex = Math.floor( Math.random() * 5 )

    setBackgroundImage( BACKGROUND_IMAGES[backgroundIndex] )
  }, [] );

  return <Column className={styles.page}>
    <Card
      shadow={false}
      showBorder={false}
      className={clippy(
        styles.hero,
        "animate__animated animate__fadeIn animate__500ms",
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <h1 className={styles.text}>
        YourDash Weather
      </h1>
    </Card>
    <Column className={"animate__animated animate__fadeIn animate__750ms"}>
      <LocationSearchBar/>
    </Column>
  </Column>
}

export default MenuView
