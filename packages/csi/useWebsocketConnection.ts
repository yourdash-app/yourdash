/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { useState, useEffect } from "react";
import coreCSI from "./coreCSI";
import { io, Socket } from "socket.io-client";

const useWebsocketConnection = (path: string) => {
  const [connection, setConnection] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    setConnection(
      io(`${coreCSI.getInstanceUrl().replace("https://", "wss://").replace("http://", "ws://")}`, {
        path: `${path}/websocket-manager/websocket`,
        auth: {
          token: coreCSI.getUserSessionToken(),
          username: coreCSI.getUsername(),
        },
      }),
    );

    return () => {
      connection?.close();
    };
  }, [path]);

  return connection;
};

export default useWebsocketConnection;
