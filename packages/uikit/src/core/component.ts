export interface UKComponentProps {
  slots?: { [ slotName: string ]: UKComponent<UKComponentProps> | undefined }
}

export default class UKComponent<T extends UKComponentProps> {
  parentDomElement?: HTMLElement
  domElement: HTMLElement;
  props: T
  private _hasRendered: boolean = false

  constructor(props: T) {
    this.props = props
    this.domElement = document.createElement("div")
  }

  _initialRender(): void {
    if (this._hasRendered) console.warn(`WARNING: This component has already been initialized!`, this)
    this._hasRendered = true
    return
  }
}