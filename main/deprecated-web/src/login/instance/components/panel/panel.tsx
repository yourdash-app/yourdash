/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useNavigate } from "@solidjs/router";
import csi from "@yourdash/csi/csi.js";
import Box from "@yourdash/uikit/components/box/box.js";
import Button from "@yourdash/uikit/components/button/button.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import Subtext from "@yourdash/uikit/components/subtext/subtext.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import { Component, createSignal } from "solid-js";
import styles from "./panel.module.scss";
import isValidInstance from "../../../lib/isValidInstance.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";

const Panel: Component = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = createSignal<string>("");
  const [isValid, setIsValid] = createSignal<boolean | undefined>(undefined);

  function checkUrl() {
    console.log(inputValue());

    isValidInstance(inputValue()).then((bool) => {
      console.log(bool);
      setIsValid(bool);
    });
  }

  return (
    <Box className={styles.component}>
      <IconButton
        icon={UKIcon.ChevronLeft}
        onClick={() => {
          navigate("/");
        }}
        className={styles.backButton}
        accessibleLabel={"Go Back"}
      />
      <Heading
        level={3}
        text={"Instance's Url"}
      />
      <TextInput
        placeholder={"https:// or http://"}
        onChange={(val) => {
          setInputValue(val);
        }}
        onEnter={(val) => {
          setInputValue(val);
          checkUrl();
        }}
        icon={UKIcon.Link}
      />
      {isValid() === false && (
        <>
          <Subtext text={"Invalid instance!"} />
        </>
      )}
      {!isValid() && (
        <Button
          text={"Check url"}
          onClick={() => {
            checkUrl();
          }}
        />
      )}
      {isValid() && (
        <>
          <Subtext text={"Instance is valid!"} />
          <Button
            text={"Continue"}
            onClick={() => {
              csi.setInstanceUrl(inputValue());
              navigate("/login");
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Panel;
