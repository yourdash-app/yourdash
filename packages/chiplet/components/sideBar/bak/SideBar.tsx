/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { CSSProperties, useState } from "react";
import styles from "./SideBar.module.scss";
import IconButton from "../../iconButton/IconButton";
import { UKIcon } from "../../icon/iconDictionary";
import Icon from "../../icon/Icon";

export interface ISideBarProps {
  title: string;
  items: {
    label: string;
    icon: UKIcon;
    onClick: () => void;
  }[];
  expandedByDefault?: boolean;
  headerContent?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const SideBar: React.FC<ISideBarProps> = ({ items, title, expandedByDefault, headerContent, style, className }) => {
  const [expanded, setExpanded] = useState(expandedByDefault || false);
  return (
    <div className={`${styles.component} ${className}`} data-expanded={expanded} style={style}>
      <IconButton className={styles.toggleButton} icon={UKIcon.ThreeBars} onClick={() => setExpanded(!expanded)} />
      <header className={styles.header}>
        <section className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </section>
        {headerContent}
      </header>
      <section className={styles.items}>
        {items.map((item) => (
          <button className={styles.item} type="button" key={item.label} onClick={item.onClick}>
            <Icon className={styles.itemIcon} icon={item.icon} />
            <div className={styles.itemLabel} data-expanded={expanded}>
              {item.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );
};

export default SideBar;
