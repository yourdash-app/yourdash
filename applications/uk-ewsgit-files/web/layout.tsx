import React, { useState } from "react";
import Button from "@yourdash/uikit/components/button/button";
import FILES_VIEW_TYPE from "./views/viewType";
import styles from "./layout.module.scss";
import generateUUID from "@yourdash/shared/web/helpers/uuid";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";

export interface IFilesTab {
  id: string;
  path: string | undefined;
  view: { type: FILES_VIEW_TYPE; options: { zoom: number } };
  displayName: string;
}

const homeTab = () => {
  return { id: generateUUID(), path: undefined, view: { type: FILES_VIEW_TYPE.HOME, options: { zoom: 1 } }, displayName: "Home" };
};

const ApplicationLayout: React.FC = () => {
  const [tabs, setTabs] = useState<IFilesTab[]>([homeTab()]);
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined);

  return (
    <div>
      <section className={styles.tabBar}>
        {tabs.map((tab) => {
          return (
            <Button
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
      <section className={styles.tabViewContainer}>Hello world, place TabView here activeTabId: {activeTabId}</section>
    </div>
  );
};

export default ApplicationLayout;
