/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import { Component } from "solid-js";
import styles from "./spinner.module.scss";

const Spinner: Component<{
  // eslint-disable-next-line
  style?: any;
}> = (props) => {
  return (
    <div
      class={styles.component}
      style={props.style}
    >
      <section class={styles.container}>
        <div class={styles.spinnerBorder} />
        <div class={styles.spinnerBack} />
        <div class={styles.spinnerCutoutContainer}>
          <div class={clippy(styles.spinnerCutoutOne, styles.spinnerCutout)} />
          <div class={clippy(styles.spinnerCutoutTwo, styles.spinnerCutout)} />
        </div>
      </section>
    </div>
  );
};

export default Spinner;
