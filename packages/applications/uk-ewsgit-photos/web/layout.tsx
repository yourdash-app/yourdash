/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import { Outlet } from "react-router";
import styles from "./layout.module.scss";

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
