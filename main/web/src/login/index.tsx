/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Button from "@yourdash/uikit/components/button/button.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import Text from "@yourdash/uikit/components/text/text.js";
import { Component, Suspense, createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";
import styles from "./index.module.scss";

const LoginIndexPage: Component = () => {
  const navigate = useNavigate();

  const [instanceName] = createResource(async () => csi.getJson("/login/instance/metadata"));

  console.log(instanceName());

  return (
    <Suspense>
      <div class={styles.page}>
        <Text text={instanceName()?.title} />
        {JSON.stringify(instanceName())}
        <Heading
          level={1}
          text={"Welcome to YourDash"}
        />
        <Card>
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
