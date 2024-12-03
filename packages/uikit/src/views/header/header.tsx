/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import Heading from "../../components/heading/heading.tsx";
import styles from "./header.module.scss";

const Header: React.FC<{ backgroundImage?: string; heading: string }> = ({ backgroundImage, heading }) => {
  return (
    <>
      <div
        className={styles.view}
        style={
          backgroundImage ? { backgroundImage: backgroundImage } : { backgroundImage: "linear-gradient(-45deg, #ff8093aa, #ffd264aa)" }
        }
      >
        <Heading
          level={1}
          text={heading}
        />
      </div>
    </>
  );
};

export default Header;
