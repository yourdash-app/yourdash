/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { useState, useEffect } from "react";
import csi from "./csi";
import { io, Socket } from "socket.io-client";

const useWebsocketConnection = (path: string) => {
  const [connection, setConnection] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    setConnection(io(csi.getInstanceWebsocketUrl(), { path: path + "/websocket-manager/websocket" }));

    return () => {
      connection?.close();
    };
  }, [path]);

  return connection;
};

export default useWebsocketConnection;
