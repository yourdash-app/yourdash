/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import loginPage from "@yourdash/web-client/src/root/login/views/LoginPage.js";
import Card from "../../components/card/card.js";
import Heading from "../../components/heading/heading.js";
import DivElement from "../../html/divElement.js";
import { ContainerComponent } from "../component/containerComponent.js";
import { AnyComponentOrHTMLElement } from "../component/type.js";
import styles from "./router.module.scss";

interface Route {
  component: () => AnyComponentOrHTMLElement;
  segments: { type: "normal" | "param"; value: string }[];
}

export default class UKRouter extends ContainerComponent {
  private readonly urlChangeListener: () => void;
  private basePath: string = "";
  private routes: { [route: string]: Route } = {};
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

  private splitPathIntoSegments(path: string) {
    return path
      .split("/")
      .filter((s) => s !== "")
      .map((s) => ({ type: s[0] === ":" ? "param" : ("normal" as "normal" | "param"), value: s[0] === ":" ? s.slice(1) : s }))
      .filter((s) => s.value !== "");
  }

  addRoute(path: string, component: () => AnyComponentOrHTMLElement) {
    let fullPath = this.basePath + path;

    if (path === "/") fullPath = this.basePath;

    this.routes[fullPath] = { component: component, segments: this.splitPathIntoSegments(fullPath) };

    console.log(this.routes[fullPath]);

    console.log(`Route '${fullPath}' added!`);

    return this;
  }

  private doesPathMatchSegments(path: string, segments: { type: "normal" | "param"; value: string }[]) {
    let remainingPath = path;
    const params: { [name: string]: string } = {};

    for (const segment of segments) {
      const pathSegmentSplit = remainingPath.split("/");

      if (segment.type === "param") {
        console.log(`setting param for ${segment.value}: ${pathSegmentSplit[0]}`);

        params[segment.value] = pathSegmentSplit[0];
        remainingPath = pathSegmentSplit[1];

        continue;
      }

      if (segment.value === pathSegmentSplit[0]) {
        remainingPath = pathSegmentSplit[1];

        continue;
      }

      return false;
    }

    return params;
  }

  private trimPossibleRoutes(path: string): Route[] {
    const trimmedRoutes = Object.values(this.routes).map((val) => {
      const firstSegment = val.segments[0];
      const firstPathSegment = path.split("/")[1].split("/")[0];

      console.log(val.segments);

      // count as a match if the first segment is a param (this is ok as this method is only to trim the amount of possible routes)
      if (firstSegment.type === "param") {
        return val;
      }

      if (firstPathSegment === firstSegment.value) {
        return val;
      }

      return undefined;
    });

    return trimmedRoutes.filter((route) => route !== undefined) as Route[];
  }

  private getRouteForPath(path: string): Route | undefined {
    const possibleRoutes = this.trimPossibleRoutes(path);

    possibleRoutes.map((route) => {
      console.log(this.doesPathMatchSegments(path, route.segments));

      if (this.doesPathMatchSegments(path, route.segments)) return route;
    });

    return undefined;
  }

  private loadRoute(path: string) {
    this.__internals.children = [];
    this.htmlElement.clearChildren();

    const route = this.getRouteForPath(path);

    console.log(route);

    if (!route) {
      console.warn(`Route for '${path}' not found!`);
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

    this.__internals.children.push(this.routes[path].component());

    this.render();

    return this;
  }

  reloadRoutes() {
    this.urlChangeListener();

    return this;
  }
}
