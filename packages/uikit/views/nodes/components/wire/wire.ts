/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Node, { INode } from "../node/node";

export default class NodeWire {
  htmlElement: SVGElement;

  start: { output: string; node: Node<INode> };
  end: { input: string; node: Node<INode> };

  constructor(start: { output: string; node: Node<INode> }, end: { input: string; node: Node<INode> }) {
    this.start = start;
    this.end = end;

    this.htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "line");

    this.render();
  }

  render() {
    this.htmlElement.setAttribute(
      "x1",
      this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().x + "px",
    );

    this.htmlElement.setAttribute(
      "y1",
      this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().y + "px",
    );
  }
}
