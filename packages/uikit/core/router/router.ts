/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "../../components/card/card.js";
import DivElement from "../../html/divElement.js";
import { ContainerComponent } from "../component/containerComponent.js";
import { AnyComponentOrHTMLElement } from "../component/type.js";
import Text from "../../components/text/text.js";
import styles from "./router.module.scss";

export default class UKRouter extends ContainerComponent {
  private readonly urlChangeListener: () => void;
  private basePath: string = "";
  private routes: { [path: string]: AnyComponentOrHTMLElement } = {};
  private currentRoute: string = "";

  constructor() {
    super();

    this.htmlElement = new DivElement();

    this.urlChangeListener = () => {
      const location = window.location.hash.replace("#", "");
      console.log(`URL changed to '${location}'!`);

      this.loadRoute(location);
    };

    window.addEventListener("hashchange", () => this.urlChangeListener());
    this.urlChangeListener();

    return this;
  }

  setBasePath(path: string) {
    this.basePath = path;

    return this;
  }

  getBasePath(): string {
    return this.basePath;
  }

  addRoute(path: string, component: AnyComponentOrHTMLElement) {
    this.routes[`${this.basePath}${path}`] = component;

    console.log(`Route '${this.basePath}${path}' added!`);

    return this;
  }

  loadRoute(path: string) {
    this.currentRoute = path;

    this.__loadRoute(this.currentRoute);

    return this;
  }

  private __loadRoute(path: string) {
    this.__internals.children = [];
    this.htmlElement.clearChildren();

    if (!this.routes[path]) {
      console.warn(`Route '${path}' not found!`);
      this.__internals.children.push(
        new DivElement().$((c) => {
          c.addClass(styles.pageNotFound);
          c.addChild(new Card().addChild(new Text().setText(`Route '${path}' not found!`).htmlElement.setStyle("color", "red")));
        }),
      );

      this.render();

      return this;
    }

    this.__internals.children.push(this.routes[path]);

    this.render();

    return this;
  }

  render() {
    super.render();

    return this;
  }
}
