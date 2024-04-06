/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ReactUIKitView from "@yourdash/uikit/core/ReactUIKitView.js";
import UKRouter from "@yourdash/uikit/core/router/router.js";
import React from "react";
import Text from "@yourdash/uikit/components/text/text.js";

const PhotosRouter: React.FC = () => {
  return (
    <ReactUIKitView
      onLoad={(cr) => {
        const router = new UKRouter();
        router.setBasePath("/app/a/photos");

        router.addRoute("/", () => new Text().setText("Hello World from /!"));
        router.addRoute("/test", () => new Text().setText("Hello World from test!"));
        router.addRoute("/test/:hello/world/", () => new Text().setText(`Hello World! ${router.params}`));
        cr.addChild(router);

        router.reloadRoutes();
      }}
    />
  );
};

export default PhotosRouter;
