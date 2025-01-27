/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./spinner.module.scss";
import { FC } from "react";

const UKSpinner: FC<{
  // eslint-disable-next-line
  style?: any;
}> = (props) => {
  return (
    <div
      className={styles.component}
      style={props.style}
    >
      <section className={styles.container}>
        <div className={styles.spinnerBorder} />
        <div className={styles.spinnerBack} />
        <div className={styles.spinnerCutoutContainer}>
          <div className={clippy(styles.spinnerCutoutOne, styles.spinnerCutout)} />
          <div className={clippy(styles.spinnerCutoutTwo, styles.spinnerCutout)} />
        </div>
      </section>
    </div>
  );
};

export default UKSpinner;
