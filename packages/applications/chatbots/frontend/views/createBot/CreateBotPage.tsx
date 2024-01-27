/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import {
  Heading,
  IconButton,
  TextBox,
  TextInput,
  YourDashIcon,
} from "web-client/src/ui/index";
import ChatbotProfilePreview from "../../components/ChatbotProfilePreview/ChatbotProfilePreview";
import styles from "./CreateBotPage.module.scss";

const CreateBotPage: React.FC = () => {
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
      <TextInput
        onChange={(value) => {
          return value;
        }}
        accessibleName={"Bot Name"}
        placeholder={"Bot Name"}
      />
      <TextBox placeholder={"Description"} />
      <ChatbotProfilePreview />
    </main>
  );
};

export default CreateBotPage;
