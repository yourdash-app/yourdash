import UKComponent, { UKComponentProps } from "./component.ts";

export {}

// @ts-ignore
window.__uikit__ = {
  componentTree: [],
}

export default class UIKit {
  domElement: HTMLDivElement = document.createElement("div")
  components: UKComponent<UKComponentProps>[] = []

  constructor(container: HTMLElement) {

    container.appendChild(this.domElement)

    return this
  }

  add<T extends UKComponentProps>(component: typeof UKComponent<T>, props: UKComponent<T>["props"]) {
    let comp = new component(props)

    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild(comp.domElement)

    this.components.push(comp)
    return comp
  }
}