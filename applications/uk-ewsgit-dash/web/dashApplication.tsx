/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import useResource from "@yourdash/csi/useResource";
import React, { useState } from "react";
import styles from "./dashApplication.module.scss";
import loadable from "@loadable/component";
import { acsi } from "./meta.yourdash";
import clippy from "@yourdash/shared/web/helpers/clippy";
import EditWidgets from "./views/editWidgets/editWidgets.tsx";

const DashApplication: React.FC = () => {
  const { pageCount } = useResource(() => acsi.getJson("/widget/pages", "/widget/pages")) || {
    pageCount: 0,
  };
  const [currentWidgetPage, setCurrentWidgetPage] = useState<number>(0);
  const widgetPage = useResource(() => acsi.getJson(`/widgets/:page`, `/widgets/${currentWidgetPage.toString()}`), [currentWidgetPage]) || {
    widgets: [],
  };
  const [isWidgetEditMode, setIsWidgetEditMode] = useState(false);
  const [tallHeader, setTallHeader] = useState(false);

  return (
    <div className={styles.page}>
      <UKFlex
        className={clippy(styles.header, tallHeader && styles.tallHeader, isWidgetEditMode && styles.headerEditMode)}
        direction={"row"}
      >
        <UKHeading
          text={`Hiya, ${coreCSI.userDB.get<{ first: string; last: string }>("user:name")?.first}`}
          level={1}
        />
        {isWidgetEditMode && (
          <>
            <UKFlex
              direction="row"
              className={styles.headerActions}
            >
              {tallHeader ? (
                <UKButtonWithIcon
                  text="Use small header"
                  icon={UKIcons.SidebarCollapse}
                  onClick={() => {
                    setTallHeader(false);
                  }}
                />
              ) : (
                <UKButtonWithIcon
                  text="Use tall header"
                  icon={UKIcons.SidebarExpand}
                  onClick={() => {
                    setTallHeader(true);
                  }}
                />
              )}
            </UKFlex>
          </>
        )}
      </UKFlex>
      {isWidgetEditMode ? (
        <EditWidgets />
      ) : (
        <div className={styles.widgetGrid}>
          {widgetPage.widgets.map((widget) => {
            const Widget = loadable(() => import(`./widgets/${widget.widgetType}/widget.tsx`));

            return (
              <div
                key={widget.widgetType + JSON.stringify(widget.position)}
                /*@ts-ignore*/
                style={{ "--position-x": widget.position.x, "--position-y": widget.position.y }}
                className={styles.widgetGridWidget}
              >
                <Widget data={widget.data} />
              </div>
            );
          })}
        </div>
      )}
      <UKFlex
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
          {isWidgetEditMode ? (
            <>
              <UKButtonWithIcon
                text={"Confirm edits"}
                icon={UKIcons.Check}
                onClick={() => {
                  setIsWidgetEditMode(false);
                }}
              />
            </>
          ) : (
            <>
              <UKButtonWithIcon
                text={"Edit"}
                icon={UKIcons.Pencil}
                onClick={() => {
                  setIsWidgetEditMode(true);
                }}
              />
            </>
          )}
        </div>
      </UKFlex>
    </div>
  );
};
export default DashApplication;
