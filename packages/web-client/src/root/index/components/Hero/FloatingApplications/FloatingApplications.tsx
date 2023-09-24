/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "../../../../../helpers/clippy";
import FloatingApplication from "./FloatingApplication";
import styles from "./FloatingApplications.module.scss"

const IndexPageHeroApplications: React.FC = () => {
  return <div className={ clippy( "relative md:flex hidden", styles.container ) }>
    <FloatingApplication
      src={"/assets/promo-apps/files.png"}
      position={0}
    />
    <FloatingApplication
      src={"/assets/promo-apps/organization.png"}
      position={1}
    />
    <FloatingApplication
      src={"/assets/promo-apps/code_studio.png"}
      position={2}
    />
    <FloatingApplication
      src={"/assets/promo-apps/store.png"}
      position={3}
    />
  </div>;
};

export default IndexPageHeroApplications;
