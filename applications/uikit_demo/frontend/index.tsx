/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/uikit/components/button.js";
import Card from "@yourdash/uikit/components/card.js";
import Image from "@yourdash/uikit/components/image";
import Text from "@yourdash/uikit/components/text.js";
import ReactUIKitView from "@yourdash/uikit/core/ReactUIKitView.js";
import * as React from "react";

const UIKitDemoApplication: React.FC = () => {
  return (
    <>
      <title>YourDash | UIKit Demo</title>
      <ReactUIKitView
        onLoad={(root) => {
          const card = new Card();
          root.addChild(card);
          card.addChild(
            new Button().setText("Hello World!").onClick(() => {
              console.log("button clicked");
            }),
          );
          card
            .addChild(new Card().addChild(new Button().setText("Hello world")))
            .addChild(
              new Button().setText("Hello World!").onClick(() => {
                console.log("button clicked");
              }),
            )
            .addChild(
              new Card().addChild(
                new Button().setText("Hello World!").onClick(() => {
                  console.log("button clicked");
                }),
              ),
            )
            .addChild(
              new Card().addChild(
                new Card().addChild(
                  new Button().setText("Hello World!").onClick(() => {
                    console.log("button clicked");
                  }),
                ),
              ),
            )
            .addChild(new Text().setText("Hello World!"))
            .addChild(new Text().setText("Hello World!"))
            .addChild(new Text().setText("Hello World!"))
            .addChild(new Image().setSrc("https://picsum.photos/768/256"));

          root.addChild(new Text().setText("Hello World!"));
        }}
      />
    </>
  );
};

export default UIKitDemoApplication;
