import UKComponent, { UKComponentProps } from "../../component.ts";
import styles from "./button.module.scss";

export interface IButton extends UKComponentProps {
  label: string,
  onClick: () => void,
  size?: "small" | "medium" | "large",
  transparent?: boolean,
  disabled?: boolean
}

export default class Button extends UKComponent<IButton, {}> {
  constructor( props: IButton ) {
    super( props );

    this.domElement = document.createElement( "button" )
    this.domElement.innerText = this.props.label;
    this.domElement.classList.add( styles.component )

    if (this.props.size) {
      this.setSize(this.props.size)
    }

    if (this.props.transparent) {
      this.setTransparent(true)
    }

    if (this.props.disabled) {
      this.setDisabled(true)
    }

    this.domElement.addEventListener( "click", this.click.bind( this ) )
  }

  setDisabled(disabled: boolean): this {
    if (disabled) {
      this.domElement.setAttribute("disabled", "true")
    } else {
      this.domElement.removeAttribute("disabled")
    }

    return this
  }

  setTransparent(transparent: boolean): this {
    if (transparent) {
      this.domElement.classList.add(styles.transparent)
    } else {
      this.domElement.classList.remove(styles.transparent)
    }

    return this
  }

  setSize(size: Required<IButton["size"]>): this {
    this.props.size = size

    this.domElement.classList.remove(styles.sizeSmall)
    this.domElement.classList.remove(styles.sizeLarge)

    switch (size) {
      case "small":
        this.domElement.classList.add(styles.sizeSmall)
        break;
      case "large":
        this.domElement.classList.add(styles.sizeLarge)
        break;
      default:
        break;
    }

    return this
  }

  click(): this {
    this.props.onClick()

    return this
  }
}