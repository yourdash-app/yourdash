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
  return (
    <>
      <div className={styles.applicationFrame}>
        <div className={styles.applicationView}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
