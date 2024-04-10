/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { SoloComponent } from "../../core/component/soloComponent.js";
import ImgElement from "../../html/imgElement.js";
import styles from "./image.module.scss";

export default class Image extends SoloComponent {
  htmlElement: ImgElement;
  declare props: { src?: string; lazy?: boolean; isAuthenticated?: boolean };

  constructor(props: Image["props"] = {}) {
    super(props);

    this.htmlElement = new ImgElement();

    return this;
  }

  setLazy(lazy: boolean) {
    this.htmlElement.setAttribute("loading", lazy ? "lazy" : "eager");

    return this;
  }

  setDraggable(draggable: boolean) {
    this.htmlElement.setAttribute("draggable", draggable.toString());

    return this;
  }

  setSrc(src: string, isAuthenticated?: boolean) {
    if (isAuthenticated) {
      this.htmlElement.setSrc(csi.getInstanceUrl() + src);

      return this;
    }

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

  init() {
    super.init();

    const props = this.props;

    this.setDraggable(false);
    this.htmlElement.addClass(styles.component);

    if (props.lazy) this.setLazy(props.lazy);
    if (props.src) this.setSrc(props.src, props.isAuthenticated);
  }
}
