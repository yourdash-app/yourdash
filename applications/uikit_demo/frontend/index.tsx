/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ReactUIKitView from "@yourdash/uikit/core/ReactUIKitView.js";
import Div from "@yourdash/uikit/html/div";
import * as React from "react";
import Text from "@yourdash/uikit/components/text.js";

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

          root.addChild(new Text().setText("Hello World!"));
        }}
      />
    </>
  );
};

export default UIKitDemoApplication;
