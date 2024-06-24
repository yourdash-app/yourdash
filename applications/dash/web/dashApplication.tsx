/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import useResource from "@yourdash/csi/useResource";
import Flex from "@yourdash/uikit/components/flex/flex";
import Heading from "@yourdash/uikit/components/heading/heading";
import React from "react";
import styles from "./dashApplication.module.scss"
import { IWidgetGrid } from "../shared/types/widgetGrid"

const DashApplication: React.FC = () => {
  const username = useResource(() => csi.getUser().getFullName());
  const widgetPages: IWidgetGrid[] = []

  return (
    <div className={styles.page}>
      <Flex className={styles.header} direction={"row"}>
        <Heading
          text={`Hiya, ${username?.first}`}
          level={1}
        />
      </Flex>
      <div className={styles.widgetGrid}>grid</div>
      <Flex className={styles.footer} direction={"row"}>
        <div>page indicator</div>
        <div className={styles.actions}>actions</div>
      </Flex>
    </div>
  );
};

export default DashApplication;
