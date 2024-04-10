/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card.js";
import Image from "@yourdash/uikit/components/image/image.js";
import Subtext from "@yourdash/uikit/components/subtext/subtext.js";
import { ContainerComponent } from "@yourdash/uikit/core/component/containerComponent.js";
import getRouter from "@yourdash/uikit/core/router/getRouter.js";
import { ISubPhotoAlbum } from "../../../../../../../shared/photoAlbum.js";
import styles from "./subAlbum.module.scss";

export default class SubAlbum extends ContainerComponent {
  props: { data: ISubPhotoAlbum };
  card!: Card;

  constructor(props: SubAlbum["props"]) {
    super();

    this.props = props;

    return this;
  }

  async init() {
    super.init();

    this.htmlElement.addClass(styles.component);

    this.card = this.addChild(Card);

    this.card.onClick(() => {
      console.log(this.__internals.treeContext);
      getRouter(this).navigate(`/app/a/photos/album/${this.props.data.path}`);
    });

    if (this.props.data.coverPhoto) {
      this.card.addChild(Image, { src: this.props.data.coverPhoto, lazy: true, isAuthenticated: true });
    } else {
      this.card.addChild(Image, { src: "/assets/icons/no-entry-24.svg", lazy: true });
    }
    this.card.addChild(Subtext, { text: this.props.data.displayName });
  }
}
