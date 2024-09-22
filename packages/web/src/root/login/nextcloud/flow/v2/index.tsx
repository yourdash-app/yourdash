/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import Button from "@yourdash/uikit/components/button/button.tsx";
import Card from "@yourdash/uikit/components/card/card.tsx";
import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Separator from "@yourdash/uikit/components/separator/separator.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";
import TextInput from "@yourdash/uikit/components/textInput/textInput.tsx";
import { useRef, useState } from "react";
import { useParams } from "react-router";

const LoginNextcloudFlowV2Page: React.FC = () => {
  const { token } = useParams();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [successful, setSuccessful] = useState<boolean>(false);

  if (!token) return <>No token</>;

  if (successful) {
    return (
      <>
        <Heading text={"Successfully authenticated!"} />
        <Text text={"You may now safely close the tab."} />
      </>
    );
  }

  return (
    <Card>
      <Heading text={"Nextcloud Compatability login flow"} />
      <Separator direction={"column"} />
      <TextInput
        accessibleName={""}
        placeholder={"username"}
        type="username"
        ref={usernameRef}
      />
      <TextInput
        accessibleName={""}
        placeholder={"password"}
        type="password"
        ref={passwordRef}
      />
      <Separator direction={"column"} />
      <Button
        text="Login"
        onClick={() => {
          console.log("login pressed");

          if (!usernameRef.current) {
            return console.error("missing username ref");
          }
          if (!passwordRef.current) {
            return console.error("missing password ref");
          }

          coreCSI
            .postJson<{ success?: boolean; error?: string }>("/login/nextcloud/flow/v2/authenticate", {
              username: usernameRef.current.value,
              password: passwordRef.current.value,
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
    </Card>
  );
};

export default LoginNextcloudFlowV2Page;
