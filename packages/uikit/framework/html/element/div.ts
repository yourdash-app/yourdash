import UIKitDataStore from "../../store";
import UIKitHTMLComponent from "../component";

export interface UIKitHTMLDivElementProps {
  children: UIKitHTMLComponent[],
  className: string,
  events: UIKitDataStore<UIKitHTMLElementEvents>
}

export default class UIKitHTMLDivElement extends UIKitHTMLComponent<UIKitHTMLDivElementProps> {
  constructor(props: UIKitHTMLDivElementProps) {
    super(props)

    this.props.set("className", "hello world")

    return this
  }
}