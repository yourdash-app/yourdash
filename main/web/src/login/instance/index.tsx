/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { Component } from "solid-js";
import styles from "./index.module.scss";

const LoginInstancePage: Component = () => {
  return (
    <div class={styles.page}>
      <Box extraClass={styles.panel}></Box>
      <div class={styles.info}>
        <Heading
          level={1}
          text={"Welcome to YourDash!"}
        />
        <Heading
          level={2}
          text={"The following are the steps required to get started"}
        />
        <ul class={styles.bullets}>
          <li>Enter your instance's URL</li>
          <li>Enter your username</li>
          <li>Enter your password or create one for your new account</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginInstancePage;
