/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import tun from "@yourdash/tunnel/src/index.js";
import UKBox from "@yourdash/uikit/src/components/box/UKBox.js";
import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKSubtext from "@yourdash/uikit/src/components/subtext/UKSubtext.js";
import UKTextInput from "@yourdash/uikit/src/components/textInput/UKTextInput.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";
import styles from "./panel.module.scss";
import isValidInstance from "../../../lib/isValidInstance.ts";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import UKIconButton from "@yourdash/uikit/src/components/iconButton/UKIconButton.js";

const Panel: FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  function setInstanceUrl(url: string) {
    let newInstanceUrl = url;

    if (newInstanceUrl.endsWith("/")) {
      newInstanceUrl = newInstanceUrl.slice(0, -1);
    }

    if (!new RegExp(":\\d{1,5}$").test(newInstanceUrl)) {
      newInstanceUrl = newInstanceUrl + ":3563";
    }

    localStorage.setItem("instance_url", newInstanceUrl || "ERROR");
    tun.__internal_connectTo(newInstanceUrl);
  }

  function checkUrl() {
    isValidInstance(inputValue).then((bool) => {
      setIsValid(bool);

      if (bool) {
        setInstanceUrl(inputValue);
        navigate("/login");
      }
    });
  }

  return (
    <UKBox className={styles.component}>
      <UKIconButton
        icon={UKIcons.ChevronLeft}
        onClick={() => {
          navigate("/");
        }}
        className={styles.backButton}
        accessibleLabel={"Go Back"}
      />
      <UKHeading
        level={3}
        text={"Instance's Url"}
      />
      <UKTextInput
        accessibleName={"Instance url"}
        placeholder={"https:// or http://"}
        getValue={setInputValue}
        onSubmit={() => {
          checkUrl();
        }}
        icon={UKIcons.Link}
      />
      {isValid === false && (
        <>
          <UKSubtext text={"Invalid instance!"} />
        </>
      )}
      <UKButton
        text={"Check url"}
        onClick={() => {
          checkUrl();
        }}
      />
      <UKButton
        onClick={() => {
          isValidInstance("http://localhost").then((bool) => {
            setIsValid(bool);

            if (bool) {
              setInstanceUrl("http://localhost");
              navigate("/login");
            }
          });
        }}
        className={styles.useDevServer}
        text={"Use Local Development Server"}
      />
    </UKBox>
  );
};

export default Panel;
