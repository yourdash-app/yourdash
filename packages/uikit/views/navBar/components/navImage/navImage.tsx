import React from "react";
import Image from "../../../../components/image/image";
import styles from "./navImage.module.scss";

const NavImage: React.FC<{ src: string }> = ({ src }) => {
  return (
    <Image
      accessibleLabel=""
      src={src}
      className={styles.component}
    />
  );
};

export default NavImage;
