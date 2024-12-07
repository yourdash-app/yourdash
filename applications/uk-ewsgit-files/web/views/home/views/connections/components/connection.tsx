/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import styles from "./connection.module.scss";
import { Components, Core } from "@yourdash/uikit";

const Connection: React.FC<{
  description: string;
  quota: { usage: number; max: number };
  url: string;
  serviceLogo: string;
  serviceName: string;
}> = ({ description, quota, url, serviceLogo, serviceName }) => {
  return (
    <Components.Card
      className={styles.component}
      actions={
        <>
          {url && (
            <Components.IconButton
              accessibleLabel={"Open service url"}
              icon={Core.Icons.LinkExternal}
              onClick={() => {
                window.open(url, "_blank");
              }}
            />
          )}
        </>
      }
    >
      <Components.Image
        className={styles.icon}
        accessibleLabel={""}
        src={serviceLogo || "/assets/productLogos/yourdash.svg"}
      />
      <Components.Heading text={serviceName} />
      {description && <Components.Text text={description} />}
      {quota && (
        <Components.ProgressBar
          maxValue={quota.max}
          value={quota.usage}
        />
      )}
    </Components.Card>
  );
};

export default Connection;
