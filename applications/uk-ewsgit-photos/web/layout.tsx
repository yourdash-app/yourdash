/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import { FC } from "react";
import { Outlet } from "react-router";
import styles from "./layout.module.scss";
import { useNavigateTo } from "./meta.yourdash";

const Layout: FC = () => {
  const navigateTo = useNavigateTo();

  return (
    <>
      <div className={styles.applicationFrame}>
        <div className={styles.applicationView}>
          <Outlet />
        </div>
        <Box className={styles.navigation}>
          <IconButton
            accessibleLabel={"Home"}
            icon={UKIcon.Home}
            onClick={() => {
              navigateTo(`/`);
            }}
          />
          <IconButton
            accessibleLabel={"Search"}
            icon={UKIcon.Search}
            onClick={() => {
              navigateTo(`/search/`);
            }}
          />
          <IconButton
            accessibleLabel={"Profile"}
            icon={UKIcon.Person}
            onClick={() => {
              navigateTo(`/profile/`);
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default Layout;
