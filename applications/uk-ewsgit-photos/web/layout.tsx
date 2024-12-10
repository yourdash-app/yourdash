/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UK from "@yourdash/uikit";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import { NavBar, NavImage, NavTitle } from "@yourdash/uikit/views/index";
import { FC } from "react";
import { Outlet } from "react-router";
import PHOTOS_LOGO from "../icon.avif";
import styles from "./layout.module.scss";
import { useNavigateTo } from "./meta.yourdash";

const Layout: FC = () => {
  const navigateTo = useNavigateTo();

  return (
    <>
      <div className={styles.applicationFrame}>
        <NavBar
          leftSection={
            <>
              <NavImage src={PHOTOS_LOGO} />
              <NavTitle title={"YourDash Photos"} />
            </>
          }
          rightSection={
            <>
              <IconButton
                accessibleLabel={"Home"}
                icon={UK.Core.Icons.Home}
                onClick={() => {
                  navigateTo(`/`);
                }}
              />
              <IconButton
                accessibleLabel={"Search"}
                icon={UK.Core.Icons.Search}
                onClick={() => {
                  navigateTo(`/search/`);
                }}
              />
              <IconButton
                accessibleLabel={"Profile"}
                icon={UK.Core.Icons.Person}
                onClick={() => {
                  navigateTo(`/profile/`);
                }}
              />
            </>
          }
        />
        <div className={styles.applicationView}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
