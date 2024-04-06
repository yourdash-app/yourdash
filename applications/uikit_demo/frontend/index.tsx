/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary.js";
import Button from "@yourdash/uikit/components/button/button.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Flex from "@yourdash/uikit/components/flex/flex.js";
import Icon from "@yourdash/uikit/components/icon/icon.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import Image from "@yourdash/uikit/components/image/image.js";
import Text from "@yourdash/uikit/components/text/text.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import ReactUIKitView from "@yourdash/uikit/core/ReactUIKitView.js";
import UKRouter from "@yourdash/uikit/core/router/router.js";
import * as React from "react";

const UIKitDemoApplication: React.FC = () => {
  return (
    <>
      <title>YourDash | UIKit Demo</title>
      <ReactUIKitView
        onLoad={(root) => {
          const card = new Card();

          card.addChild(new Icon().setIcon(UKIcon.Accessibility).setSize("2.5rem"));

          root.addChild(card).addChild(new Text().setText("Hello World!")).addChild(new Image().setSrc("https://picsum.photos/768/256"));

          root.addChild(new Text().setText("Hello World!"));

          root.addChild(
            new Card().addChild(new Icon().setIcon(UKIcon.Accessibility).setSize("2.5rem")).addChild(
              new Flex()
                .addChild(
                  new IconButton().$((c) => {
                    c.icon.setIcon(UKIcon.Beaker);
                  }),
                )
                .addChild(
                  new IconButton().$((c) => {
                    c.icon.setIcon(UKIcon.Beaker);
                  }),
                )
                .addChild(
                  new Button().setText("Hello World!").onClick(() => {
                    console.log("button clicked");
                  }),
                )
                .addChild(
                  new IconButton().$((c) => {
                    c.icon.setIcon(UKIcon.ChevronLeft);
                    c.onClick(() => {
                      window.location.hash = "#/app/a/uikit_demo";
                    });
                  }),
                )
                .addChild(
                  new IconButton().$((c) => {
                    c.icon.setIcon(UKIcon.ChevronRight);
                    c.onClick(() => {
                      window.location.hash = "#/app/a/uikit_demo/test";
                    });
                  }),
                )
                .addChild(
                  new TextInput().$((c) => {
                    c.icon.setIcon(UKIcon.ChevronRight);
                    c.onChange(() => {
                      window.location.hash = "#/app/a/uikit_demo/test";
                    });
                  }),
                ),
            ),
          );

          root.addChild(new UKRouter().setBasePath("/app/a/uikit_demo").addRoute("/test", new Text().setText("Hello World from /test!")));
        }}
      />
    </>
  );
};

export default UIKitDemoApplication;
