/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import useResource from "@yourdash/csi/useResource";
import ButtonWithIcon from "@yourdash/uikit/components/buttonWithIcon/buttonWithIcon";
import Flex from "@yourdash/uikit/components/flex/flex";
import Heading from "@yourdash/uikit/components/heading/heading";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";
import React, { useState } from "react";
import styles from "./dashApplication.module.scss";
import { IWidgetGrid } from "../shared/types/widgetGrid";
import loadable from "@loadable/component";

const DashApplication: React.FC = () => {
  const username = useResource(() => coreCSI.getJson<{ first: string; last: string }>("/app/uk-ewsgit-dash/user-full-name")) || {
    first: "Unknown",
    last: "User",
  };
  const { pageCount } = useResource<{ pageCount: number }>(() => coreCSI.getJson("/app/uk-ewsgit-dash/widget/pages")) || {
    pageCount: 0,
  };
  const [currentWidgetPage, setCurrentWidgetPage] = useState<number>(0);
  const widgetPage = useResource<IWidgetGrid>(
    () => coreCSI.getJson(`/app/uk-ewsgit-dash/widgets/${currentWidgetPage}`),
    [currentWidgetPage],
  ) || {
    widgets: [],
  };

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
        {widgetPage.widgets.map((widget) => {
          const Widget = loadable(() => import(`./widgets/${widget.id}/widget.tsx`));

          return (
            <div
              key={widget.id + JSON.stringify(widget.position)}
              /*@ts-ignore*/
              style={{ "--position-x": widget.position.x, "--position-y": widget.position.y }}
              className={styles.widgetGridWidget}
            >
              <Widget data={widget.data} />
            </div>
          );
        })}
      </div>
      <Flex
        className={styles.footer}
        direction={"row"}
      >
        <div>
          {Array(pageCount).map((_, index) => {
            return (
              <div
                key={index}
                className={currentWidgetPage === index ? styles.active : undefined}
                onClick={() => setCurrentWidgetPage(index)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className={styles.actions}>
          <ButtonWithIcon
            text={"Edit Widgets"}
            icon={UKIcon.Pencil}
            onClick={() => {
              console.log("Edit widgets page");
            }}
          />
        </div>
      </Flex>
    </div>
  );
};
export default DashApplication;
