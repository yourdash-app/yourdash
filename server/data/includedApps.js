import { returnBase64Svg } from "../libServer.js";
import * as path from "path";
const includedApps = [
    {
        name: "endpoint-tester",
        displayName: "Endpoint Tester",
        description: "Test yourdash server endpoints",
        icon: returnBase64Svg(path.resolve("./data/assets/apps/endpoint-tester/icon.svg")),
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/endpoint-tester"
    },
    {
        name: "dash",
        displayName: "Dashboard",
        description: "The YourDash dashboard",
        icon: returnBase64Svg(path.resolve("./data/assets/apps/endpoint-tester/icon.svg")),
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/dash"
    },
    {
        name: "files",
        displayName: "Files",
        description: "The YourDash dashboard",
        icon: returnBase64Svg(path.resolve("./data/assets/apps/endpoint-tester/icon.svg")),
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/files"
    }, {
        name: "store",
        displayName: "Store",
        description: "The YourDash dashboard",
        icon: returnBase64Svg(path.resolve("./data/assets/apps/endpoint-tester/icon.svg")),
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/store"
    }, {
        name: "settings",
        displayName: "Settings",
        description: "The YourDash dashboard",
        icon: returnBase64Svg(path.resolve("./data/assets/apps/endpoint-tester/icon.svg")),
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/settings"
    }
];
export default includedApps;
