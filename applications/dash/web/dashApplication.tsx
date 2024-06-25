/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import useResource from "@yourdash/csi/useResource";
import Flex from "@yourdash/uikit/components/flex/flex";
import Heading from "@yourdash/uikit/components/heading/heading";
import React, { useState } from "react";
import styles from "./dashApplication.module.scss";
import { IWidgetGrid } from "../shared/types/widgetGrid";

const DashApplication: React.FC = () => {
  const username = useResource(() => csi.getUser().getFullName());
  const [currentWidgetPage, setCurrentWidgetPage] = useState<number>(0);
  const widgetPages: IWidgetGrid[] = [
    {
      widgets: [
        {
          position: {
            x: 0,
            y: 0,
          },
          id: "url-shortcut",
          size: {
            preferred: {
              width: 2,
              height: 2,
            },
            min: {
              width: 1,
              height: 1,
            },
            max: {
              width: 2,
              height: 3,
            },
          },
          extraData: {},
        },
        {
          position: {
            x: 2,
            y: 0,
          },
          id: "url-shortcut",
          size: {
            preferred: {
              width: 2,
              height: 2,
            },
            min: {
              width: 1,
              height: 1,
            },
            max: {
              width: 2,
              height: 3,
            },
          },
          extraData: {},
        },
        {
          position: {
            x: 0,
            y: 2,
          },
          id: "url-shortcut",
          size: {
            preferred: {
              width: 2,
              height: 2,
            },
            min: {
              width: 1,
              height: 1,
            },
            max: {
              width: 2,
              height: 3,
            },
          },
          extraData: {},
        },
      ],
    },
  ];

  // @ts-ignore
  return (
    <div className={styles.page}>
      <Flex
        className={styles.header}
        direction={"row"}
      >
        <Heading
          text={`Hiya, ${username?.first}`}
          level={1}
        />
      </Flex>
      <div className={styles.widgetGrid}>
        {widgetPages[currentWidgetPage].widgets.map((widget, i) => (
          <div
            key={widget.id + JSON.stringify(widget.position)}
            /*@ts-ignore*/
            style={{ "--position-x": widget.position.x, "--position-y": widget.position.y }}
            className={styles.widgetGridWidget}
          >
            <div>widget contents</div>
            <div>{widget.id}</div>
          </div>
        ))}
      </div>
      <Flex
        className={styles.footer}
        direction={"row"}
      >
        <div>page indicator</div>
        <div className={styles.actions}>actions</div>
      </Flex>
    </div>
  );
};

export default DashApplication;
