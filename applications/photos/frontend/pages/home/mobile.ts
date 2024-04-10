/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/uikit/components/heading/heading.js";
import Separator from "@yourdash/uikit/components/separator/separator.js";
import Subtext from "@yourdash/uikit/components/subtext/subtext.js";
import { ContainerComponent } from "@yourdash/uikit/core/component/containerComponent.js";
import DivElement from "@yourdash/uikit/html/divElement.js";
import Category from "./components/category/category.js";
import fetchCategories from "./lib/fetchCategories.js";
import styles from "./mobile.module.scss";

export default class MobileHomePage extends ContainerComponent {
  htmlElement: DivElement;
  categories: string[] = [];
  itemCounter!: Subtext;

  constructor() {
    super();

    this.htmlElement = new DivElement();

    return this;
  }

  async init() {
    super.init();

    this.htmlElement.addClass(styles.page);

    this.addChild(DivElement).$((e) => {
      e.addClass(styles.hero);
      e.addChild(Heading, { text: "All Photos" });
      this.itemCounter = e.addChild(Subtext, { text: "0 items" });
    });

    this.addChild(Separator, { direction: "column" });

    this.categories = await fetchCategories();

    let itemCount = 0;

    this.categories.map((cat) => {
      const category = this.addChild(Category, { path: cat });

      category.setOnFetch(() => {
        itemCount += category.data?.items.photos.length || 0;
        itemCount += category.data?.items.subAlbums.length || 0;
        itemCount += category.data?.items.videos.length || 0;

        this.itemCounter.setText(itemCount + " items");
      });
    });
  }
}
