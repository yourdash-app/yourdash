/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ContainerComponent } from "../component/containerComponent.js";
import { AnyComponentOrHTMLElement } from "../component/type.js";

export default class UKRouter extends ContainerComponent {
  private urlChangeListener: (url: string) => void;
  private basePath: string = "";
  private routes: { [path: string]: AnyComponentOrHTMLElement } = {};
  private currentRoute: string = "";

  constructor() {
    super();

    this.urlChangeListener = (url: string) => {
      console.log(`URL changed to '${url}'!`);
    };

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
    this.routes[path] = component;

    return this;
  }

  loadRoute(path: string) {
    this.currentRoute = path;

    return this;
  }

  render() {
    super.render();

    return this;
  }
}
