/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import styles from "./TabsContainer.module.scss";

export interface ITab {
  displayName: string;
  content: React.ReactNode | React.ReactNode[];
  closable?: boolean;
}

interface ITabsContainerProps {
  tabs: ITab[];
}

const TabsContainer: React.FC<ITabsContainerProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
  const firstTabRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndicatorWidth(((firstTabRef.current?.clientWidth || 0) / 8) * 6);
    setIndicatorPosition(
      (firstTabRef.current?.offsetLeft || 0) +
        (firstTabRef.current?.clientWidth || 0) / 8,
    );
  }, []);

  return (
    <div className={styles.component}>
      <section className={styles.tabsContainer}>
        <div
          className={styles.activeTabIndicator}
          style={{
            width: indicatorWidth,
            transform: `translateX(${indicatorPosition}px)`,
          }}
        ></div>
        {tabs.map((tab, index) => {
          return (
            <>
              {index !== 0 && (
                <div className={styles.tabSeparator}>
                  <div className={styles.sepatator} />
                </div>
              )}
              <div
                ref={index === 0 ? firstTabRef : null}
                className={`${styles.tab} ${
                  activeTab === index ? styles.active : ""
                }`}
                key={tab.displayName}
                onClick={(e) => {
                  setActiveTab(index);
                  if (e.currentTarget) {
                    setIndicatorWidth((e.currentTarget.clientWidth / 8) * 6);
                    setIndicatorPosition(
                      e.currentTarget.offsetLeft +
                        e.currentTarget.clientWidth / 8,
                    );
                  }
                }}
              >
                {tab.displayName}
              </div>
            </>
          );
        })}
      </section>
      <section className={styles.componentContent}>
        {tabs[activeTab].content}
      </section>
    </div>
  );
};
export default TabsContainer;
