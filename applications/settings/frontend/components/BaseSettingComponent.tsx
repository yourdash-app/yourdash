/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import * as React from "react";
import styles from "./BaseSettingComponent.module.scss";

export interface IBaseSettingComponent {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: UKIcon;
  onClick?: () => void;
}

const BaseSettingComponent: React.FC<IBaseSettingComponent> = ({ children, title, description, icon, onClick }) => (
  <Card onClick={onClick} className={styles.component}>
    <Icon className={"aspect-square h-10"} icon={icon} />
    <div className={styles.textContainer}>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.description}>{description}</span>
    </div>
    {children}
  </Card>
);

export default BaseSettingComponent;
