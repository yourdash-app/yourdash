/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useWebsocketConnection from "@yourdash/csi/useWebsocketConnection";
import React, { useEffect } from "react";

const WebsocketToasts: React.FC = () => {
  const wsc = useWebsocketConnection("/core::log");

  useEffect(() => {
    if (!wsc) return;

    wsc.on("info", (data) => {
      console.log("INFO", data);
    });
  }, []);

  return <></>;
};

export default WebsocketToasts;
