/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Card from "@yourdash/uikit/components/card/card";
import Icon from "@yourdash/uikit/components/icon/icon.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";
import React from "react";
import { IHomeCommonStorageLocation } from "../../../../../../shared/types/tabView/home";
import { useNavigateTo } from "../../../../../meta.yourdash.ts";
import styles from "./storageLocation.module.scss";

const StorageLocation: React.FC<IHomeCommonStorageLocation> = ({ path, baseName }) => {
  const navigateTo = useNavigateTo();

  return (
    <Card
      containerClassName={styles.componentCardContainer}
      className={styles.component}
      onClick={() => {
        // TODO: navigate to the correct path
        navigateTo(path);
      }}
    >
      <Icon
        icon={"FileDirectory"}
        className={styles.icon}
      />
      <Text text={baseName} />
    </Card>
  );
};

export default StorageLocation;
