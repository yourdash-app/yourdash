/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Card, Heading } from "../../index";
import UserProfileDropdown from "./components/userProfileDropdown/UserProfileDropdown";
import styles from "./NavBar.module.scss";

export interface NavBarProps {
  title: string;
  iconUrl?: string;
  onBrandingClick?: () => void;
  extras?: React.ReactNode;
  showUserProfileDropdown?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ title, iconUrl, onBrandingClick, extras, showUserProfileDropdown }) => {
  return (
    <Card className={styles.component} showBorder>
      <div className={styles.left}>
        {iconUrl && <img className={styles.icon} src={iconUrl} alt={""} onClick={onBrandingClick} />}
        {title && <Heading level={2}>{title}</Heading>}
      </div>
      <div className={styles.extras}>{extras}</div>
      {showUserProfileDropdown && <UserProfileDropdown />}
    </Card>
  );
};

export default NavBar;
