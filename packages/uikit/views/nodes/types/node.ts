/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UUID } from "@yourdash/shared/core/uuid";
import generateUUID from "@yourdash/web-client/src/helpers/uuid";

export interface INode {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputs?: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputs?: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}

export interface INodeData<N extends INode> {
  id: UUID;
  type: string;
  inputs: N["inputs"] extends undefined
    ? undefined
    : {
        [val in keyof N["inputs"]]: {
          value: N["inputs"][val];
          points: { x: number; y: number }[];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          from: INodeData<any>;
        };
      };
  outputs: N["outputs"] extends undefined
    ? undefined
    : {
        [val in keyof N["inputs"]]: {
          value: N["inputs"][val];
          points: { x: number; y: number }[];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to: INodeData<any>;
        };
      };
  data: N["data"];
}

interface N extends INode {
  type: "number-input";
  outputs: {
    value: string;
  };
  data: { value: number };
}

const a: INodeData<N> = {
  value: generateUUID(),
  type: "number-input",
  inputs: {
    s: {},
  },
  outputs: {
    outputs: 23,
  },
  data: {
    value: 0,
  },
};
