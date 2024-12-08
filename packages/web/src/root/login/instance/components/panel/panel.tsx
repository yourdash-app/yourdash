/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import styles from "./panel.module.scss";
import isValidInstance from "../../../lib/isValidInstance.ts";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import UK, { UKC } from "@yourdash/uikit";

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
    <UKC.Box className={styles.component}>
      <UKC.IconButton
        icon={UK.Core.Icons.ChevronLeft}
        onClick={() => {
          navigate("/");
        }}
        className={styles.backButton}
        accessibleLabel={"Go Back"}
      />
      <UKC.Heading
        level={3}
        text={"Instance's Url"}
      />
      <UKC.TextInput
        accessibleName={"Instance url"}
        placeholder={"https:// or http://"}
        getValue={setInputValue}
        onSubmit={() => {
          checkUrl();
        }}
        icon={UK.Core.Icons.Link}
      />
      {isValid === false && (
        <>
          <UKC.Subtext text={"Invalid instance!"} />
        </>
      )}
      <UKC.Button
        text={"Check url"}
        onClick={() => {
          checkUrl();
        }}
      />
    </UKC.Box>
  );
};

export default Panel;
