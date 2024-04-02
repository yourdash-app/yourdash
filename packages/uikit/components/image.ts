/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { SoloComponent } from "../core/component/soloComponent.js";
import ImgElement from "../html/imgElement.js";
import styles from "./image.module.scss";

export default class Image extends SoloComponent {
  htmlElement: ImgElement;

  constructor() {
    super();

    this.htmlElement = new ImgElement();

    return this;
  }

  setSrc(src: string) {
    this.htmlElement.setSrc(src);

    return this;
  }

  // an array of {src: string, width?: number, pixelDensityScale: number}
  setSrcSet(srcSet: [{ src: string; width?: number; pixelDensityScale: number }]) {
    function createSrc(ss: { src: string; width?: number; pixelDensityScale: number }) {
      return ss.src + (ss.width ? ` ${ss.width}w` : "") + ss.pixelDensityScale ? ` ${ss.pixelDensityScale}x` : "";
    }

    this.htmlElement.setSrcSet(srcSet.map((ss) => createSrc(ss)).join(", "));

    return this;
  }

  render() {
    this.htmlElement.addClass(styles.component);

    return this;
  }
}
