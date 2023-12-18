/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKComponent, ValidUKComponent } from "../../component.ts";
import { UKIcon } from "../../icons/icons.ts";
import { UK } from "../../index.ts";
import UKComponentSlot from "../../slot.ts";
import { Empty } from "../index.ts";
import styles from "./dialog.module.scss";

export default class Dialog extends UKComponent<{
  closable?: boolean;
  headlineIcon?: typeof UKIcon[keyof typeof UKIcon];
  headline?: string;
  description?: string;
}, {
  content?: UKComponentSlot<ValidUKComponent>,
  options?: UKComponentSlot<UK.Button[] /* TODO: implement this => UK.Link */>
}> {
  domElement: HTMLDivElement
  headlineElement: HTMLHeadingElement
  descriptionElement: HTMLDivElement
  headlineIconComponent: UK.Icon

  constructor( props: Dialog["props"] ) {
    super( props );

    this.domElement = document.createElement( "div" );
    this.domElement.classList.add( styles.component );

    this.headlineElement = document.createElement( "h2" );
    this.headlineElement.classList.add( styles.headline );

    this.descriptionElement = document.createElement( "div" );
    this.descriptionElement.classList.add( styles.description );

    this.headlineIconComponent = new UK.Icon( {
      icon: UKIcon.Heading
    } );
    this.headlineIconComponent.domElement.classList.add( styles.headlineIcon );
  }

  setHeadline( headline: string ) {
    this.headlineElement.textContent = headline;
  }

  setHeadlineIcon( icon: keyof typeof UKIcon ) {
    this.headlineIconComponent.setIcon( icon )
  }
}
