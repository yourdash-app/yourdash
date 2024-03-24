/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ReactUIKitView from "@yourdash/uikit/core/ReactUIKitView.js";
import Div from "@yourdash/uikit/html/div";
import Main from "@yourdash/uikit/html/main.js";
import * as React from "react";

const UIKitDemoApplication: React.FC = () => {
  return (
    <>
      <ReactUIKitView
        onLoad={(root) => {
          const div = new Div();
          root.addChild(div);

          div.setStyle("backgroundColor", "red");
          div.setStyle("width", "10rem");
          div.setStyle("height", "10rem");
          div.addClass("test");

          div.addChild(new Main().setInnerText("Hello World!"));

          div.render();

          return root;
        }}
      />
    </>
  );
};

export default UIKitDemoApplication;
