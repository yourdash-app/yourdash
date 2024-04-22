/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.js";
import Button from "@yourdash/uikit/components/button/button.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Spinner from "@yourdash/uikit/components/spinner/spinner.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import Text from "@yourdash/uikit/components/text/text.js";
import { Component, Suspense, createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";
import styles from "./index.module.scss";

const LoginIndexPage: Component = () => {
  const navigate = useNavigate();

  const [instanceMetadata] = createResource(async () =>
    csi.getJson<{ title: string; message?: string; loginLayout: LoginLayout }>("/login/instance/metadata"),
  );

  console.log(instanceMetadata());

  return (
    <Suspense
      fallback={
        <div class={styles.spinner}>
          <Spinner />
        </div>
      }
    >
      {instanceMetadata()?.loginLayout === LoginLayout.MODAL && <>MODAL layout</>}
      {instanceMetadata()?.loginLayout === LoginLayout.CARDS && <>CARDS layout</>}{" "}
      {instanceMetadata()?.loginLayout === LoginLayout.SIDEBAR && <>SIDEBAR layout</>}
      <div class={styles.page}>
        <Text text={"Instance Name: " + instanceMetadata()?.title || "Unknown Title"} />
        <Text text={"Instance Message: " + instanceMetadata()?.message || "Unknown Message"} />
        {JSON.stringify(instanceMetadata())}
        <Heading
          level={1}
          text={instanceMetadata()?.title || "Unknown instance title"}
        />
        <Card>
          <Heading
            level={3}
            text={"Login"}
          />
          <TextInput
            placeholder={"Username"}
            onChange={(val) => {
              console.log(`Username: ${val}`);
            }}
          />
          <TextInput
            placeholder={"Password"}
            onChange={(val) => {
              console.log(`Password: ${val}`);
            }}
          />
          <Button
            text={"Login"}
            onClick={() => {
              navigate("/login/success");
            }}
          />
        </Card>
      </div>
    </Suspense>
  );
};

export default LoginIndexPage;
