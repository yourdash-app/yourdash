"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_io_client_1 = require("socket.io-client");
const shell_exec_1 = require("shell-exec");
const node_fetch_1 = require("node-fetch");
const path = require("path");
const fs = require("fs");
const app = express();
const SAVED_SESSION_PATH = path.resolve(__dirname, "saved_session.json");
async function startPsaBackend(wsInstanceUrl, restInstanceUrl, username, password, reAuth) {
    if (!fs.existsSync(SAVED_SESSION_PATH) || reAuth) {
        fs.writeFileSync(SAVED_SESSION_PATH, "{}");
        const sessionTokenResponse = await authorize(restInstanceUrl, username, password);
        main(wsInstanceUrl, restInstanceUrl, {
            username: username, sessionToken: sessionTokenResponse.token, sessionId: sessionTokenResponse.id
        });
    }
    else {
        const savedSession = JSON.parse(fs.readFileSync(SAVED_SESSION_PATH).toString());
        main(wsInstanceUrl, restInstanceUrl, {
            username: savedSession.username, sessionToken: savedSession.sessionToken, sessionId: savedSession.sessionId
        });
    }
}
exports.default = startPsaBackend;
async function authorize(restInstanceUrl, username, password) {
    return await ((0, node_fetch_1.default)(`${restInstanceUrl}/login/user/${username}/authenticate`, {
        method: "POST", headers: {
            "Content-Type": "application/json", type: "desktop"
        }, body: JSON.stringify({
            password
        })
    }).then((res) => res.json()));
}
function main(wsInstanceUrl, restInstanceUrl, sessionData) {
    const io = (0, socket_io_client_1.io)(wsInstanceUrl, {
        query: {
            username: sessionData.username, sessionToken: sessionData.sessionToken, sessionId: sessionData.sessionId
        }
    });
    fs.writeFileSync(SAVED_SESSION_PATH, JSON.stringify({
        username: sessionData.username, sessionToken: sessionData.sessionToken, sessionId: sessionData.sessionId
    }));
    io.on("execute-command", async (cmd) => {
        let resp = await (0, shell_exec_1.default)(cmd);
        io.emit("execute-command-response", resp);
    });
    io.on("connect", () => {
        console.log("Connected to psa-backend!");
    });
    io.on("disconnect", () => {
        console.log("Disconnected from psa-backend! (retrying connection)");
        function retry() {
            io.connect();
            if (!io.connected) {
                setTimeout(retry, 1000);
            }
        }
        setTimeout(retry, 1000);
    });
    io.on("/core/update", () => {
        console.log("Update requested!");
    });
    app.get("/", (req, res) => {
        res.send("Hello curious user, welcome to the YourDash PSA (Personal Server Accelerator) backend!");
    });
    app.get("/test", (req, res) => {
        res.json({ status: "ok" });
    });
    app.listen(3561, () => {
        console.log(`Started psa-backend on port 3561
\t- ${wsInstanceUrl}
\t- ${restInstanceUrl}`);
    });
}
