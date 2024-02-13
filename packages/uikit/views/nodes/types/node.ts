import { UUID } from "@yourdash/shared/core/uuid";

export interface INode {
  type: string;
  inputs: { [key: string]: any };
  outputs: { [key: string]: any };
}

export interface INodeData<N extends INode, CustomData> {
  id: UUID;
  type: string;
  inputs: {
    [val in keyof N["inputs"]]: {
      value: N["inputs"][val];
      points: { x: number; y: number }[];
      from: INodeData<any, CustomData>;
    };
  };
  outputs: {
    [val in keyof N["inputs"]]: {
      value: N["inputs"][val];
      points: { x: number; y: number }[];
      to: INodeData<any, CustomData>;
    };
  };
  data: CustomData;
}
