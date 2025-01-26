/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKIconButton from "@yourdash/uikit/src/components/iconButton/UKIconButton.js";
import UKImage from "@yourdash/uikit/src/components/image/UKImage.js";
import UKProgressBar from "@yourdash/uikit/src/components/progressBar/UKProgressBar.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";
import React from "react";
import styles from "./connection.module.scss";

const Connection: React.FC<{
  description: string;
  quota: { usage: number; max: number };
  url: string;
  serviceLogo: string;
  serviceName: string;
}> = ({ description, quota, url, serviceLogo, serviceName }) => {
  return (
    <UKCard
      className={styles.component}
      actions={
        <>
          {url && (
            <UKIconButton
              accessibleLabel={"Open service url"}
              icon={UKIcons.LinkExternal}
              onClick={() => {
                window.open(url, "_blank");
              }}
            />
          )}
        </>
      }
    >
      <UKImage
        className={styles.icon}
        accessibleLabel={""}
        src={serviceLogo || "/assets/productLogos/yourdash.svg"}
      />
      <UKHeading text={serviceName} />
      {description && <UKText text={description} />}
      {quota && (
        <UKProgressBar
          maxValue={quota.max}
          value={quota.usage}
        />
      )}
    </UKCard>
  );
};

export default Connection;
