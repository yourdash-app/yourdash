/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Heading from "@yourdash/uikit/components/heading/heading";
import Text from "@yourdash/uikit/components/text/text";
import React from "react";
import { IHomeCommonStorageLocation, IHomeConnection } from "../../../../../shared/types/tabView/home";
import styles from "./commonStorageLocations.module.scss";
import StorageLocation from "./components/storageLocation";

const CommonStorageLocations: React.FC<{ commonStorageLocations: IHomeCommonStorageLocation[] }> = ({ commonStorageLocations }) => {
  return (
    <div className={styles.component}>
      <Heading
        level={3}
        text={"Common Storage Locations"}
      />
      <div className={styles.connectionContainer}>
        {commonStorageLocations.length > 0 ? (
          commonStorageLocations.map((connection: IHomeCommonStorageLocation) => (
            <StorageLocation
              key={connection.path}
              {...connection}
            />
          ))
        ) : (
          <Text text={"You have no common storage locations..."} />
        )}
      </div>
    </div>
  );
};

export default CommonStorageLocations;
