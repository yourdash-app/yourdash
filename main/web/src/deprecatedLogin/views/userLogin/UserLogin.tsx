/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import MajorButton from "@yourdash/chiplet/components/majorButton/MajorButton";
import TextInput from "@yourdash/chiplet/components/textInput/TextInput";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI";
import useYourDashLib from "@yourdash/shared/web/helpers/ydsh";

interface IUserLogin {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  username: string;
  setInstanceHostname: React.Dispatch<React.SetStateAction<string>>;
}

const UserLogin: React.FC<IUserLogin> = ({ setUsername, setPassword, password, username, setInstanceHostname }) => {
  const navigate = useNavigate();
  const ydsh = useYourDashLib();
  const [isValidUser, setIsValidUser] = React.useState<boolean>(false);
  const [avatar, setAvatar] = React.useState<string>("");
  const [fullName, setFullName] = React.useState<{
    first: string;
    last: string;
  }>({ first: "Name", last: "Error" });

  useEffect(() => {
    const SAVED_USERNAME = localStorage.getItem("username");
    const SESSION_TOKEN = localStorage.getItem("session_token");

    if (SAVED_USERNAME && SESSION_TOKEN) {
      coreCSI.syncGetJson("/login/is-authenticated", (response) => {
        if (response.error || response.success === false) {
          return;
        }

        navigate("/app/a/uk-ewsgit-dash-frontend");
      });
    }
  }, []);

  useEffect(() => {
    if (username === "") return;

    fetch(`${coreCSI.getInstanceUrl()}/login/user/${username}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.error) {
          setAvatar("");
          setFullName({ first: "Err", last: "or" });
          setIsValidUser(false);
        } else {
          setIsValidUser(true);
          setAvatar(`${coreCSI.getInstanceUrl()}/login/user/${username}/avatar`);
          setFullName(resp.name);
        }
      })
      .catch(() => {
        setAvatar("");
        setFullName({ first: "Err", last: "or" });
        setIsValidUser(false);
      });
  }, [username]);

  if (!isValidUser) {
    return (
      <div className={"w-full h-full flex items-center justify-center flex-col relative"}>
        <IconButton
          icon={UKIcon.ChevronLeft}
          className={"left-0 top-0 absolute animate__animated animate__fadeInLeft"}
          onClick={() => {
            setInstanceHostname("");
          }}
        />
        <span className={"animate__animated animate__fadeIn text-4xl font-semibold pb-4"}>Welcome Back</span>
        <TextInput
          accessibleName="Username input"
          key={"username-input"}
          className={"animate__animated animate__fadeIn"}
          placeholder={"Username"}
          onChange={(value) => setUsername(value)}
          value={username}
        />
      </div>
    );
  }

  return (
    <div className={"w-full h-full flex items-center justify-center flex-col relative animate__animated animate__fadeIn gap-4"}>
      <IconButton
        icon={UKIcon.ChevronLeft}
        className={"left-0 top-0 absolute animate__animated animate__fadeInLeft"}
        onClick={() => {
          setIsValidUser(false);
          setUsername("");
          setPassword("");
          setAvatar("");
        }}
      />
      <img
        src={avatar}
        className={"w-64 aspect-square rounded-3xl"}
      />
      <span className={"text-3xl font-semibold"}>
        {fullName.first} {fullName.last}
      </span>
      <form className={"flex-col flex items-center gap-4"}>
        <TextInput
          accessibleName="Username input"
          autoComplete={`yourdash-instance-login username instance-${coreCSI.getInstanceUrl()}`}
          key={"username-input"}
          placeholder={"Username"}
          onChange={(value) => setUsername(value)}
          value={username}
        />
        <TextInput
          accessibleName="Password input"
          autoComplete={`yourdash-instance-login password instance-${coreCSI.getInstanceUrl()}`}
          key={"password-input"}
          placeholder={"Password"}
          type={"password"}
          onChange={(value) => setPassword(value)}
          value={password}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              coreCSI.postJson(
                `/login/user/${username}/authenticate`,
                { password },
                (response) => {
                  // WARNING: USE NEW CSI NAMES!!!
                  localStorage.setItem("session_id", response.sessionId);
                  localStorage.setItem("session_token", response.token);
                  localStorage.setItem("username", username);
                  navigate("/app");
                },
                () => {
                  ydsh.toast.error("Login Error", "Invalid password");
                },
                {
                  type: localStorage.getItem("desktop_mode") ? "desktop" : "web",
                },
              );
            }
          }}
        />
        <MajorButton
          onClick={() => {
            coreCSI.postJson(
              `/login/user/${username}/authenticate`,
              { password },
              (response) => {
                // WARNING: USE NEW CSI NAMES!!!
                localStorage.setItem("session_id", response.sessionId);
                localStorage.setItem("session_token", response.token);
                localStorage.setItem("username", username);
                navigate("/app");
              },
              () => {
                ydsh.toast.error("Login Error", "Invalid password");
              },
              {
                type: localStorage.getItem("desktop_mode") ? "desktop" : "web",
              },
            );
          }}
        >
          Continue
        </MajorButton>
      </form>
    </div>
  );
};

export default UserLogin;
