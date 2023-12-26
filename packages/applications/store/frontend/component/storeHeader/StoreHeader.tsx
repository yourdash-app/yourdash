/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Card, IconButton, TextInput, YourDashIcon } from "web-client/src/ui/index";
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
      <span className={styles.productName}>YourDash Store</span>
    </div>
    <div className={styles.actions}>
      <TextInput
        onChange={value => {
          return value
        }}
        placeholder={ "Search Applications" }
        className={styles.searchInput}
        icon={ YourDashIcon.Search }
      />
      <IconButton
        icon={YourDashIcon.Database}
        onClick={() => {
          console.log( "Implement me!" )
        }}
      />
      <IconButton
        icon={YourDashIcon.Download}
        onClick={() => {
          console.log( "Implement me!" )
        }}
      />
    </div>
  </Card>
}

export default StoreHeader;
