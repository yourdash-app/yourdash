/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKImage from "@yourdash/uikit/src/components/image/UKImage.js";
import React from "react";
import styles from "./Widget.module.scss";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";

const UserProfileWidget: React.FC = () => {
  return (
    <div className={styles.component}>
      <UKImage
        src={"/favicon.png"}
        accessibleLabel={"User profile"}
      />
      <span className={styles.label}>
        <UKText text={"User profile"} />
      </span>
    </div>
  );
};

export default UserProfileWidget;
