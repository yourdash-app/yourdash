/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKComponent, { UKComponentProps, UKComponentSlots, UKComponentState } from "./component"

export default class DomTree {
  element: HTMLElement
  children: DomTree[]
  component: UKComponent<UKComponentProps, UKComponentState, UKComponentSlots> | undefined
  
  constructor( element: HTMLElement ) {
    this.element = element
    this.children = []
  }

  addChild(element: HTMLElement) {
    this.children.push(new DomTree(element))

    return this
  }
}