/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { TypeFromString } from "@yourdash/shared/core/typeFromString";
import React, { useEffect } from "react";
import { UUID } from "@yourdash/shared/core/uuid";
import styles from "./Node.module.scss";

export interface INode {
  displayName: string;
  inputs?: {
    [inputId: string]: string;
  };
  outputs?: {
    [outputId: string]: string;
  };
  exec: (inputs: INode["inputs"]) => INode["outputs"];
}

export interface INodeData<T extends INode> {
  id: UUID;
  type: string;
  content?: React.ReactNode;
  inputs: T["inputs"] extends Required<T["inputs"]>
    ? { [inputId in keyof T["inputs"]]: TypeFromString<T["inputs"][inputId]> }
    : never;
  outputs: T["outputs"] extends Required<T["outputs"]>
    ? { [outputId in keyof T["outputs"]]: TypeFromString<T["outputs"][outputId]> }
    : never;
}

export interface NodeProps {
  data: INodeData<INode>;
  node: INode;
}

const Node: React.FC<NodeProps> = ({ data, node }) => {
  const [result, setResult] = React.useState<{
    [outputId in keyof (typeof data)["outputs"]]: TypeFromString<outputId>;
  }>({});

  useEffect(() => {
    setResult(
      node.exec(data.inputs as { [inputId in keyof (typeof data)["inputs"]]: TypeFromString<inputId> }) as {
        [outputId: string]: unknown;
      },
    );
  }, [data.inputs]);

  return (
    <div className={styles.node}>
      <div className={styles.title}>{node.displayName}</div>
      <section className={styles.inner}>
        {node.inputs && (
          <div className={styles.nodeInput}>
            <div>Inputs</div>
            {Object.keys(node.inputs).map((index) => {
              return (
                <div key={node.inputs?.[index]}>
                  <div className={styles.slot} />
                  <span>{node.inputs?.[index]}</span>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.content}>{data.content}</div>
        {node.outputs && (
          <div className={styles.nodeInput}>
            <div>Outputs</div>
            {Object.keys(node.outputs).map((index) => {
              return (
                <div key={node.outputs?.[index]}>
                  <div className={styles.slot} />
                  <span>{node.outputs?.[index]}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Node;
