/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import platformSelector from "@yourdash/uikit/core/platformSelector.js";
import ReactUIKitView from "@yourdash/uikit/core/ReactUIKitView.js";
import UKRouter from "@yourdash/uikit/core/router/router.js";
import React from "react";
import Text from "@yourdash/uikit/components/text/text.js";
import DesktopHomePage from "./pages/home/desktop.js";
import MobileHomePage from "./pages/home/mobile.js";

const PhotosRouter: React.FC = () => {
  return (
    <ReactUIKitView
      onLoad={(cr) => {
        const router = new UKRouter();

        console.log(router.__internals.treeContext);

        router.addRoute(
          router
            .createRoute({
              path: "/app/a/photos/",
              // TODO: implement an outlet for layout routes
              component: () => new Text().setText("Hello World!"),
            })
            .addRoute(
              router.createRoute({
                index: true,
                component: () =>
                  platformSelector(
                    () => new DesktopHomePage(),
                    () => new MobileHomePage(),
                  ),
              }),
            )
            .addRoute(
              router.createRoute({
                path: "test",
                component: () => new Text().setText("Hello World from test!"),
              }),
            )
            .addRoute(
              router.createRoute({
                path: "test/:hello/world/",
                component: (params) => new Text().setText(`Hello World! ${JSON.stringify(params)}`),
              }),
            ),
        );

        cr.addChild(router);
        router.init();
      }}
    />
  );
};

export default PhotosRouter;
