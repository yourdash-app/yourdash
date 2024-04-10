/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary.js";
import csi from "@yourdash/csi/csi.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import { ContainerComponent } from "@yourdash/uikit/core/component/containerComponent.js";
import { loadThemeLevel } from "@yourdash/uikit/core/theme.js";
import DivElement from "@yourdash/uikit/html/divElement.js";
import { IPhotoAlbum } from "../../../../../shared/photoAlbum.js";
import SubAlbum from "./components/subAlbum/subAlbum.js";
import styles from "./category.module.scss";

export default class Category extends ContainerComponent {
  declare props: { path: string };
  data?: IPhotoAlbum;
  toggleButton!: IconButton;
  content!: DivElement;
  onFetch?: () => void;

  constructor(props: Category["props"]) {
    super(props);

    return this;
  }

  setOnFetch(onFetch: () => void) {
    this.onFetch = onFetch;
    return this;
  }

  fetch(): Promise<IPhotoAlbum> {
    return new Promise<IPhotoAlbum>((resolve) => {
      csi.getJson(
        `/app/photos/album/${this.props.path}`,
        (album: IPhotoAlbum) => {
          resolve(album);
        },
        (error) => {
          console.log(error);
        },
      );
    });
  }

  async init() {
    super.init();

    loadThemeLevel(this.htmlElement.rawHtmlElement, 1);

    this.data = await this.fetch();
    this.onFetch?.();

    console.log(this.data);

    const header = this.addChild(DivElement);
    header.addClass(styles.header);

    header.addChild(Heading, { text: this.data.label, level: 2 });

    this.toggleButton = header.addChild(IconButton, {
      icon: UKIcon.ChevronDown,
      onClick: () => {
        this.collapse();
      },
    });

    this.content = this.addChild(DivElement);
    this.content.addClass(styles.content);

    this.data.items.subAlbums.map((album) => {
      console.log(album);
      this.content.addChild(SubAlbum, { data: album });
    });
  }

  expand() {
    this.toggleButton.setIcon(UKIcon.ChevronDown);
    this.toggleButton.onClick(() => {
      this.collapse();
    });
    this.content.removeClass(styles.collapsed);
    this.content.addClass(styles.expanded);

    return this;
  }

  collapse() {
    this.toggleButton.setIcon(UKIcon.ChevronUp);
    this.toggleButton.onClick(() => {
      this.expand();
    });
    this.content.removeClass(styles.expanded);
    this.content.addClass(styles.collapsed);

    return this;
  }
}
