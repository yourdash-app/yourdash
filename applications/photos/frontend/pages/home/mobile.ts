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
  categories: string[] = [];
  itemCounter!: Subtext;

  constructor() {
    super();
    return this;
  }

  async init() {
    super.init();

    console.log(this.__internals.parentComponent?.__internals);

    this.htmlElement.addClass(styles.page);

    this.addChild(
      new DivElement().$((e) => {
        e.addClass(styles.hero);
        e.addChild(new Heading("All Photos"));
        this.itemCounter = new Subtext("0 items");
        e.addChild(this.itemCounter);
      }),
    );

    this.addChild(new Separator().setDirection("column"));

    this.categories = await fetchCategories();

    let itemCount = 0;

    this.categories.map((cat) => {
      const category = new Category(cat);

      category.setOnFetch(() => {
        itemCount += category.data?.items.photos.length || 0;
        itemCount += category.data?.items.subAlbums.length || 0;
        itemCount += category.data?.items.videos.length || 0;

        this.itemCounter.setText(itemCount + " items");
      });

      this.addChild(category);
    });
  }
}
