/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import { Component } from "solid-js";
import styles from "./index.module.scss";
import Text from "@yourdash/uikit/components/text/text.js";

const LoginInstancePage: Component = () => {
  return (
    <div class={styles.page}>
      <Box extraClass={styles.panel}>
        <Heading
          level={3}
          text={"To continue, please enter your instance's Url"}
        />
        <TextInput
          placeholder={"https:// or http://"}
          onChange={() => {}}
          icon={UKIcon.Link}
        />
      </Box>
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
          <li>
            <Text text={"Enter your instance's URL"} />
          </li>
          <li>
            <Text text={"Enter your username"} />
          </li>
          <li>
            <Text text={"Enter your password or create one for a new account"} />
          </li>
          <li>
            <Text text={"If you have any issues, please contact your instance's admin"} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginInstancePage;
