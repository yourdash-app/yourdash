import UKComponent, { UKComponentProps } from "./component.ts";

export {}

// @ts-ignore
window.__uikit__ = {
  componentTree: [],
}

export default class UIKit {
  domElement: HTMLDivElement = document.createElement("div")
  children: UKComponent<UKComponentProps>[] = []

  constructor(container: HTMLElement) {
    // @ts-ignore
    window.__uikit__.componentTree.push(this)
    container.appendChild(this.domElement)

    return this
  }

  add<T extends UKComponentProps>(component: typeof UKComponent<T>, props: UKComponent<T>["props"]) {
    let comp = new component(props)

    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild(comp.domElement)

    this.children.push(comp)
    return comp
  }
}