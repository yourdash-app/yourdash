/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import React from "react";
import styles from "./commonStorageLocations.module.scss";
import StorageLocation from "./components/storageLocation";

const CommonStorageLocations: React.FC<{ commonStorageLocations: { path: string }[] }> = ({ commonStorageLocations }) => {
  return (
    <div className={styles.component}>
      <UKHeading
        level={3}
        text={"Common Storage Locations"}
      />
      <div className={styles.connectionContainer}>
        {commonStorageLocations.length > 0 ? (
          commonStorageLocations.map((connection) => (
            <StorageLocation
              baseName={"/"}
              key={connection.path}
              {...connection}
            />
          ))
        ) : (
          <UKText text={"You have no common storage locations..."} />
        )}
      </div>
    </div>
  );
};

export default CommonStorageLocations;
