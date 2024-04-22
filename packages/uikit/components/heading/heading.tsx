/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./heading.module.scss";
import clippy from "@yourdash/shared/web/helpers/clippy";

const Heading: Component<{ text: string; level?: 1 | 2 | 3 | 4 | 5 | 6; extraClass?: string }> = (props) => {
  switch (props.level || 1) {
    case 1:
      return <h1 class={clippy(styles.component, styles.h1component, props.extraClass)}>{props.text}</h1>;
    case 2:
      return <h2 class={clippy(styles.component, styles.h2component, props.extraClass)}>{props.text}</h2>;
    case 3:
      return <h3 class={clippy(styles.component, styles.h3component, props.extraClass)}>{props.text}</h3>;
    case 4:
      return <h4 class={clippy(styles.component, styles.h4component, props.extraClass)}>{props.text}</h4>;
    case 5:
      return <h5 class={clippy(styles.component, styles.h5component, props.extraClass)}>{props.text}</h5>;
    case 6:
      return <h6 class={clippy(styles.component, styles.h6component, props.extraClass)}>{props.text}</h6>;
  }
};

export default Heading;
