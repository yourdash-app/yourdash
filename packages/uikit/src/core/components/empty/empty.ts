/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent } from "../..";

export default class Empty extends UKComponent<{ slots: { main: UKComponent }}> {
  constructor( props: Empty["props"] ) {
    super( props );
    this.domElement = document.createElement( "div" );
  }
}
