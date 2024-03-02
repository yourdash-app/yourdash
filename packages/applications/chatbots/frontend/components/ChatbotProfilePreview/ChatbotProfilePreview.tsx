/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/web-client/src/helpers/uuid";
import React from "react";
import { TabsContainer } from "@yourdash/web-client/src/ui/index";
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
    <>
      <TabsContainer
        tabs={[
          {
            content: (
              <DiscordProfilePreview
                username={username}
                displayName={displayName}
                bio={bio}
                avatarUrl={avatarUrl}
                presence={{
                  status: "online",
                  activities: [],
                  clientStatus: {
                    desktop: "online",
                  },
                }}
                tryMyCommands={commands}
                discriminator={"1234"}
              />
            ),
            displayName: "Discord",
            uuid: generateUUID(),
          },
          {
            content: <h1>Coming Soon</h1>,
            displayName: "Universal",
            uuid: generateUUID(),
          },
          {
            content: <h1>Coming Soon</h1>,
            displayName: "Twitter",
            uuid: generateUUID(),
          },
        ]}
      />
    </>
  );
};

export default ChatbotProfilePreview;
