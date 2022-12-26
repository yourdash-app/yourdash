import { returnBase64Image } from "../libServer.js";
import * as path from "path";
const includedApps = [
    {
        name: "endpoint-tester",
        displayName: "Endpoint Tester",
        description: "Test yourdash server endpoints",
        icon: {
            launcher: returnBase64Image(path.resolve("./releaseData/assets/apps/endpoint-tester/icon.png")),
            quickShortcut: returnBase64Image(path.resolve("./releaseData/assets/apps/endpoint-tester/icon.png")),
            store: returnBase64Image(path.resolve("./releaseData/assets/apps/endpoint-tester/icon.png"))
        },
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
        icon: {
            launcher: returnBase64Image(path.resolve("./releaseData/assets/apps/dash/icon.png")),
            quickShortcut: returnBase64Image(path.resolve("./releaseData/assets/apps/dash/icon.png")),
            store: returnBase64Image(path.resolve("./releaseData/assets/apps/dash/icon.png"))
        },
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/dash"
    },
    {
        name: "files",
        displayName: "Files",
        description: "The YourDash file manager",
        icon: {
            launcher: returnBase64Image(path.resolve("./releaseData/assets/apps/files/icon.png")),
            quickShortcut: returnBase64Image(path.resolve("./releaseData/assets/apps/files/icon.png")),
            store: returnBase64Image(path.resolve("./releaseData/assets/apps/files/icon.png"))
        },
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/files"
    }, {
        name: "store",
        displayName: "Store",
        description: "The YourDash application and extension manager",
        icon: {
            launcher: returnBase64Image(path.resolve("./releaseData/assets/apps/store/icon.png")),
            quickShortcut: returnBase64Image(path.resolve("./releaseData/assets/apps/store/icon.png")),
            store: returnBase64Image(path.resolve("./releaseData/assets/apps/store/icon.png"))
        },
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/store"
    }, {
        name: "settings",
        displayName: "Settings",
        description: "The YourDash settings manager",
        icon: {
            launcher: returnBase64Image(path.resolve("./releaseData/assets/apps/settings/icon.png")),
            quickShortcut: returnBase64Image(path.resolve("./releaseData/assets/apps/settings/icon.png")),
            store: returnBase64Image(path.resolve("./releaseData/assets/apps/settings/icon.png"))
        },
        author: "Ewsgit",
        copyright: "MIT",
        moduleRequirements: [],
        previewImages: [],
        path: "/app/settings"
    }
];
export default includedApps;
