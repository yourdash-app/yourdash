/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card.js";
import Image from "@yourdash/uikit/components/image/image.js";
import Subtext from "@yourdash/uikit/components/subtext/subtext.js";
import getRouter from "@yourdash/uikit/core/router/getRouter.js";
import { ISubPhotoAlbum } from "../../../../../../../shared/photoAlbum.js";
import styles from "./subAlbum.module.scss";

export default class SubAlbum extends Card {
  data?: ISubPhotoAlbum;

  constructor(data: ISubPhotoAlbum) {
    super();
    this.data = data;

    return this;
  }

  async init() {
    super.init();

    this.htmlElement.addClass(styles.component);

    this.onClick(() => {
      console.log(this.__internals.treeContext);
      getRouter(this)?.navigate(`/app/a/photos/album/${this.data?.path}`);
    });

    this.addChild(new Image(this.data?.coverPhoto, true, true));
    this.addChild(new Subtext(this.data?.displayName));
  }
}
