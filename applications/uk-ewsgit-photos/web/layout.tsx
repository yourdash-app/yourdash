/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./layout.module.scss";

const Layout: FC = () => {
  const navigate = useNavigate();

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
              navigate("/app/a/uk-ewsgit-photos-frontend/");
            }}
          />
          <IconButton
            accessibleLabel={"Search"}
            icon={UKIcon.Search}
            onClick={() => {
              navigate("/app/a/uk-ewsgit-photos-frontend/search/");
            }}
          />
          <IconButton
            accessibleLabel={"Profile"}
            icon={UKIcon.Person}
            onClick={() => {
              navigate("/app/a/uk-ewsgit-photos-frontend/profile/");
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default Layout;
