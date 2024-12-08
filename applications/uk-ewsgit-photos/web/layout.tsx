/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import NavImage from "@yourdash/uikit/src/views/navBar/components/navImage/navImage.tsx";
import NavTitle from "@yourdash/uikit/src/views/navBar/components/navTitle/navTitle.tsx";
import NavBar from "@yourdash/uikit/src/views/navBar/navBar.tsx";
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
