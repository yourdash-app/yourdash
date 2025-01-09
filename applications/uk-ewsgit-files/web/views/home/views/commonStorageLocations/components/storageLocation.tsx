/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKIcon from "@yourdash/uikit/src/components/icon/UKIcon.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import React from "react";
import { useNavigateTo } from "../../../../../meta.yourdash.ts";
import styles from "./storageLocation.module.scss";

const StorageLocation: React.FC<{ path: string; baseName: string }> = ({ path, baseName }) => {
  const navigateTo = useNavigateTo();

  return (
    <UKCard
      containerClassName={styles.componentCardContainer}
      className={styles.component}
      onClick={() => {
        // TODO: navigate to the correct path
        navigateTo(path);
      }}
    >
      <UKIcon
        icon={"FileDirectory"}
        className={styles.icon}
      />
      <UKText text={baseName} />
    </UKCard>
  );
};

export default StorageLocation;
