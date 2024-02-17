import UIKitHTMLComponent from "../component";

export interface UIKitHTMLDivElementProps {}

export default class UIKitHTMLDivElement extends UIKitHTMLComponent<UIKitHTMLDivElementProps> {
  constructor(props: UIKitHTMLDivElementProps) {
    super(props);

    this.__internal__.htmlElement = document.createElement("div");

    return this;
  }

  init() {
    return this;
  }
}
