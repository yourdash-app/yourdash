/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Card from "@yourdash/uikit/components/card/card";
import React from "react";
import styles from "./widget.module.scss";

const Widget: React.FC = () => {
  return (
    <Card className={styles.widget}>
      <img
        src={"/assets/productLogos/yourdash.svg"}
        alt={""}
      />
    </Card>
  );
};

export default Widget;
