/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Card } from "web-client/src/ui/index";
import STORE_APPLICATION_LOGO from "../../../icon.avif";
import styles from "./StoreHeader.module.scss"

const StoreHeader: React.FC = () => {
  return <Card
    showBorder
    className={ styles.component }
  >
    <img
      alt={ "YourDash Store Application Logo" }
      className={ styles.applicationLogo }
      src={ STORE_APPLICATION_LOGO }
    />
    <div className={styles.brand}>
      <span className={styles.yourdash}>YourDash</span>
      <span className={styles.productName}>Store</span>
    </div>
  </Card>
}

export default StoreHeader;
