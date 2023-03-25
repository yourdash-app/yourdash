export var FlowNodeTypes;
(function (FlowNodeTypes) {
    FlowNodeTypes[FlowNodeTypes["START"] = 0] = "START";
    FlowNodeTypes[FlowNodeTypes["MIDDLE"] = 1] = "MIDDLE";
    FlowNodeTypes[FlowNodeTypes["END"] = 2] = "END";
})(FlowNodeTypes || (FlowNodeTypes = {}));
export var FlowNodeShapes;
(function (FlowNodeShapes) {
    FlowNodeShapes[FlowNodeShapes["BOX"] = 0] = "BOX";
    FlowNodeShapes[FlowNodeShapes["ROUNDED_BOX"] = 1] = "ROUNDED_BOX";
    FlowNodeShapes[FlowNodeShapes["CIRCLE"] = 2] = "CIRCLE";
    FlowNodeShapes[FlowNodeShapes["DIAMOND"] = 3] = "DIAMOND";
    FlowNodeShapes[FlowNodeShapes["PILL"] = 4] = "PILL";
})(FlowNodeShapes || (FlowNodeShapes = {}));
