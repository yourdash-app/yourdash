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
import styles from "./index.cards.module.scss";
import loginUser from "./lib/loginUser.js";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const IndexCardsPage: FC<{ metadata?: EndpointResponseLoginInstanceMetadata }> = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<{ avatar: string; fullName: { first: string; last: string }; isValid: boolean }>({
    avatar: "",
    fullName: { first: "", last: "" },
    isValid: false,
  });
  const [password, setPassword] = useState("");

  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.page}>
      <Card className={clippy(styles.formCard)}>
        {user.isValid ? (
          <>
            <Image
              className={styles.avatar}
              authenticatedImage
              src={user.avatar}
              accessibleLabel={"Your Avatar"}
            />
            <Heading
              level={3}
              text={`Hello, ${user.fullName.first}!`}
            />
          </>
        ) : (
          <Heading
            level={3}
            text={"Login"}
          />
        )}
        <TextInput
          accessibleName={"Username"}
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
          accessibleName={"Password"}
          placeholder={"Password"}
          onChange={(val) => {
            setPassword(val);
          }}
          onEnter={() => {
            if (!(username === "" || password === "" || !user.isValid))
              loginUser(username, password)
                .then(() => {
                  navigate("/login/success");
                })
                .catch(() => {
                  console.log("TODO: implement a toast notification here for a failed login!");
                });
          }}
        />
        <Button
          className={styles.button}
          text={"Login"}
          disabled={username === "" || password === "" || !user.isValid}
          onClick={() => {
            loginUser(username, password)
              .then(() => {
                navigate("/login/success");
              })
              .catch(() => {
                console.log("TODO: implement a toast notification here for a failed login!");
              });
          }}
        />
        <Subtext
          className={styles.instanceUrl}
          text={csi.getInstanceUrl()}
        />
      </Card>
      <Card className={styles.metadataCard}>
        <Image
          containerClassName={styles.backgroundImageContainer}
          className={styles.backgroundImage}
          src={"/login/instance/background"}
          authenticatedImage
          accessibleLabel={""}
        />
        <Flex
          direction={"column"}
          className={styles.metadata}
        >
          <Heading
            level={1}
            text={props.metadata?.title || "Unknown instance title"}
            className={styles.title}
          />
          {props.metadata?.message && (
            <Subtext
              className={styles.message}
              text={props.metadata.message}
            />
          )}
        </Flex>
      </Card>
    </div>
  );
};

export default IndexCardsPage;
