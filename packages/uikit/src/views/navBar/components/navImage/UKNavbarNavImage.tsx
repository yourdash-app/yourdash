import React from "react";
import UKImage from "../../../../components/image/UKImage.tsx";
import styles from "./navImage.module.scss";

const UKNavbarNavImage: React.FC<{ src: string }> = ({ src }) => {
  return (
    <UKImage
      accessibleLabel=""
      src={src}
      className={styles.component}
    />
  );
};

export default UKNavbarNavImage;
