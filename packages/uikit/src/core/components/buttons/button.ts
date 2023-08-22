import UKComponent, { UKComponentProps } from "../../component.ts";
import styles from "./button.module.scss";

export interface IButton extends UKComponentProps {
  label: string,
  onClick: () => void
}

export default class Button extends UKComponent<IButton> {
  constructor(props: IButton) {
    super(props);

    this.domElement = document.createElement("button")
    this.domElement.innerText = this.props.label;
    this.domElement.classList.add(styles.component)
    this.domElement.addEventListener("click", this.click.bind(this))
  }

  click() {
    this.props.onClick()
  }
}