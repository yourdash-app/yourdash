/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import UKHeading from "../../components/heading/UKHeading.tsx";
import styles from "./header.module.scss";

const UKPageHeader: React.FC<{ backgroundImage?: string; heading: string }> = ({ backgroundImage, heading }) => {
  return (
    <>
      <div
        className={styles.view}
        style={
          backgroundImage ? { backgroundImage: backgroundImage } : { backgroundImage: "linear-gradient(-45deg, #ff8093aa, #ffd264aa)" }
        }
      >
        <UKHeading
          level={1}
          text={heading}
        />
      </div>
    </>
  );
};

export default UKPageHeader;
