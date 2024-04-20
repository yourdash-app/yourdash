/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useNavigate } from "@solidjs/router";
import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import { Component } from "solid-js";
import styles from "./panel.module.scss";
import isValidInstance from "../../../lib/isValidInstance.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";

const Panel: Component = () => {
  const navigate = useNavigate();

  return (
    <Box extraClass={styles.component}>
      <IconButton
        icon={UKIcon.ChevronLeft}
        onClick={() => {
          navigate("/");
        }}
        extraClass={styles.backButton}
        accessibleLabel={"Go Back"}
      />
      <Heading
        level={3}
        text={"Instance's Url"}
      />
      <TextInput
        placeholder={"https:// or http://"}
        onChange={(val) => {
          isValidInstance(val).then((bool) => {
            if (bool) {
              console.log("VALID INSTANCE");
            }
          });
        }}
        icon={UKIcon.Link}
      />
    </Box>
  );
};

export default Panel;
