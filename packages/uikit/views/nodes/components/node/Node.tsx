/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { UUID } from "@yourdash/shared/core/uuid";

export interface INode {
  id: UUID;
}

const Node: React.FC<INode> = ({}) => {
  return <div>NODE</div>;
};

export default Node;
