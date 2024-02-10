/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Node, { INode } from "../node/node";

export default class NodeWire {
  htmlElement: SVGElement;
  nodeWireContainer: SVGSVGElement;

  start: { output: string; node: Node<INode> };
  end: { input: string | undefined; node: Node<INode> | undefined };

  constructor(
    start: { output: string; node: Node<INode> },
    end: { input: string | undefined; node: Node<INode> | undefined },
    nodeWireContainer: SVGSVGElement,
  ) {
    this.start = start;
    this.end = end;
    this.nodeWireContainer = nodeWireContainer;

    this.htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "line");

    nodeWireContainer.appendChild(this.htmlElement);

    this.htmlElement.setAttribute("stroke", "white");

    this.render();
  }

  render() {
    const nodeBounds = this.nodeWireContainer.getBoundingClientRect();

    this.htmlElement.setAttribute(
      "x1",
      `${(this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().x || 0) - nodeBounds.x + (this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().width || 0) / 2}`,
    );

    this.htmlElement.setAttribute(
      "y1",
      `${(this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().y || 0) - nodeBounds.y + (this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().height || 0) / 2}`,
    );

    this.htmlElement.setAttribute(
      "x2",
      `${(this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().x || 0) - nodeBounds.x + (this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().width || 0) / 2}`,
    );

    this.htmlElement.setAttribute(
      "y2",
      `${(this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().y || 0) - nodeBounds.y + (this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().height || 0) / 2}`,
    );
  }
}
