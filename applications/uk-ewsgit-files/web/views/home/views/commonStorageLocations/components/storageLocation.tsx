/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import { useNavigateTo } from "../../../../../meta.yourdash.ts";
import styles from "./storageLocation.module.scss";
import { Components } from "@yourdash/uikit";

const StorageLocation: React.FC<{ path: string; baseName: string }> = ({ path, baseName }) => {
  const navigateTo = useNavigateTo();

  return (
    <Components.Card
      containerClassName={styles.componentCardContainer}
      className={styles.component}
      onClick={() => {
        // TODO: navigate to the correct path
        navigateTo(path);
      }}
    >
      <Components.Icon
        icon={"FileDirectory"}
        className={styles.icon}
      />
      <Components.Text text={baseName} />
    </Components.Card>
  );
};

export default StorageLocation;
