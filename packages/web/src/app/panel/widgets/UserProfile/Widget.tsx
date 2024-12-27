/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Image from "@yourdash/uikit/components/image/image.js";
import React from "react";
import styles from "./Widget.module.scss";

const UserProfileWidget: React.FC = () => {
  return (
    <div className={styles.component}>
      <Image
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
