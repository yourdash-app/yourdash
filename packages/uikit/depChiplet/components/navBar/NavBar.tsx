/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import Card from "../card/Card";
import Heading from "../heading/Heading";
import UserProfileDropdown from "./components/userProfileDropdown/UserProfileDropdown";
import styles from "./NavBar.module.scss";

export interface NavBarProps {
  title: string;
  subtitle?: string;
  iconUrl?: string;
  onBrandingClick?: () => void;
  extras?: React.ReactNode;
  showUserProfileDropdown?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  subtitle,
  iconUrl,
  onBrandingClick,
  extras,
  showUserProfileDropdown,
}) => {
  return (
    <Card className={styles.component} showBorder>
      <div className={styles.left}>
        {iconUrl && <img className={styles.icon} src={iconUrl} alt={""} onClick={onBrandingClick} />}
        {title && (
          <Heading level={2} className={styles.title}>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Heading level={2} className={styles.subtitle}>
            / {subtitle}
          </Heading>
        )}
      </div>
      <div className={styles.extras}>{extras}</div>
      {showUserProfileDropdown && <UserProfileDropdown />}
    </Card>
  );
};

export default NavBar;
