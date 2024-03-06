/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/uikit/depChiplet/components/heading/Heading";
import MajorButton from "@yourdash/uikit/depChiplet/components/majorButton/MajorButton";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AuthorizeDiscordRedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const [didError, setDidError] = useState<{ error: string; errorDescription: string }>({
    error: "",
    errorDescription: "",
  });

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const errorDescription = params.get("error_description");

    if (error) {
      console.log(error);
      console.log(errorDescription);

      params.delete("error");
      params.delete("error_description");

      // remove query params from the current url
      window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`);

      // navigate("/app/a/chatbots/deprecatedAuthorize/discord");
      setDidError({
        error,
        errorDescription: errorDescription || "",
      });

      return;
    }

    const code = params.get("code");

    if (code) {
      params.delete("code");

      window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`);
    }
  }, []);

  if (didError.error === "access_denied") {
    return (
      <div className={"flex items-center justify-center h-full flex-col gap-16 text-center"}>
        <Heading level={1}>Authorization Error</Heading>
        <p className={"-mt-16"}>
          {didError.error}: {didError.errorDescription}
        </p>
        <MajorButton
          onClick={() => {
            navigate("/app/a/chatbots/deprecatedAuthorize/discord");
          }}
        >
          Go back
        </MajorButton>
      </div>
    );
  }

  return <div>No Error</div>;
};

export default AuthorizeDiscordRedirectPage;
