/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import IconButton from "@yourdash/chiplet/components/iconButton/IconButton.tsx";
import MajorButton from "@yourdash/chiplet/components/majorButton/MajorButton.tsx";
import TextInput from "@yourdash/chiplet/components/textInput/TextInput.tsx";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export interface IInstanceSelector {
  setInstanceUrl: (value: string) => void;
}

const InstanceSelector: React.FC<IInstanceSelector> = ({ setInstanceUrl }) => {
  const navigate = useNavigate();

  const [uncheckedInstanceUrl, setUncheckedInstanceUrl] = useState<string>("");

  return (
    <section className={"w-full h-full flex items-center justify-center flex-col gap-4 relative"}>
      <IconButton
        className={"absolute left-0 top-0"}
        icon={UKIcons.ChevronLeft}
        onClick={() => {
          navigate("/");
        }}
      />
      <div className={"w-full h-full flex items-center justify-center flex-col gap-4"}>
        <span className={"animate__animated animate__fadeIn text-4xl font-semibold"}>Choose an Instance</span>
        <TextInput
          accessibleName="Instance URL"
          label="Instance URL"
          onChange={() => 0}
          onValid={(val) => {
            if (val.replace("://", "").indexOf(":") !== -1) {
              setUncheckedInstanceUrl(val);
            } else {
              setUncheckedInstanceUrl(`${val}:3563`);
            }
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;

            fetch(`${uncheckedInstanceUrl}/test`)
              .then((res) => res.json())
              .then((json) => {
                if (json.type === "yourdash") {
                  setInstanceUrl(uncheckedInstanceUrl);
                } else {
                  alert("This is not a valid YourDash instance");
                }
              })
              .catch(() => {
                alert("This is not a valid YourDash instance");
              });
          }}
          mustMatchRegex={
            /^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/
          }
          placeholder={"https://example.com"}
        />
        <MajorButton
          className={"pl-8 pr-8"}
          onClick={() => {
            fetch(`${uncheckedInstanceUrl}/test`)
              .then((res) => res.json())
              .then((json) => {
                if (json.type === "yourdash") {
                  setInstanceUrl(uncheckedInstanceUrl);
                } else {
                  alert("This is not a valid YourDash instance");
                }
              })
              .catch(() => {
                alert("This is not a valid YourDash instance");
              });
          }}
        >
          Continue
        </MajorButton>
      </div>
    </section>
  );
};

export default InstanceSelector;
