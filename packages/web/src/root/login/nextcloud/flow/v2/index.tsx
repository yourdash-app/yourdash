/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import { UKC } from "@yourdash/uikit";
import React, { useState } from "react";
import { useParams } from "react-router";

const LoginNextcloudFlowV2Page: React.FC = () => {
  const { token } = useParams();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);

  if (!token) return <>No token</>;

  if (successful) {
    return (
      <>
        <UKC.Heading text={"Successfully authenticated!"} />
        <UKC.Text text={"You may now safely close the tab."} />
      </>
    );
  }

  return (
    <UKC.Card>
      <UKC.Heading text={"Nextcloud Compatability login flow"} />
      <UKC.Separator direction={"column"} />
      <UKC.TextInput
        accessibleName={""}
        placeholder={"username"}
        type="username"
        getValue={setUsername}
      />
      <UKC.TextInput
        accessibleName={""}
        placeholder={"password"}
        type="password"
        getValue={setPassword}
      />
      <UKC.Separator direction={"column"} />
      <UKC.Button
        text="Login"
        onClick={() => {
          coreCSI
            .postJson<{ success?: boolean; error?: string }>("/login/nextcloud/flow/v2/authenticate", {
              username: username,
              password: password,
              authtoken: token,
            })
            .then((r) => {
              if (r.success) {
                window.close();
                return 0;
              }
            });
        }}
      />
    </UKC.Card>
  );
};

export default LoginNextcloudFlowV2Page;
