import UKComponent, { UKComponentProps } from "../../component.ts";

export interface IButton extends UKComponentProps {
  label: string
}

export default class Button extends UKComponent<IButton> {
  constructor(props: IButton) {
    super(props);

    this.domElement = document.createElement("button")
    this.domElement.innerText = this.props.label;
  }
}