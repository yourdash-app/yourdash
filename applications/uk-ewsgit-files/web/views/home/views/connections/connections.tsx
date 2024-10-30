/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Heading from "@yourdash/uikit/src/components/heading/heading";
import Text from "@yourdash/uikit/src/components/text/text";
import React from "react";
import { IHomeConnection } from "../../../../../shared/types/tabView/home";
import Connection from "./components/connection";
import styles from "./connections.module.scss";

const Connections: React.FC<{ connections: IHomeConnection[] }> = ({ connections }) => {
  return (
    <div className={styles.component}>
      <Heading text={"Connections"} />
      <div className={styles.connectionContainer}>
        {connections.length > 0 ? (
          connections.map((connection: IHomeConnection) => (
            <Connection
              key={connection.id}
              {...connection}
            />
          ))
        ) : (
          <Text text={"You have no connections..."} />
        )}
      </div>
    </div>
  );
};

export default Connections;
