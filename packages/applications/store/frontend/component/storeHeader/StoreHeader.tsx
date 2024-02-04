/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, IconButton, TextInput, YourDashIcon } from "@yourdash/web-client/src/ui/index";
import STORE_APPLICATION_LOGO from "../../../icon.avif";
import styles from "./StoreHeader.module.scss";

const StoreHeader: React.FC<{ showBackButton?: number }> = ({ showBackButton }) => {
  const navigate = useNavigate();

  return (
    <Card showBorder className={styles.component}>
      {showBackButton && (
        <IconButton
          icon={YourDashIcon.ChevronLeft}
          onClick={() => {
            let navigatePath = "";
            for (let i = 0; i < showBackButton; i++) {
              navigatePath += "../";
            }
            navigate(navigatePath);
          }}
        />
      )}
      <img alt={"YourDash Store Application Logo"} className={styles.applicationLogo} src={STORE_APPLICATION_LOGO} />
      <div className={styles.brand}>
        <span className={styles.productName}>YourDash Store</span>
      </div>
      <div className={styles.actions}>
        <TextInput
          accessibleName={"Search Applications"}
          onChange={(value) => {
            return value;
          }}
          placeholder={"Search Applications"}
          className={styles.searchInput}
          icon={YourDashIcon.Search}
        />
        <IconButton
          icon={YourDashIcon.Database}
          onClick={() => {
            console.log("Implement me!");
          }}
        />
        <IconButton
          icon={YourDashIcon.Download}
          onClick={() => {
            console.log("Implement me!");
          }}
        />
      </div>
    </Card>
  );
};

export default StoreHeader;
