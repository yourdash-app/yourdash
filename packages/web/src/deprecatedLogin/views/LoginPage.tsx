/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/chiplet/components/button/Button.tsx";
import Card from "@yourdash/chiplet/components/card/Card.tsx";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton.tsx";
import MajorButton from "@yourdash/chiplet/components/majorButton/MajorButton.tsx";
import TextInput from "@yourdash/chiplet/components/textInput/TextInput.tsx";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [failure, setFailure] = useState(false);
  const [instanceUrl, setInstanceUrl] = useState("http://example.com");

  useEffect(() => {
    if (localStorage.getItem("current_server") && localStorage.getItem("current_server") !== "") {
      navigate("/login/user");
    } else if (window.location.hostname === "localhost") {
      localStorage.setItem("current_server", "http://localhost:3563");
    }
  }, []);

  return (
    <main className={"flex flex-col items-center justify-center h-full w-full"}>
      <h1 className={"text-3xl text-container-fg pb-3"}>Enter your instance to continue</h1>
      <Card className={"gap-2 flex flex-col"}>
        <TextInput
          placeholder={"Instance URL (https://example.com)"}
          onChange={(value) => {
            if (value.indexOf(":") === -1) {
              setInstanceUrl(value);
            } else {
              setInstanceUrl(`${value}:3563`);
            }
          }}
          mustMatchRegex={
            /^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/
          }
          accessibleName={"Instance URL"}
        />
        <MajorButton
          className={"w-full"}
          onClick={() => {
            fetch(`${instanceUrl}/test`, {
              mode: "cors",
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            })
              .then((resp) => resp.json())
              .then((resp) => {
                if (resp.status === 1 && resp.type === "yourdash") {
                  localStorage.setItem("current_server", instanceUrl);
                  navigate("/login/user");
                }
              });
          }}
        >
          Continue
        </MajorButton>
      </Card>
      <header className={"absolute top-0 left-0 w-full h-16 flex items-center justify-center gap-2"}>
        <IconButton
          icon={UKIcons.ChevronLeft}
          className={"mr-auto ml-3.5"}
        />
      </header>
      <footer className={"absolute bottom-0 left-0 w-full h-16 flex items-center gap-2 pl-3 bg-container-bg"}>
        <img
          src={"/assets/productLogos/yourdash.svg"}
          className={"h-full pt-3 pb-3"}
          alt={""}
        />
        <h3 className={"font-bold text-3xl"}>{"YourDash"}</h3>
        <Button
          className={"ml-auto"}
          onClick={() => {
            navigate("/");
          }}
        >
          {"Home"}
        </Button>
        <Button
          className={"mr-2"}
          onClick={() => {
            navigate("/docs");
          }}
        >
          {"Docs"}
        </Button>
      </footer>
    </main>
  );
};

export default LoginPage;
