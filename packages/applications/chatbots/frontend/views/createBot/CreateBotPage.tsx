/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import {
  Card,
  Heading,
  IconButton,
  TextBox,
  TextInput,
  YourDashIcon,
} from "web-client/src/ui/index";
import ChatbotProfilePreview from "../../components/ChatbotProfilePreview/ChatbotProfilePreview";
import styles from "./CreateBotPage.module.scss";

const CreateBotPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
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
        <Heading level={3}>Profile Preview</Heading>
        <ChatbotProfilePreview
          username={username}
          displayName={displayName}
          avatarUrl={avatarUrl}
          bio={bio}
          status={"Status"}
          commands={["ping", "pong", "foo", "bar"]}
        />
      </Card>
      <Card showBorder={true} className={styles.optionsPane}>
        <Heading level={3}>Profile Options</Heading>
        <TextInput
          preceedingInlay={
            username && (
              <span
                className={
                  "animate__animated animate__slideInLeft animate__duration_500ms"
                }
              >
                @
              </span>
            )
          }
          onChange={(value) => {
            setUsername(value);
          }}
          accessibleName={"Bot Username"}
          placeholder={"Bot Username"}
        />
        <TextInput
          onChange={(value) => {
            setDisplayName(value);
          }}
          accessibleName={"Bot Name"}
          placeholder={"Bot Name"}
        />
        <TextBox
          placeholder={"Description"}
          onChange={(e) => {
            setBio(e.currentTarget.value);
          }}
        />
        <TextInput
          accessibleName={"Avatar URL"}
          placeholder={"Avatar URL"}
          defaultValue={"internal://ServerError"}
          onChange={(value) => {
            setAvatarUrl(value);
          }}
        />
      </Card>
    </main>
  );
};

export default CreateBotPage;
