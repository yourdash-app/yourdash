/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Node, { INode } from "../node/node";

export default class NodeWire {
  htmlElement: SVGElement;

  start: { output: string; node: Node<INode> };
  end: { input: string; node: Node<INode> };

  constructor(
    start: { output: string; node: Node<INode> },
    end: { input: string; node: Node<INode> },
    nodeWireContainer: HTMLElement,
  ) {
    this.start = start;
    this.end = end;

    this.htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "line");

    nodeWireContainer.appendChild(this.htmlElement);

    this.htmlElement.setAttribute("stroke", "white");

    this.render();
  }

  render() {
    this.htmlElement.setAttribute(
      "x1",
      this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().x + "",
    );

    this.htmlElement.setAttribute(
      "y1",
      this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().y + "",
    );

    this.htmlElement.setAttribute("x2", this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().x + "");

    this.htmlElement.setAttribute("y2", this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().y + "");
  }
}
