import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/uikit/src/components/card/card.tsx";
import Flex from "@yourdash/uikit/src/components/flex/flex.tsx";
import Heading from "@yourdash/uikit/src/components/heading/heading";
import Separator from "@yourdash/uikit/src/components/separator/separator.tsx";
import Text from "@yourdash/uikit/src/components/text/text.tsx";
import Sidebar from "@yourdash/uikit/src/views/sidebar/Sidebar";
import SidebarContainer from "@yourdash/uikit/src/views/sidebar/SidebarContainer";
import SidebarToggleButton from "@yourdash/uikit/src/views/sidebar/SidebarToggleButton";
import React, { useEffect, useState } from "react";
import Button from "@yourdash/uikit/src/components/button/button";
import TabView from "./views/tab/tabView";
import { IFilesView } from "./views/view";
import FILES_VIEW_TYPE from "./views/viewType";
import styles from "./layout.module.scss";
import generateUUID from "@yourdash/shared/web/helpers/uuid";
import IconButton from "@yourdash/uikit/src/components/iconButton/iconButton";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary";

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
  const [commonStorageLocations, setCommonStorageLocations] = useState<{ path: string; displayName: string }[]>([
    { path: "/home/t", displayName: "Home T" },
  ]);

  useEffect(() => {
    if ((activeTabId === undefined && tabs.length > 0) || !tabs.find((t) => t.id === activeTabId)) {
      if (tabs.length > 0) {
        setActiveTabId(tabs[0].id);
      }
    }
  }, [tabs]);

  return (
    <SidebarContainer>
      <Sidebar>
        <Heading text={"Files"} />
        <Separator direction={"column"} />
        {commonStorageLocations.map((storageLocation) => {
          return (
            <Button
              text={storageLocation.path}
              onClick={() => {
                const currentTab = tabs.find((t) => activeTabId === t.id);

                if (!currentTab) return;

                currentTab.path = storageLocation.path;

                setTabs(
                  tabs.map((t) => {
                    if (t.id === currentTab.id) {
                      return currentTab;
                    } else {
                      return t;
                    }
                  }),
                );
              }}
            />
          );
        })}
      </Sidebar>
      <div className={styles.page}>
        <section className={styles.tabBar}>
          <SidebarToggleButton />
          {tabs.map((tab) => {
            return (
              <div className={clippy(styles.tab, activeTabId === tab.id && styles.active)}>
                <Button
                  className={styles.innerButton}
                  key={tab.id}
                  text={tab.displayName}
                  onClick={() => {
                    setActiveTabId(tab.id);
                  }}
                />
                <IconButton
                  onClick={() => {
                    setTabs((tbs) => tbs.filter((t) => t.id !== tab.id));
                  }}
                  accessibleLabel={"close tab"}
                  icon={UKIcon.X}
                  className={styles.tabCloseButton}
                />
              </div>
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
          <Flex
            centerHorizontally
            centerVertically
            direction={"column"}
          >
            <Card>
              <Flex
                direction={"column"}
                centerHorizontally
                centerVertically
              >
                <Heading text={"You have no tabs!"} />
                <Separator direction={"column"} />
                <Text text={"Create a new tab by clicking the button below."} />
                <Button
                  onClick={() => {
                    setTabs([homeTab()]);
                  }}
                  text={"Create new tab"}
                />
              </Flex>
            </Card>
          </Flex>
        )}
      </div>
    </SidebarContainer>
  );
};

export default ApplicationLayout;
