/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import EndpointResponseLoginInstanceMetadata from "@yourdash/shared/endpoints/login/instance/metadata.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./index.cards.module.scss";
import loginUser from "./lib/loginUser.ts";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UKC } from "@yourdash/uikit";

const IndexCardsPage: FC<{ metadata?: EndpointResponseLoginInstanceMetadata }> = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<{ avatar: string; fullName: { first: string; last: string }; isValid: boolean }>({
    avatar: "",
    fullName: { first: "", last: "" },
    isValid: false,
  });

  useEffect(() => {
    if (coreCSI.getUsername() !== "") {
      setUsername(coreCSI.getUsername());
      fetch(`${coreCSI.getInstanceUrl()}/login/user/${coreCSI.getUsername()}`, {
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
              avatar: `/login/user/${coreCSI.getUsername()}/avatar`,
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

  useEffect(() => {
    fetch(`${coreCSI.getInstanceUrl()}/login/user/${username}`, {
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
            avatar: `/login/user/${username}/avatar`,
            fullName: resp.name,
            isValid: true,
          });
        }
      })
      .catch(() => {
        setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
      });
  }, [username]);

  return (
    <div className={styles.page}>
      <UKC.Card className={clippy(styles.formCard)}>
        {user.isValid ? (
          <>
            <UKC.Image
              className={styles.avatar}
              src={toAuthImgUrl(user.avatar)}
              accessibleLabel={"Your Avatar"}
            />
            <UKC.Heading
              level={2}
              text={`${user.fullName.first} ${user.fullName.last}`}
            />
          </>
        ) : (
          <UKC.Heading
            level={3}
            text={"Login"}
          />
        )}
        <UKC.TextInput
          accessibleName={"Username"}
          placeholder={"Username"}
          type={"username"}
          defaultValue={coreCSI.getUsername() || ""}
          getValue={setUsername}
          autoComplete={`yourdash-instance-login username instance-${coreCSI.getInstanceUrl()}`}
        />
        <UKC.TextInput
          accessibleName={"Password"}
          placeholder={"Password"}
          type={"password"}
          getValue={setPassword}
          autoComplete={`yourdash-instance-login password instance-${coreCSI.getInstanceUrl()}`}
          onSubmit={() => {
            if (!(username === "" || password === "" || !user.isValid)) {
              loginUser(username, password)
                .then(() => {
                  navigate("/login/success");
                })
                .catch(() => {
                  console.log("TODO: implement a toasts notification here for a failed login!");
                });
            }
          }}
        />
        <UKC.Button
          className={styles.button}
          text={"Login"}
          disabled={username === "" || password === "" || !user.isValid}
          onClick={() => {
            loginUser(username, password)
              .then(() => {
                navigate("/login/success");
              })
              .catch(() => {
                console.log("TODO: implement a toasts notification here for a failed login!");
              });
          }}
        />
        <UKC.Subtext
          className={styles.instanceUrl}
          text={coreCSI.getInstanceUrl()}
        />
      </UKC.Card>
      <UKC.Card className={styles.metadataCard}>
        <UKC.Image
          containerClassName={styles.backgroundImageContainer}
          className={styles.backgroundImage}
          src={toAuthImgUrl("/login/instance/background")}
          accessibleLabel={""}
        />
        <UKC.Flex
          direction={"column"}
          className={styles.metadata}
        >
          <UKC.Heading
            level={1}
            text={props.metadata?.title || "Unknown instance title"}
            className={styles.title}
          />
          {props.metadata?.message && (
            <UKC.Subtext
              className={styles.message}
              text={props.metadata.message}
            />
          )}
        </UKC.Flex>
      </UKC.Card>
    </div>
  );
};

export default IndexCardsPage;
