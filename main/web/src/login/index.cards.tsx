/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import EndpointResponseLoginInstanceMetadata from "@yourdash/shared/endpoints/login/instance/metadata.js";
import clippy from "@yourdash/shared/web/helpers/clippy.js";
import Button from "@yourdash/uikit/components/button/button.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Flex from "@yourdash/uikit/components/flex/flex.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Image from "@yourdash/uikit/components/image/image.js";
import Subtext from "@yourdash/uikit/components/subtext/subtext.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import { Component, createSignal } from "solid-js";
import styles from "./index.cards.module.scss";
import { useNavigate } from "@solidjs/router";
import loginUser from "./lib/loginUser.js";

const IndexCardsPage: Component<{ metadata?: EndpointResponseLoginInstanceMetadata }> = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = createSignal("");
  const [user, setUser] = createSignal<{ avatar: string; fullName: { first: string; last: string }; isValid: boolean }>(
    {
      avatar: "",
      fullName: { first: "", last: "" },
      isValid: false,
    },
  );
  const [password, setPassword] = createSignal("");

  if (csi.getUsername() !== "") {
    setUsername(csi.getUsername());
    fetch(`${csi.getInstanceUrl()}/login/user/${csi.getUsername()}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.error) {
          setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
        } else {
          setUser({
            avatar: `/login/user/${csi.getUsername()}/avatar`,
            fullName: resp.name,
            isValid: true,
          });
        }
      })
      .catch(() => {
        setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
      });
  }

  return (
    <div class={styles.page}>
      <Card extraClass={clippy(styles.card, styles.formCard)}>
        {user().isValid ? (
          <>
            <Image
              extraClass={styles.avatar}
              authenticatedImage
              src={user().avatar}
              accessibleLabel={"Your Avatar"}
            />
            <Heading
              level={3}
              text={`Hello, ${user().fullName.first}!`}
            />
          </>
        ) : (
          <Heading
            level={3}
            text={"Login"}
          />
        )}
        <TextInput
          placeholder={"Username"}
          defaultValue={csi.getUsername() || ""}
          onChange={(val) => {
            fetch(`${csi.getInstanceUrl()}/login/user/${val}`, {
              mode: "cors",
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            })
              .then((res) => res.json())
              .then((resp) => {
                if (resp.error) {
                  setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
                } else {
                  setUser({
                    avatar: `/login/user/${val}/avatar`,
                    fullName: resp.name,
                    isValid: true,
                  });
                }
              })
              .catch(() => {
                setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
              });

            setUsername(val);
          }}
        />
        <TextInput
          placeholder={"Password"}
          onChange={(val) => {
            setPassword(val);
          }}
          onEnter={() => {
            if (!(username() === "" || password() === "" || !user().isValid))
              loginUser(username(), password())
                .then(() => {
                  navigate("/login/success");
                })
                .catch(() => {
                  console.log("TODO: implement a toast notification here for a failed login!");
                });
          }}
        />
        <Button
          extraClass={styles.button}
          text={"Login"}
          disabled={username() === "" || password() === "" || !user().isValid}
          onClick={() => {
            loginUser(username(), password())
              .then(() => {
                navigate("/login/success");
              })
              .catch(() => {
                console.log("TODO: implement a toast notification here for a failed login!");
              });
          }}
        />
      </Card>
      <Card extraClass={styles.card}>
        <Image
          extraClass={styles.backgroundImage}
          src={"/login/instance/background"}
          authenticatedImage
          accessibleLabel={""}
        />
        <Flex
          direction={"column"}
          extraClass={styles.metadata}
        >
          <Heading
            level={1}
            text={props.metadata?.title || "Unknown instance title"}
            extraClass={styles.title}
          />
          {props.metadata?.message && (
            <Subtext
              extraClass={styles.message}
              text={props.metadata.message}
            />
          )}
        </Flex>
      </Card>
    </div>
  );
};

export default IndexCardsPage;
