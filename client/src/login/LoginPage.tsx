import React, { useEffect, useState } from "react";
import { Button, Card, IconButton, TextInput } from "../ui/index";

const LoginPage: React.FC = () => {
  const [failure, setFailure] = useState(false);
  const [instanceUrl, setInstanceUrl] = useState(`http://example.com`);

  useEffect(() => {
    if (
      localStorage.getItem("current_server") &&
      localStorage.getItem("current_server") !== ""
    ) {
      window.location.href = "#/login/server";
    } else if (window.location.hostname === "localhost") {
      localStorage.setItem("current_server", "http://localhost:3560");
    }
  }, []);

  return (
    <main className={`flex flex-col items-center justify-center h-full w-full`}>
      <h1 className={`text-3xl text-container-fg pb-3`}>
        Enter your instance to continue
      </h1>
      <Card className={`flex flex-col gap-2`}>
        <TextInput
          label={"Instance URL"}
          onChange={(value) => {
            if (value.indexOf(":") === -1) {
              setInstanceUrl(value);
            } else {
              setInstanceUrl(`${value}:3560`);
            }
          }}
          mustMatchRegex={
            /^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/
          }
          placeholder={`https://example.com`}
        ></TextInput>
        <Button
          className={`w-full pt-2 pb-2 pl-4 pr-4 hover:bg-theme-600 active:bg-theme-500 bg-theme-700 transition-colors select-none cursor-pointer`}
          onClick={() => {
            fetch(`${instanceUrl}/test`)
              .then((resp) => resp.json())
              .then((resp) => {
                if (resp.status === 1 && resp.type === "yourdash") {
                  localStorage.setItem("current_server", instanceUrl);
                  window.location.href = "#/login/server";
                }
              });
          }}
        >
          Continue
        </Button>
      </Card>
      <header
        className={`absolute top-0 left-0 w-full h-16 flex items-center justify-center gap-2`}
      >
        <IconButton icon={"arrow-left-16"} className={"mr-auto ml-3.5"} />
      </header>
      <footer
        className={`absolute bottom-0 left-0 w-full h-16 flex items-center gap-2 pl-3 bg-container-bg`}
      >
        <img
          src={`/assets/productLogos/yourdash.svg`}
          className={`h-full pt-3 pb-3`}
          alt={``}
        />
        <h3 className={`font-bold text-3xl`}>YourDash</h3>
        <Button
          className={`ml-auto`}
          onClick={() => {
            window.location.href = "#/";
          }}
        >
          Home
        </Button>
        <Button
          className={`mr-2`}
          onClick={() => {
            window.location.href = "#/docs";
          }}
        >
          Docs
        </Button>
      </footer>
    </main>
  );
};

export default LoginPage;
