/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import React from "react";
import Connection from "./components/connection";
import styles from "./connections.module.scss";

const Connections: React.FC<{
  connections: {
    description: string;
    quota: { usage: number; max: number };
    url: string;
    serviceLogo: string;
    serviceName: string;
    id: string;
  }[];
}> = ({ connections }) => {
  return (
    <div className={styles.component}>
      <UKHeading text={"Connections"} />
      <div className={styles.connectionContainer}>
        {connections.length > 0 ? (
          connections.map((connection) => (
            <Connection
              key={connection.id}
              {...connection}
            />
          ))
        ) : (
          <UKText text={"You have no connections..."} />
        )}
      </div>
    </div>
  );
};

export default Connections;
