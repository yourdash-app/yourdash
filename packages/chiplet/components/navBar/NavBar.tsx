/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useRef, useState } from "react";
import Card from "../card/Card";
import Heading from "../heading/Heading";
import Icon from "../icon/Icon";
import { UKIcon } from "../icon/iconDictionary";
import IconButton from "../iconButton/IconButton";
import UserProfileDropdown from "./components/userProfileDropdown/UserProfileDropdown";
import styles from "./NavBar.module.scss";

export interface NavBarProps {
  title: string;
  subtitle?: string;
  iconUrl?: string;
  onBrandingClick?: () => void;
  extras?: React.ReactNode;
  showUserProfileDropdown?: boolean;
  showBackButton?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ title, subtitle, iconUrl, onBrandingClick, extras, showUserProfileDropdown, showBackButton }) => {
  const [titleWidth, setTitleWidth] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setTitleWidth(ref.current.getBoundingClientRect().width);
    }
  }, [!ref.current]);

  return (
    <Card className={styles.component} showBorder>
      <div
        className={styles.left}
        style={{
          // @ts-ignore
          "--title-width": `${titleWidth}px`,
        }}
      >
        {showBackButton && (
          <IconButton
            icon={UKIcon.ChevronLeft}
            onClick={() => {
              window.history.back();
            }}
          />
        )}
        {iconUrl && <img className={styles.icon} src={iconUrl} alt={""} onClick={onBrandingClick} />}
        {title && (
          <span ref={ref} className={styles.title}>
            <Heading level={2}>{title}</Heading>
          </span>
        )}
        {subtitle && (
          <Heading level={2} className={styles.subtitle}>
            <span className={styles.subtitleSlash}>/</span>
            {subtitle}
          </Heading>
        )}
      </div>
      <div className={styles.extras}>{extras}</div>
      {showUserProfileDropdown && <UserProfileDropdown />}
    </Card>
  );
};

export default NavBar;
