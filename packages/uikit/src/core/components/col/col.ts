/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "../../component.ts";
import styles from "./col.module.scss";

export default class Col extends UKSlotComponent<undefined> {
  constructor() {
    super( undefined );

    this.domElement = document.createElement( "div" )
    this.domElement.classList.add( styles.component )
  }
}
