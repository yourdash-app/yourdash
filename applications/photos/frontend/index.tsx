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
        const router = cr.addChild(UKRouter, {});

        router.addRoute(
          router
            .createRoute({
              path: "/app/a/photos/",
            })
            .addRoute(
              router.createRoute({
                index: true,
                component: () =>
                  platformSelector(
                    () => {
                      return {
                        component: DesktopHomePage,
                        props: {},
                      };
                    },
                    () => {
                      return {
                        component: MobileHomePage,
                        props: {},
                      };
                    },
                  ),
              }),
            )
            .addRoute(
              router.createRoute({
                path: "test",
                component: () => {
                  return { component: Text, props: { text: "Hello World from test!" } };
                },
              }),
            )
            .addRoute(
              router.createRoute({
                path: "test/:hello/world/",
                component: (params) => {
                  return { component: Text, props: { text: `Hello World! ${JSON.stringify(params)}` } };
                },
              }),
            ),
        );

        router.revalidate();
      }}
    />
  );
};

export default PhotosRouter;
