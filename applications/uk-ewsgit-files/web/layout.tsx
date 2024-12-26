import clippy from "@yourdash/shared/web/helpers/clippy";
import React, { useEffect, useState } from "react";
import TabView from "./views/tab/tabView";
import { IFilesView } from "./views/view";
import FILES_VIEW_TYPE from "./views/viewType";
import styles from "./layout.module.scss";
import generateUUID from "@yourdash/shared/web/helpers/uuid";
import UK, { UKC, UKV } from "@yourdash/uikit";

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
    <UKV.SidebarContainer>
      <UKV.Sidebar>
        <UKHeading text={"Files"} />
        <UKSeparator direction={"column"} />
        {commonStorageLocations.map((storageLocation) => {
          return (
            <UKButton
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
      </UKV.Sidebar>
      <div className={styles.page}>
        <section className={styles.tabBar}>
          <UKV.SidebarToggleButton />
          {tabs.map((tab) => {
            return (
              <div className={clippy(styles.tab, activeTabId === tab.id && styles.active)}>
                <UKButton
                  className={styles.innerButton}
                  key={tab.id}
                  text={tab.displayName}
                  onClick={() => {
                    setActiveTabId(tab.id);
                  }}
                />
                <UKIconButton
                  onClick={() => {
                    setTabs((tbs) => tbs.filter((t) => t.id !== tab.id));
                  }}
                  accessibleLabel={"close tab"}
                  icon={UKIcons.X}
                  className={styles.tabCloseButton}
                />
              </div>
            );
          })}
          <UKIconButton
            icon={UKIcons.Plus}
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
          <UKFlex
            centerHorizontally
            centerVertically
            direction={"column"}
          >
            <UKCard>
              <UKFlex
                direction={"column"}
                centerHorizontally
                centerVertically
              >
                <UKHeading text={"You have no tabs!"} />
                <UKSeparator direction={"column"} />
                <UKText text={"Create a new tab by clicking the button below."} />
                <UKButton
                  onClick={() => {
                    setTabs([homeTab()]);
                  }}
                  text={"Create new tab"}
                />
              </UKFlex>
            </UKCard>
          </UKFlex>
        )}
      </div>
    </UKV.SidebarContainer>
  );
};

export default ApplicationLayout;
