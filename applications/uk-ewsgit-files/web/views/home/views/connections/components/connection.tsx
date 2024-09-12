/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Card from "@yourdash/uikit/components/card/card";
import Heading from "@yourdash/uikit/components/heading/heading";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import Image from "@yourdash/uikit/components/image/image";
import ProgressBar from "@yourdash/uikit/components/progressBar/progressBar";
import Text from "@yourdash/uikit/components/text/text";
import React from "react";
import { IHomeConnection } from "../../../../../../shared/types/tabView/home";
import styles from "./connection.module.scss";

const Connection: React.FC<IHomeConnection> = ({ description, quota, url, serviceLogo, serviceName }) => {
  return (
    <Card className={styles.component}>
      <Image
        className={styles.icon}
        accessibleLabel={""}
        src={serviceLogo || "/assets/productLogos/yourdash.svg"}
      />
      <Heading text={serviceName} />
      {description && <Text text={description} />}
      {quota && (
        <ProgressBar
          maxValue={quota.max}
          value={quota.usage}
        />
      )}
      {url && (
        <IconButton
          accessibleLabel={"Open service url"}
          icon={UKIcon.LinkExternal}
          onClick={() => {
            window.open(url, "_blank");
          }}
        />
      )}
    </Card>
  );
};

export default Connection;
