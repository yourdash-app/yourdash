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
  onMouseMove;

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
    } else {
      this.onMouseMove = this.props.get("nodesView").mouse;
    }

    // this.htmlElement.setAttribute(
    //   "x1",
    //   `${(this.props.get("start").node.outputElements?.[this.props.get("start").output]?.getBoundingClientRect().x || 0) - nodeBounds.x + (this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().width || 0) / 2}`,
    // );
    //
    // this.htmlElement.setAttribute(
    //   "y1",
    //   `${(this.props.get("start").node.outputElements?.[this.props.get("start").output]?.getBoundingClientRect().y || 0) - nodeBounds.y + (this.start.node.outputElements?.[this.start.output]?.getBoundingClientRect().height || 0) / 2}`,
    // );
    //
    // this.htmlElement.setAttribute(
    //   "x2",
    //   `${(this.props.get("end").node?.inputElements?.[this.props.get("end").input]?.getBoundingClientRect().x || 0) - nodeBounds.x + (this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().width || 0) / 2}`,
    // );
    //
    // this.htmlElement.setAttribute(
    //   "y2",
    //   `${(this.props.get("end").node?.inputElements?.[this.props.get("end").input]?.getBoundingClientRect().y || 0) - nodeBounds.y + (this.end.node.inputElements?.[this.end.input]?.getBoundingClientRect().height || 0) / 2}`,
    // );
  }
}
