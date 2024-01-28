/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { TabsContainer } from "web-client/src/ui/index";
import DiscordProfilePreview from "./platforms/discord/DiscordProfilePreview";

export interface IChatbotProfilePreviewProps {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  status: string;
  commands: string[];
}

const ChatbotProfilePreview: React.FC<IChatbotProfilePreviewProps> = ({
  username,
  displayName,
  bio,
  avatarUrl,
  status,
  commands,
}) => {
  return (
    <div>
      <h1>Chatbot Profile Preview</h1>
      <TabsContainer
        tabs={[
          {
            content: (
              <DiscordProfilePreview
                username={"discybot"}
                displayName={"Discy"}
                bio={"Discy discord bot created by @ewsgit"}
                avatarUrl={"https://picsum.photos/512"}
                status={"Watching you"}
                tryMyCommands={["ping", "pong"]}
              />
            ),
            displayName: "Discord",
          },
          {
            content: <h1>Coming Soon</h1>,
            displayName: "Coming Soon",
          },
        ]}
      />
    </div>
  );
};

export default ChatbotProfilePreview;
