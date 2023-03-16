import fs from "fs";
import path from "path";
import { FlowNodeShapes, FlowNodeTypes } from "./types/FlowNode.js";
import { FlowTemplates } from "./types/FlowTemplates.js";
const module = {
    load(request, api) {
        request.post(`/project/create`, (req, res) => {
            const { name, template } = req.body;
            if (template === undefined || name === undefined)
                return res.json({ error: "Invalid name or template id" });
            let defaultNodes = [];
            switch (template) {
                case FlowTemplates.BLANK:
                    defaultNodes = [];
                    break;
                case FlowTemplates.TUTORIAL:
                    defaultNodes = [
                        {
                            color: "#770022",
                            type: FlowNodeTypes.START,
                            shape: FlowNodeShapes.BOX,
                            size: {
                                height: 50,
                                width: 250,
                            },
                            position: {
                                y: 2,
                                x: 30,
                            },
                        },
                    ];
                    break;
            }
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/flow/flows/`)))
                fs.mkdirSync(path.resolve(`${api.UserAppData(req)}/flow/flows/`), { recursive: true });
            fs.writeFile(path.resolve(`${api.UserAppData(req)}/flow/flows/${name}.flow`), JSON.stringify({ name: name, nodes: defaultNodes }), (err) => {
                if (err)
                    return res.json({ error: true });
                return res.json({ success: true });
            });
        });
    },
    install() {
        return 0;
    },
    unload() {
        return 0;
    },
    requiredModules: [],
    uninstall() {
        return 0;
    },
    configuration: {},
};
export default module;
