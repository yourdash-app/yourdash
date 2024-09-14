/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import Box from "@yourdash/uikit/components/box/box.tsx";
import Button from "@yourdash/uikit/components/button/button.tsx";
import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.ts";
import Subtext from "@yourdash/uikit/components/subtext/subtext.tsx";
import TextInput from "@yourdash/uikit/components/textInput/textInput.tsx";
import styles from "./panel.module.scss";
import isValidInstance from "../../../lib/isValidInstance.ts";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.tsx";
import { FC, useState } from "react";
import { useNavigate } from "react-router";

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
        accessibleName={"Instance url"}
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
      {isValid === false && (
        <>
          <Subtext text={"Invalid instance!"} />
        </>
      )}
      <Button
        text={"Check url"}
        onClick={() => {
          checkUrl();
        }}
      />
    </Box>
  );
};

export default Panel;
