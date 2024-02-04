/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";

export interface IChatView {
  users: {
    userid: number;
    username: string;
    displayName: string;
    avatar: string;
  }[];
  messages: { userid: number; message: string }[];
}

const ChatView: React.FC<IChatView> = ({}) => {
  return <div>CHAT VIEW</div>;
};

export default ChatView;
