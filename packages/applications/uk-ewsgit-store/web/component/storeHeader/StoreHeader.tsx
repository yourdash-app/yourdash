/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import TextInput from "@yourdash/chiplet/components/textInput/TextInput";
import React from "react";
import { useNavigate } from "react-router-dom";
import STORE_APPLICATION_LOGO from "../../../icon.avif";
import styles from "./StoreHeader.module.scss";

const StoreHeader: React.FC<{ showBackButton?: number }> = ({ showBackButton }) => {
  const navigate = useNavigate();

  return (
    <Card
      showBorder
      className={styles.component}
    >
      {showBackButton && (
        <IconButton
          icon={UKIcons.ChevronLeft}
          onClick={() => {
            let navigatePath = "";
            for (let i = 0; i < showBackButton; i++) {
              navigatePath += "../";
            }
            navigate(navigatePath);
          }}
        />
      )}
      <img
        alt={"YourDash Store Application Logo"}
        className={styles.applicationLogo}
        src={STORE_APPLICATION_LOGO}
      />
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
          icon={UKIcons.Search}
        />
        <IconButton
          icon={UKIcons.Database}
          onClick={() => {
            console.log("Implement me!");
          }}
        />
        <IconButton
          icon={UKIcons.Download}
          onClick={() => {
            console.log("Implement me!");
          }}
        />
      </div>
    </Card>
  );
};

export default StoreHeader;
