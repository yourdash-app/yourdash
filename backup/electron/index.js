"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = require("node:path");
const index_1 = require("../psa-backend/index");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
function init() {
    let window = new electron_1.BrowserWindow({
        resizable: true,
        frame: true,
        movable: true,
    });
    window.menuBarVisible = false;
    window.title = "YourDash Desktop";
    if (process.env.DEV) {
        window.loadURL("http://localhost:5173").then(() => {
            window.show();
            window.focus();
        });
    }
    else {
        window
            .loadFile(node_path_1.default.join(process.cwd(), "../client/dist/index.html"))
            .then(() => {
            window.show();
            window.focus();
        });
    }
    window.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === "i") {
            event.preventDefault();
            window.webContents.toggleDevTools();
        }
    });
    // allow the electron frontend to have a different layout to the website
    window.webContents
        .executeJavaScript(`window.localStorage.setItem("desktop_mode", true)`)
        .then(() => {
        console.log(`desktop-mode injection complete`);
    });
    // window.webContents.executeJavaScript(`window.localStorage.removeItem("desktop_mode")`)
}
electron_1.app.whenReady().then(() => {
    init();
    (0, index_1.default)("ws://localhost:3560", "http://localhost:3560", "admin", "password");
});
