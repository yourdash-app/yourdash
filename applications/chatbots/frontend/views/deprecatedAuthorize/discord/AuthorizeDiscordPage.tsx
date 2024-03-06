/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/uikit/depChiplet/components/heading/Heading";
import MajorButton from "@yourdash/uikit/depChiplet/components/majorButton/MajorButton";
import React from "react";
import getBotAuthorizationCodeUrl from "../../../../shared/platforms/discord/oauth";
import { DiscordPermissions } from "../../../../shared/platforms/discord/permissions";

const AuthorizeDiscordPage: React.FC = () => {
  return (
    <div className={"flex items-center justify-center h-full flex-col gap-16 text-center"}>
      <Heading level={1}>Authorize YourDash Chatbots</Heading>
      <p className={"-mt-16"}>To continue to YourDash Chatbots, you need to authorize your Discord account</p>
      <MajorButton
        onClick={() => {
          window.location.href = getBotAuthorizationCodeUrl(
            "1208110209403461803",
            "http://localhost:5173/#/app/a/chatbots/authorize/discord/redirect",
            [DiscordPermissions.ADMINISTRATOR],
          );
        }}
      >
        Click to continue
      </MajorButton>
    </div>
  );
};

export default AuthorizeDiscordPage;
