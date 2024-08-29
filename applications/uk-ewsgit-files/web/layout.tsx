import clippy from "@yourdash/shared/web/helpers/clippy";
import React, { useEffect, useState } from "react";
import Button from "@yourdash/uikit/components/button/button";
import TabView from "./views/tab/tabView";
import { IFilesView } from "./views/view";
import FILES_VIEW_TYPE from "./views/viewType";
import styles from "./layout.module.scss";
import generateUUID from "@yourdash/shared/web/helpers/uuid";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";

export interface IFilesTab {
  id: string;
  path: string | undefined;
  view: IFilesView;
  displayName: string;
}

const homeTab = () => {
  return { id: generateUUID(), path: undefined, view: { type: FILES_VIEW_TYPE.HOME, options: { zoom: 1 } }, displayName: "Home" };
};

const ApplicationLayout: React.FC = () => {
  const [tabs, setTabs] = useState<IFilesTab[]>([homeTab()]);
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if ((activeTabId === undefined && tabs.length > 0) || !tabs.find((t) => t.id === activeTabId)) {
      setActiveTabId(tabs[0].id);
    }
  }, [tabs]);

  return (
    <div className={styles.page}>
      <section className={styles.tabBar}>
        {tabs.map((tab) => {
          return (
            <Button
              className={clippy(styles.tab, activeTabId === tab.id && styles.active)}
              key={tab.id}
              text={tab.displayName}
              onClick={() => {
                setActiveTabId(tab.id);
              }}
            />
          );
        })}
        <IconButton
          icon={UKIcon.Plus}
          onClick={() => {
            setTabs([...tabs, homeTab()]);
          }}
          accessibleLabel="New tab"
        />
      </section>
      {tabs.find((tab) => tab.id === activeTabId)?.view !== undefined ? (
        <section className={styles.tabViewContainer}>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
          <TabView view={tabs.find((tab) => tab.id === activeTabId)?.view!} />
        </section>
      ) : (
        <>UNKNOWN VIEW ERROR</>
      )}
    </div>
  );
};

export default ApplicationLayout;
