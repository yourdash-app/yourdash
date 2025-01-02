/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
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
        <UKHeading text={"Successfully authenticated!"} />
        <UKText text={"You may now safely close the tab."} />
      </>
    );
  }

  return (
    <UKCard>
      <UKHeading text={"Nextcloud Compatability login flow"} />
      <UKSeparator direction={"column"} />
      <UKTextInput
        accessibleName={""}
        placeholder={"username"}
        type="username"
        getValue={setUsername}
      />
      <UKTextInput
        accessibleName={""}
        placeholder={"password"}
        type="password"
        getValue={setPassword}
      />
      <UKSeparator direction={"column"} />
      <UKButton
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
    </UKCard>
  );
};

export default LoginNextcloudFlowV2Page;
