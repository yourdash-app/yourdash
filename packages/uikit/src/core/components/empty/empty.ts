/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "../..";

export default class Empty extends UKSlotComponent {
  constructor() {
    super( {} );
    this.domElement = document.createElement( "div" );
  }
}
