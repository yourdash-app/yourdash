import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Column,
  Dialog,
  IconButton,
  TextInput,
} from "../ui/index";
import getJson, { postJson } from "../helpers/fetch";

const ServerLoginPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<null | string>(null);
  const [name, setName] = useState<{ first: string; last: string }>({
    first: "Err",
    last: "or",
  });
  const [serverUrl, setServerUrl] = useState<null | string>(null);

  useEffect(() => {
    setServerUrl(localStorage.getItem("current_server"));

    if (sessionStorage.getItem("session_token")) {
      window.location.href = "#/app/";
    }
  }, []);

  if (!serverUrl) return <></>;

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__fadeIn`}
      >
        <span className={`text-base-50 font-semibold text-3xl`}>
          Waiting for instance...
        </span>
      </div>
      <main
        style={{ backgroundImage: `url('${serverUrl}/login/background')` }}
        className={`min-h-screen w-full bg-center bg-no-repeat animate__animated animate__fadeIn animate__delay-1s`}
      >
        {selectedUser ? (
          <LoginAsUser
            name={name}
            serverUrl={serverUrl}
            username={selectedUser}
          />
        ) : (
          <SelectUser
            setName={(value) => setName(value)}
            serverUrl={serverUrl}
            setSelectedUser={(username) => setSelectedUser(username)}
          />
        )}
      </main>
    </>
  );
};

export default ServerLoginPage;

const SelectUser: React.FC<{
  setSelectedUser: (username: string) => void;
  serverUrl: string;
  setName: (name: { first: string; last: string }) => void;
}> = ({ setSelectedUser, serverUrl, setName }) => {
  const [username, setUsername] = useState<null | string>(null);
  const [validUser, setValidUser] = useState(true);

  return (
    <>
      <IconButton
        icon={"arrow-left-16"}
        className={`left-2 top-2 fixed animate__animated animate__fadeInLeft animate__delay-1250ms`}
        onClick={() => {
          localStorage.removeItem("current_server");
          window.location.href = "#/login";
        }}
      />
      <Card
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__fadeIn animate__delay-1250ms`}
      >
        <Column>
          <TextInput
            label={`Username`}
            mustMatchRegex={/[a-z]|[0-9]/}
            onChange={(value) => setUsername(value)}
          />
          <Button
            disabled={username === null}
            onClick={() => {
              if (username === null) return;

              getJson(
                `/login/user/${username}`,
                (json: {
                  name: { first: string; middle: string; last: string };
                }) => {
                  setSelectedUser(username);
                  setName(json.name);
                },
                () => {
                  setValidUser(false);
                }
              );
            }}
          >
            Continue
          </Button>
        </Column>
      </Card>
      {!validUser && (
        <Dialog
          title={`This user does not exist`}
          onClose={() => setValidUser(true)}
        >
          <></>
        </Dialog>
      )}
    </>
  );
};

const LoginAsUser: React.FC<{
  name: { first: string; last: string };
  username: string;
  serverUrl: string;
}> = ({ name, username, serverUrl }) => {
  const [password, setPassword] = useState<string | null>(null);

  return (
    <>
      <IconButton
        icon={"arrow-left-16"}
        className={`left-2 top-2 fixed animate__animated animate__fadeInLeft`}
        onClick={() => window.location.reload()}
      />
      <Card
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 flex flex-col animate__animated animate__fadeIn`}
      >
        <img
          alt={``}
          src={`${serverUrl}/login/user/${username}/avatar`}
          className={`rounded-xl aspect-square h-64`}
        />
        <span
          className={`text-center text-2xl tracking-wide font-medium text-base-50`}
        >
          {name.first} {name.last}
        </span>
        <span
          className={`text-center text-md text-base-200 tracking-wide font-medium -mt-3`}
        >
          {username}
        </span>
        <TextInput
          label={"password"}
          onChange={(value) => {
            setPassword(value);
          }}
        />
        <Button
          onClick={() => {
            postJson(
              `/login/user/${username}/authenticate`,
              { password },
              (response) => {
                sessionStorage.setItem(`session_token`, response.token);
                localStorage.setItem(`username`, username);
                window.location.href = `#/app`;
              },
              (err) => {
                console.error(err);
              }
            );
          }}
        >
          Login
        </Button>
      </Card>
    </>
  );
};
