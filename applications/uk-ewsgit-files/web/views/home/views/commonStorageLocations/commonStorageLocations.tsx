/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import styles from "./commonStorageLocations.module.scss";
import StorageLocation from "./components/storageLocation";
import UK from "@yourdash/uikit";

const CommonStorageLocations: React.FC<{ commonStorageLocations: { path: string }[] }> = ({ commonStorageLocations }) => {
  return (
    <div className={styles.component}>
      <UK.Components.Heading
        level={3}
        text={"Common Storage Locations"}
      />
      <div className={styles.connectionContainer}>
        {commonStorageLocations.length > 0 ? (
          commonStorageLocations.map((connection) => (
            <StorageLocation
              key={connection.path}
              {...connection}
            />
          ))
        ) : (
          <UK.Components.Text text={"You have no common storage locations..."} />
        )}
      </div>
    </div>
  );
};

export default CommonStorageLocations;
