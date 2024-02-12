/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLComponent from "../../../../framework/html/component";
import NodesView from "../../NodesView";
import Node from "../node/node";

export interface NodeWireProps {
  start: { output: string; node: Node };
  end: { input: string | undefined; node: Node | undefined };
  nodeWireContainer: SVGSVGElement;
  nodesView: NodesView;
}

export default class NodeWire extends UIKitHTMLComponent<NodeWireProps> {
  htmlElement: SVGElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseMove: { x?: any; y?: any } = { x: undefined, y: undefined };

  constructor(props: NodeWireProps) {
    super(props);

    this.htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "line");

    return this;
  }

  init() {
    super.init();

    this.htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "line");

    this.props.get("nodeWireContainer").appendChild(this.htmlElement);

    this.htmlElement.setAttribute("stroke", "white");

    return this;
  }

  render() {
    const nodeBounds = this.props.get("nodeWireContainer").getBoundingClientRect();

    if (this.props.get("end")) {
      this.props.get("nodesView").mouse.off("x", this.onMouseMove.x);
      this.props.get("nodesView").mouse.off("y", this.onMouseMove.y);
    } else {
      this.onMouseMove = {
        x: this.props.get("nodesView").mouse.on("x", (_, x) => {
          this.htmlElement.setAttribute("x2", `${x - nodeBounds.x}`);
        }),
        y: this.props.get("nodesView").mouse.on("y", (_, y) => {
          this.htmlElement.setAttribute("y2", `${y - nodeBounds.y}`);
        }),
      };
    }

    this.htmlElement.setAttribute(
      "x1",
      `${this.props.get("start").node.outputElements?.[this.props.get("start").output]?.getBoundingClientRect().x || 0}`,
    );
    this.htmlElement.setAttribute(
      "y1",
      `${this.props.get("start").node.outputElements?.[this.props.get("start").output]?.getBoundingClientRect().y || 0}`,
    );
  }
}
