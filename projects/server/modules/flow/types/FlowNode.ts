import { COLOR } from "types/global/color.js";

export default interface FlowNode {
    shape: FlowNodeShapes;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    color: COLOR;
    type: FlowNodeTypes;
}

export enum FlowNodeTypes {
    START,
    MIDDLE,
    END,
}

export enum FlowNodeShapes {
    BOX,
    ROUNDED_BOX,
    CIRCLE,
    DIAMOND,
    PILL,
}
