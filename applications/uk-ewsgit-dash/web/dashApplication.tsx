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
import UK, { UKC } from "@yourdash/uikit";

const DashApplication: React.FC = () => {
  const { pageCount } = useResource(() => acsi.getJson("/widget/pages")) || {
    pageCount: 0,
  };
  const [currentWidgetPage, setCurrentWidgetPage] = useState<number>(0);
  const widgetPage = useResource(() => acsi.getJson(`/widgets/:page`, { page: currentWidgetPage.toString() }), [currentWidgetPage]) || {
    widgets: [],
  };
  const [isWidgetEditMode, setIsWidgetEditMode] = useState(false);
  const [tallHeader, setTallHeader] = useState(false);

  return (
    <div className={styles.page}>
      <UKC.Flex
        className={clippy(styles.header, tallHeader && styles.tallHeader, isWidgetEditMode && styles.headerEditMode)}
        direction={"row"}
      >
        <UKC.Heading
          text={`Hiya, ${coreCSI.userDB.get<{ first: string; last: string }>("user:name")?.first}`}
          level={1}
        />
        {isWidgetEditMode && (
          <>
            <UKC.Flex
              direction="row"
              className={styles.headerActions}
            >
              {tallHeader ? (
                <UKC.ButtonWithIcon
                  text="Use small header"
                  icon={UK.Core.Icons.SidebarCollapse}
                  onClick={() => {
                    setTallHeader(false);
                  }}
                />
              ) : (
                <UKC.ButtonWithIcon
                  text="Use tall header"
                  icon={UK.Core.Icons.SidebarExpand}
                  onClick={() => {
                    setTallHeader(true);
                  }}
                />
              )}
            </UKC.Flex>
          </>
        )}
      </UKC.Flex>
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
      <UKC.Flex
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
              <UKC.ButtonWithIcon
                text={"Confirm edits"}
                icon={UK.Core.Icons.Check}
                onClick={() => {
                  setIsWidgetEditMode(false);
                }}
              />
            </>
          ) : (
            <>
              <UKC.ButtonWithIcon
                text={"Edit"}
                icon={UK.Core.Icons.Pencil}
                onClick={() => {
                  setIsWidgetEditMode(true);
                }}
              />
            </>
          )}
        </div>
      </UKC.Flex>
    </div>
  );
};
export default DashApplication;
