/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent from "../../component.ts";
import styles from "./row.module.scss";

export default class Row extends UKComponent {
  constructor() {
    super();

    this.domElement = document.createElement( "div" )
    this.domElement.classList.add( styles.component )
  }
}
