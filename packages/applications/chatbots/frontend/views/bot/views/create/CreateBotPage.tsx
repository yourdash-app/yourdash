/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import csi from "@yourdash/csi/csi";
import {
  Button,
  Card,
  DropdownButton,
  Heading,
  IconButton,
  MajorButton,
  TextBox,
  TextInput,
  YourDashIcon,
} from "@yourdash/web-client/src/ui/index";
import ChatbotProfilePreview from "../../../../components/ChatbotProfilePreview/ChatbotProfilePreview";
import styles from "./CreateBotPage.module.scss";
import { useNavigate } from "react-router-dom";

const CreateBotPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [statusLabel, setStatusLabel] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>(YourDashIcon.ServerError);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <IconButton
          icon={YourDashIcon.ChevronLeft}
          onClick={() => {
            window.history.back();
          }}
        />
        <Heading level={2}>Create Chatbot</Heading>
      </header>
      <Card showBorder={true} className={styles.previewPane}>
        <Heading level={2} className={"pb-2"}>
          Profile Preview
        </Heading>
        <ChatbotProfilePreview
          username={username}
          displayName={displayName}
          avatarUrl={avatarUrl}
          bio={bio}
          status={statusLabel + " " + status}
          commands={["ping", "pong", "foo", "bar"]}
        />
      </Card>
      <Card showBorder={true} className={styles.optionsPane}>
        <Heading level={2}>Profile Options</Heading>
        <Heading level={3}>Bot Username</Heading>
        <TextInput
          preceedingInlay={
            username && (
              <span className={"animate__animated animate__slideInLeft animate__duration_500ms select-none"}>@</span>
            )
          }
          onChange={(value) => {
            setUsername(value);
          }}
          accessibleName={"Bot Username"}
          placeholder={"Bot Username"}
        />
        <Heading level={3}>Bot Name</Heading>
        <TextInput
          onChange={(value) => {
            setDisplayName(value);
          }}
          accessibleName={"Bot Name"}
          placeholder={"Bot Name"}
        />
        <Heading level={3}>Bot Description</Heading>
        <TextBox
          placeholder={"Description"}
          onChange={(e) => {
            setBio(e.currentTarget.value);
          }}
        />
        <Heading level={3}>Bot Avatar</Heading>
        <TextInput
          accessibleName={"Avatar URL"}
          placeholder={"Avatar URL"}
          defaultValue={"internal://ServerError"}
          onChange={(value) => {
            setAvatarUrl(value);
          }}
        />
        <Heading level={3}>Bot Status</Heading>
        <div className={"flex gap-2 w-full"}>
          <DropdownButton
            items={[
              {
                name: "Playing",
                onClick() {
                  setStatusLabel("Playing");
                },
              },
              {
                name: "Streaming",
                onClick() {
                  setStatusLabel("Streaming");
                },
              },
              {
                name: "Watching",
                onClick() {
                  setStatusLabel("Watching");
                },
              },
              {
                name: "Listening",
                onClick() {
                  setStatusLabel("Listening");
                },
              },
            ]}
          >
            Playing
          </DropdownButton>
          <TextInput
            className={"flex-grow"}
            onChange={(value) => {
              setStatus(value);
            }}
            accessibleName={"Status"}
            placeholder={"Status"}
          />
        </div>
        <MajorButton
          onClick={() => {
            csi.postJson(
              "/app/chatbots/integration/discord/create-bot",
              {
                username,
                displayName,
                bio,
                avatarUrl,
              },
              () => {
                navigate(`/app/a/chatbots/team/${csi.getUserName()}/manage/${username}`);
              },
              (error) => {
                alert(error);
              },
            );
          }}
        >
          Create bot
        </MajorButton>
        <Button
          onClick={() => {
            navigate("/app/a/chatbots/bot/0/manage/nodes");
          }}
        >
          DEVELOPER Nodes
        </Button>
      </Card>
    </main>
  );
};

export default CreateBotPage;
