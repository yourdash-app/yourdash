/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { AgnosticDataRouteObject, Router } from "@remix-run/router/";
import Card from "../../components/card/card.js";
import Heading from "../../components/heading/heading.js";
import DivElement from "../../html/divElement.js";
import { ContainerComponent } from "../component/containerComponent.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "../component/type.js";
import styles from "./router.module.scss";
import { createBrowserHistory, createRouter, Params } from "@remix-run/router";
import { Constructor } from "type-fest";

type UKRouteProps = Omit<UKRoute["__internalRoute"], "children">;

// @ts-ignore
export type UKRouteComponent<T extends AnyComponentOrHTMLElement = AnyComponentOrHTMLElement> = {
  component: Constructor<T>;
  props: T extends AnyComponent ? T["props"] : object;
};

class UKRoute {
  __internalRoute: {
    children?: UKRoute[];
    path?: string;
    index?: boolean;
    component?: (params: Params) => UKRouteComponent;
  };

  constructor(props: UKRouteProps) {
    this.__internalRoute = props;

    if (!props.path && !props.index) {
      console.warn(
        `UKRouter: @${window.location.pathname} A route was created without a path and was not an index route!`,
      );

      return this;
    }

    return this;
  }

  addRoute(route: UKRoute) {
    if (!this.__internalRoute.children?.length) {
      this.__internalRoute.children = [];
    }

    this.__internalRoute.children.push(route);

    return this;
  }
}

export default class UKRouter extends ContainerComponent {
  private router: Router;

  constructor() {
    super();

    this.htmlElement = new DivElement();

    this.htmlElement.setAttribute("uk-router", "");

    this.router = createRouter({
      routes: [
        {
          path: "*",
          // @ts-ignore
          loader: () => {
            console.log(`ROUTER 404: cannot find: ${window.location.pathname}`);

            this.onPathChange();
            this.addChild(DivElement).$((c) => {
              c.addClass(styles.pageNotFound);
              c.addChild(Card)
                .addChild(Heading)
                .$((hc) => {
                  hc.setText(`-----=====-----\n404!\n-----=====-----\n\n'${window.location.pathname}' not found!`);
                  hc.htmlElement.addClass(styles.heading);
                });
            });
          },
        },
      ],
      history: createBrowserHistory({ window: window }),
    });

    this.__internals.treeContext.router = this;

    return this;
  }

  private onPathChange() {
    this.__internals.children = [];
    this.htmlElement.clearChildren();

    return this;
  }

  addRoute(route: UKRoute) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    function convertChildrenToDataRoute(children?: UKRoute[]) {
      if (!children || !children.length) return [];

      return children.map((child): AgnosticDataRouteObject => {
        return {
          path: child.__internalRoute.path,
          index: child.__internalRoute.index,
          // @ts-ignore
          loader: ({ params }) => {
            self.onPathChange();

            if (!!child.__internalRoute.component) {
              const comp = child.__internalRoute.component(params);
              self.addChild(comp.component, comp.props);
            }
          },
          children: convertChildrenToDataRoute(child.__internalRoute.children),
        };
      });
    }

    this.router.routes.push({
      path: route.__internalRoute.path,
      index: route.__internalRoute.index,
      // @ts-ignore
      loader: ({ params }) => {
        this.onPathChange();
        console.log(`ROUTE REACHED!, ${route.__internalRoute.path}`, route.__internalRoute);

        if (!!route.__internalRoute.component) {
          const comp = route.__internalRoute.component(params);
          self.addChild(comp.component, comp.props);
        }
      },
      children: convertChildrenToDataRoute(route.__internalRoute.children),
    });

    return this;
  }

  createRoute(props: UKRouteProps): UKRoute {
    return new UKRoute(props);
  }

  revalidate() {
    this.router.revalidate();

    return this;
  }

  // This must be run after new routes are added to the UKRouter
  init() {
    super.init();

    return this;
  }

  navigate(path: string) {
    this.router.navigate(path);

    return this;
  }
}
