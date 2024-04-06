/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { pathToRegexp } from "path-to-regexp";
import Card from "../../components/card/card.js";
import Heading from "../../components/heading/heading.js";
import DivElement from "../../html/divElement.js";
import { ContainerComponent } from "../component/containerComponent.js";
import { AnyComponentOrHTMLElement } from "../component/type.js";
import styles from "./router.module.scss";

export default class UKRouter extends ContainerComponent {
  private readonly urlChangeListener: () => void;
  private basePath: string = "";
  private routes: { [route: string]: AnyComponentOrHTMLElement } = {};
  private currentRoute: string = "";
  params: { [key: string]: string } = {};

  constructor() {
    super();

    this.htmlElement = new DivElement();

    this.urlChangeListener = () => {
      const location = window.location.hash.replace("#", "");
      console.log(`URL changed to '${location}'!`);

      this.loadRoute(location);
    };

    // when the HashURL changes, load the new route or do nothing if it's the same
    window.addEventListener("hashchange", () => this.urlChangeListener());

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
    this.routes[this.basePath + path] = component;

    console.log(`Route '${this.basePath}${path}' added!`);

    return this;
  }

  // insp: https://github.com/expressjs/express/blob/master/lib/router/layer.js

  private findRoute(path: string) {
    if (path === null) return "";

    Object.keys(this.routes).forEach((key) => {
      const regexp = pathToRegexp(key, []);

      const regexMatch = regexp.exec(path);

      if (regexMatch) {
        console.log(regexMatch, path, key);
        console.log(regexMatch.length);

        // this.params = regexMatch[0];
        this.currentRoute = key;
      }
    });
  }

  loadRoute(path: string) {
    const foundRoute = this.findRoute(path) || "";

    if (foundRoute === "") {
      console.warn(`Route for '${path}' not found!`);

      return this;
    }

    this.__loadRoute(foundRoute);

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
          c.addChild(
            new Card().addChild(
              new Heading().$((hc) => {
                hc.setText(`-----=====-----\n404!\n-----=====-----\n\n'${path}' not found!`);
                hc.htmlElement.addClass(styles.heading);
              }),
            ),
          );
        }),
      );

      this.render();

      return this;
    }

    this.__internals.children.push(this.routes[path]);

    this.render();

    return this;
  }

  reloadRoutes() {
    this.urlChangeListener();

    return this;
  }
}
