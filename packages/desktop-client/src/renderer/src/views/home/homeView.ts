/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UK } from "@yourdash/uikit";
import DEFAULT_TILE_ICON from "./../../../../../../web-client/public/assets/productLogos/yourdash1024.avif"
import HERO_IMAGE from "./../../../assets/icons.svg"
import tileStyles from "./tile.module.scss"
import styles from "./homeView.module.scss"

export default class HomeView extends UK.Col {
  constructor() {
    super();

    this.domElement.style.width = "100%";
    this.domElement.style.height = "100%";
    this.domElement.style.flexDirection = "column";
    this.domElement.style.alignItems = "center";
    this.domElement.style.justifyContent = "center";
    this.domElement.style.background = "rgb(var(--bg))";

    const heroImage = this.createComponent( UK.Image, { src: HERO_IMAGE } )
    heroImage.domElement.classList.add( styles.heroImage )

    this.createComponent( UK.Header, {
      text: "YourDash Desktop",
      textAlign: "center",
      level: 0
    } )

    const tileContainer = this.createComponent( UK.Empty )

    const tiles: { label: string, icon: string, onClick(): void }[] = [
      {
        label: "Files",
        icon: DEFAULT_TILE_ICON,
        onClick: () => {
          console.log( "change page" )
        }
      },
      {
        label: "Files",
        icon: DEFAULT_TILE_ICON,
        onClick: () => {
          console.log( "change page" )
        }
      },
      {
        label: "Files",
        icon: DEFAULT_TILE_ICON,
        onClick: () => {
          console.log( "change page" )
        }
      }
    ]

    tiles.map( tile => {
      const tileCard = tileContainer.createComponent( UK.Card, {
        level: 0,
        actionsFillWidth: true
      } )

      tileCard.domElement.classList.add( tileStyles.tile )

      const image = tileCard.slots.content.createComponent( UK.Image, { src: tile.icon } )
      image.domElement.style.width = "100%"
      image.domElement.style.aspectRatio = "1 / 1"

      tileCard.slots.actions.createComponent( UK.Button, {
        label: "Open",
        onClick: () => {
          tile.onClick()
        }
      } )
    } )
  }
}
