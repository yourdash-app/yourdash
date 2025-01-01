/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import UKBox from "@yourdash/uikit/components/box/UKBox.js";
import UKButton from "@yourdash/uikit/components/button/UKButton.js";
import UKHeading from "@yourdash/uikit/components/heading/UKHeading.js";
import UKSubtext from "@yourdash/uikit/components/subtext/UKSubtext.js";
import UKTextInput from "@yourdash/uikit/components/textInput/UKTextInput.js";
import { UKIcons } from "@yourdash/uikit/core/iconDictionary.js";
import styles from "./panel.module.scss";
import isValidInstance from "../../../lib/isValidInstance.ts";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import UKIconButton from "@yourdash/uikit/components/iconButton/UKIconButton.js";

const Panel: FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  function checkUrl() {
    isValidInstance(inputValue).then((bool) => {
      setIsValid(bool);

      if (bool) {
        coreCSI.setInstanceUrl(inputValue);
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
              coreCSI.setInstanceUrl("http://localhost");
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
