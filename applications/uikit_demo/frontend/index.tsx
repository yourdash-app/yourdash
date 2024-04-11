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
          const router = root.addChild(UKRouter, {});
          const card = root.addChild(Card, {});

          card.addChild(Icon, { icon: UKIcon.Accessibility }).setSize("2.5rem");

          root.addChild(Text, {}).setText("Hello World!");
          root.addChild(Image, {}).setSrc("https://picsum.photos/768/256");

          root.addChild(Text, { text: "Hello World!" });

          root.addChild(Card, {});
          root.addChild(Icon, { icon: UKIcon.Accessibility }).setSize("2.5rem");
          root.addChild(Flex, {}).$((c) => {
            c.addChild(IconButton, { icon: UKIcon.Beaker });
            c.addChild(IconButton, { icon: UKIcon.Beaker });
            c.addChild(Button, {
              text: "Hello World!",
              onClick: () => {
                console.log("button clicked");
              },
            });
            c.addChild(IconButton, {
              icon: UKIcon.ChevronLeft,
              onClick: () => {
                router.navigate("/app/a/uikit_demo");
              },
            });
            c.addChild(IconButton, {
              icon: UKIcon.ChevronRight,
              onClick: () => {
                router.navigate("/app/a/uikit_demo/test");
              },
            });
            c.addChild(TextInput, {}).$((c) => {
              c.icon.setIcon(UKIcon.ChevronRight);
              c.onChange(() => {
                return 0;
              });
            });
            c.addChild(IconButton, {
              icon: UKIcon.ServerError,
              onClick: () => {
                // @ts-ignore
                window.__uikit__.uikit._debug_getBreakInTreeContextPropagation();
              },
            });
          });

          router.addRoute(
            router.createRoute({ path: "/app/a/uikit_demo" }).addRoute(
              router.createRoute({
                path: "test",
                component: () => {
                  return { component: Text, props: { text: "Hello World from /test!" } };
                },
              }),
            ),
          );

          setTimeout(() => {
            // @ts-ignore
            window.__uikit__.uikit._debug_getBreakInTreeContextPropagation();
          }, 1000);
        }}
      />
    </>
  );
};

export default UIKitDemoApplication;
