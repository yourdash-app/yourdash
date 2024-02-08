/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { TypeFromString } from "@yourdash/shared/core/typeFromString";
import { UUID } from "@yourdash/shared/core/uuid";
import styles from "./node.module.scss";
import NodeWire from "../wire/wire";

export interface INode {
  displayName: string;
  inputs: {
    [ inputId: string ]: string;
  };
  outputs: {
    [ outputId: string ]: string;
  };
  exec: (inputs: INode[ "inputs" ]) => INode[ "outputs" ];
  onInit?: (node: Node<any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface INodeData<T extends INode> {
  id: UUID;
  type: string;
  content?: HTMLDivElement;
  inputs: { [ inputId in keyof T[ "inputs" ] ]: TypeFromString<T[ "inputs" ][ inputId ]> };
  outputs: { [ outputId in keyof T[ "outputs" ] ]: TypeFromString<T[ "outputs" ][ outputId ]> };
  position: {
    x: number;
    y: number;
    containingFrame: UUID;
  };
}

export interface NodeProps {
  data: INodeData<INode>;
  node: INode;
}

export default class Node<T extends INode> {
  id: INodeData<T>[ "id" ];
  type: INodeData<T>[ "type" ];
  content?: INodeData<T>[ "content" ];
  inputs: INodeData<T>[ "inputs" ];
  outputs: INodeData<T>[ "outputs" ];
  position: INodeData<T>[ "position" ];
  onInit?: T[ "onInit" ];
  htmlElement: HTMLDivElement;
  nodesViewWiresData: NodeWire[]
  nodeWireElementContainer: HTMLElement

  inputElementsContainer: HTMLDivElement;
  outputElementsContainer: HTMLDivElement;

  inputElements: { [ inputId in keyof INodeData<T>[ "inputs" ] ]?: HTMLDivElement };
  outputElements: { [ outputId in keyof INodeData<T>[ "outputs" ] ]?: HTMLDivElement };

  constructor({ id, type, content, inputs, outputs, position }: INodeData<T>, nodeType: INode, wiresData: NodeWire[], nodeWireElementContainer: HTMLElement) {
    console.log("New Node: ", { id, type, content, inputs, outputs, position });

    this.id = id;
    this.type = type;
    this.content = content;
    this.inputs = inputs;
    this.outputs = outputs;
    this.position = position;
    this.htmlElement = document.createElement("div");
    this.htmlElement.classList.add(styles.node);
    this.nodeWireElementContainer = nodeWireElementContainer

    this.nodesViewWiresData = wiresData

    const titleElement = document.createElement("div");
    titleElement.classList.add(styles.title);
    titleElement.innerText = nodeType.displayName;

    this.htmlElement.appendChild(titleElement);

    const innerContentElement = document.createElement("div");
    innerContentElement.classList.add(styles.inner);

    this.htmlElement.appendChild(innerContentElement);

    this.inputElementsContainer = document.createElement("div");
    this.outputElementsContainer = document.createElement("div");

    this.inputElementsContainer.classList.add(styles.nodeInputs);
    this.outputElementsContainer.classList.add(styles.nodeOutputs);

    innerContentElement.appendChild(this.inputElementsContainer);
    innerContentElement.appendChild(this.outputElementsContainer);

    this.inputElements = {};
    this.outputElements = {};

    Object.keys(nodeType.inputs).forEach((input) => {
      this.setInput(input, this.inputs?.[ input ] || ("" as any)); // eslint-disable-line @typescript-eslint/no-explicit-any
    });

    Object.keys(nodeType.outputs).forEach((output) => {
      this.setOutput(output, this.outputs?.[ output ] || ("" as any)); // eslint-disable-line @typescript-eslint/no-explicit-any
    });

    this.render();
    nodeType.onInit?.(this);

    return this;
  }

  render() {
    this.outputElementsContainer.innerHTML = "OUTPUT";
    this.inputElementsContainer.innerHTML = "INPUT";

    Object.keys(this.inputs).forEach((input) => {
      this.inputElementsContainer.appendChild(this.inputElements[ input ] || document.createElement("error"));
    });

    Object.keys(this.outputs).forEach((output) => {
      this.outputElementsContainer.appendChild(this.outputElements[ output ] || document.createElement("error"));
    });

    return this;
  }

  setContent(content: INodeData<T>[ "content" ]) {
    this.content = content;

    return this;
  }

  setInput(input: keyof INodeData<T>[ "inputs" ], value: INodeData<T>[ "inputs" ][ keyof INodeData<T>[ "inputs" ] ]) {
    this.inputs[ input ] = value;

    const element = document.createElement("div");
    this.inputElements[ input ] = element;
    element.classList.add(styles.slot);

    element.addEventListener("mouseup", (e) => {

    })

    this.render();

    return this;
  }

  setOutput(output: keyof INodeData<T>[ "outputs" ], value: INodeData<T>[ "outputs" ][ keyof INodeData<T>[ "outputs" ] ]) {
    this.outputs[ output ] = value;

    const element = document.createElement("div");
    this.outputElements[ output ] = element;
    element.classList.add(styles.slot);

    element.addEventListener("mousedown", (e) => {
      this.nodesViewWiresData.push(new NodeWire(
        {
          output: output as string,
          node: this as unknown as Node<INode>
        },
        {
          input: "test1" as string,
          node: this as unknown as Node<INode>
        },
        this.nodeWireElementContainer
      ))

      console.log(this.nodesViewWiresData)
    })

    this.render();

    return this;
  }
}
