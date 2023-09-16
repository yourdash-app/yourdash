import { promises as fs, writeFile, existsSync as fsExistsSync } from "fs";
import path from "path";
import * as http from "http";
import cors from "cors";
import express from "express";
import { Server as SocketIoServer } from "socket.io";
import chalk from "chalk";
import minimist from "minimist";
import killPort from "kill-port";
import { YOURDASH_SESSION_TYPE } from "shared/core/session.js";
import defineCorePanelRoutes from "./core/endpoints/panel.js";
import defineUserEndpoints from "./core/endpoints/user.js";
import log, { LOG_TYPES, LOG_HISTORY } from "./helpers/log.js";
import YourDashUnreadUser from "./core/user/user.js";
import { YourDashCoreUserPermissions } from "./core/user/permissions.js";
import GLOBAL_DB from "./helpers/globalDatabase.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "./core/sessions.js";
import { YOURDASH_INSTANCE_DISCOVERY_STATUS } from "./core/discovery.js";
import loadApplications from "./core/loadApplications.js";
import startRequestLogger from "./core/logRequests.js";
import { startAuthenticatedImageHelper } from "./core/authenticatedImage.js";
import defineLoginEndpoints from "./core/endpoints/login.js";
import defineUserDatabaseRoutes, { USER_DATABASES, saveUserDatabases } from "./core/endpoints/userDatabase.js";
import centerTerminalOutputOnLine from "./helpers/terminal/centerTerminalOutputOnLine.js";
import { generateLogos } from "./helpers/logo.js";
import { startUserDatabaseService } from "./helpers/userDatabase.js";
const FS_DIRECTORY_PATH = path.resolve(path.join(process.cwd(), "./fs/"));
export { FS_DIRECTORY_PATH };
const PROCESS_ARGUMENTS = minimist(process.argv.slice(2));
export { PROCESS_ARGUMENTS };
if (fsExistsSync(path.join(FS_DIRECTORY_PATH, "./global_database.json"))) {
    await GLOBAL_DB.readFromDisk(path.join(FS_DIRECTORY_PATH, "./global_database.json"));
    if (JSON.stringify(GLOBAL_DB.keys) === JSON.stringify({})) {
        await fs.rm(path.join(FS_DIRECTORY_PATH, "./global_database.json"));
    }
}
else {
    log(LOG_TYPES.WARNING, "Unable to load the global database!");
}
const exp = express();
const httpServer = http.createServer(exp);
const socketIo = new SocketIoServer(httpServer);
if (!fsExistsSync(FS_DIRECTORY_PATH)) {
    try {
        try {
            await fs.mkdir(FS_DIRECTORY_PATH);
        }
        catch (e) {
            log(LOG_TYPES.ERROR, "Unable to create \"./fs/\"");
            console.trace(e);
        }
        try {
            await fs.cp(path.join(process.cwd(), "./src/assets/default_avatar.avif"), path.join(FS_DIRECTORY_PATH, "./default_avatar.avif"));
        }
        catch (e) {
            log(LOG_TYPES.ERROR, "Unable to copy the default user avatar");
            console.trace(e);
        }
        try {
            await fs.cp(path.join(process.cwd(), "./src/assets/default_instance_logo.avif"), path.join(FS_DIRECTORY_PATH, "./instance_logo.avif"));
        }
        catch (e) {
            log(LOG_TYPES.ERROR, "Unable to copy the default instance logo");
            console.trace(e);
        }
        try {
            await fs.cp(path.join(process.cwd(), "./src/assets/default_login_background.avif"), path.join(FS_DIRECTORY_PATH, "./login_background.avif"));
        }
        catch (e) {
            log(LOG_TYPES.ERROR, "Unable to create the default login background");
        }
        try {
            await fs.mkdir(path.join(FS_DIRECTORY_PATH, "./users/"));
        }
        catch (e) {
            log(LOG_TYPES.ERROR, "Unable to create the \"./fs/users/\" directory");
        }
        try {
            log(LOG_TYPES.INFO, "The global database file does not exist, creating a new one");
            await fs.writeFile(path.join(FS_DIRECTORY_PATH, "./global_database.json"), JSON.stringify({
                displayName: "YourDash Instance",
                administratorDetails: {
                    name: "[ADMINISTRATOR NAME]",
                    contactDetails: {
                        phone: false,
                        email: "admin@example.com",
                        username: "admin"
                    }
                },
                installedApplications: ["dash", "settings", "files", "store", "weather"],
                defaults: {
                    user: {
                        quickShortcuts: ["dash", "settings", "files", "store", "weather"]
                    }
                }
            }));
            await GLOBAL_DB.readFromDisk(path.join(FS_DIRECTORY_PATH, "./global_database.json"));
        }
        catch (e) {
            log(LOG_TYPES.ERROR, "Unable to create the \"./fs/global_database.json\" file");
        }
        try {
            generateLogos();
        }
        catch (e) {
            log(LOG_TYPES.ERROR, "Unable to generate logo assets");
        }
        const adminUserUnread = new YourDashUnreadUser("admin");
        if (!(await adminUserUnread.exists())) {
            await adminUserUnread.create("password", {
                first: "Admin",
                last: "istrator"
            }, [YourDashCoreUserPermissions.Administrator]);
        }
    }
    catch (err) {
        log(LOG_TYPES.ERROR, "Uncaught error in fs verification!");
        console.trace(err);
    }
}
try {
    for (const user of (await fs.readdir(path.join(FS_DIRECTORY_PATH, "./users/")))) {
        await (await new YourDashUnreadUser(user).read()).verifyUserConfig().write();
    }
}
catch (err) {
    log(LOG_TYPES.ERROR, "Unable to verify users' settings!");
    console.trace(err);
}
async function listenForRequests() {
    await killPort(3560);
    try {
        httpServer.listen(3560, () => {
            log(LOG_TYPES.INFO, centerTerminalOutputOnLine("server now listening on port 3560!"));
        });
    }
    catch (_err) {
        log(LOG_TYPES.ERROR, `${chalk.bold.yellow("CORE")}: Unable to start server!, retrying...`);
        await listenForRequests();
    }
}
await listenForRequests();
const ACTIVE_SOCKET_IO_SOCKETS = {};
const CORE_HANDLE_SHUTDOWN = () => {
    log(LOG_TYPES.INFO, "Shutting down... (restart of core should occur automatically)");
    const LOG_OUTPUT = LOG_HISTORY.map((hist) => {
        return `${hist.type}: ${hist.message}`;
    }).join("\n");
    saveUserDatabases();
    writeFile(path.resolve(process.cwd(), "./fs/log.log"), LOG_OUTPUT, () => {
        GLOBAL_DB._internalDoNotUseOnlyIntendedForShutdownSequenceWriteToDisk(path.resolve(process.cwd(), "./fs/global_database.json"), () => {
            process.kill(process.pid);
        });
    });
};
process.on("SIGINT", CORE_HANDLE_SHUTDOWN);
socketIo.on("connection", (socket) => {
    if (!socket.handshake.query.username || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId) {
        log(LOG_TYPES.ERROR, "[PSA-BACKEND]: Closing connection! Missing required parameters!");
        socket.disconnect(true);
        return;
    }
    if (!ACTIVE_SOCKET_IO_SOCKETS[socket.handshake.query.username]) {
        ACTIVE_SOCKET_IO_SOCKETS[socket.handshake.query.username] = [];
    }
    ACTIVE_SOCKET_IO_SOCKETS[socket.handshake.query.username].push({
        id: socket.handshake.query.sessionId,
        token: socket.handshake.query.sessionToken,
        socket
    });
    socket.on("execute-command-response", (output) => {
        log(LOG_TYPES.INFO, output);
    });
    socket.on("disconnect", () => {
        ACTIVE_SOCKET_IO_SOCKETS[socket.handshake.query.username].forEach(() => {
            ACTIVE_SOCKET_IO_SOCKETS[socket.handshake.query.username].filter((sock) => sock.id !== socket.id);
        });
        log(LOG_TYPES.INFO, "[PSA-BACKEND]: Closing PSA connection");
    });
    return;
});
socketIo.use(async (socket, next) => {
    const { username, sessionToken } = socket.handshake.query;
    if (!username || !sessionToken)
        return socket.disconnect();
    if (!__internalGetSessionsDoNotUseOutsideOfCore()[username]) {
        try {
            const user = await new YourDashUnreadUser(username).read();
            __internalGetSessionsDoNotUseOutsideOfCore()[username] = (await user.getSessions()) || [];
        }
        catch (_err) {
            return socket.disconnect();
        }
    }
    if (__internalGetSessionsDoNotUseOutsideOfCore()[username].find((session) => session.sessionToken === sessionToken))
        return next();
    return socket.disconnect();
});
export { socketIo, ACTIVE_SOCKET_IO_SOCKETS };
if (PROCESS_ARGUMENTS["log-requests"])
    startRequestLogger(exp, { logOptionsRequests: !!PROCESS_ARGUMENTS["log-options-requests"] });
exp.use(cors());
exp.use(express.json({ limit: "50mb" }));
exp.use((_req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
});
process.stdin.on("data", (data) => {
    const commandAndArgs = data.toString().replaceAll("\n", "").replaceAll("\r", "").split(" ");
    const command = commandAndArgs[0];
    switch (command) {
        case "exit":
            CORE_HANDLE_SHUTDOWN();
            break;
        default:
            log(LOG_TYPES.ERROR, `Unknown command: ${command}`);
    }
});
exp.get("/", (_req, res) => res.send("Hello from the yourdash server software"));
exp.get("/test", (_req, res) => {
    const discoveryStatus = YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL;
    switch (discoveryStatus) {
        case YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE:
            return res.status(200).json({ status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE, type: "yourdash" });
        case YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL:
            return res.status(200).json({ status: YOURDASH_INSTANCE_DISCOVERY_STATUS.NORMAL, type: "yourdash" });
        default:
            log(LOG_TYPES.ERROR, "Discovery status returned an invalid value");
            return res.status(200).json({ status: YOURDASH_INSTANCE_DISCOVERY_STATUS.MAINTENANCE, type: "yourdash" });
    }
});
startAuthenticatedImageHelper(exp);
defineLoginEndpoints(exp);
exp.use(async (req, res, next) => {
    const { username, token } = req.headers;
    if (!username || !token) {
        return res.json({ error: "authorization fail" });
    }
    if (!__internalGetSessionsDoNotUseOutsideOfCore()[username]) {
        try {
            const user = await new YourDashUnreadUser(username).read();
            __internalGetSessionsDoNotUseOutsideOfCore()[username] =
                (await user.getSessions()) || [];
            const database = (await fs.readFile(path.resolve(user.getPath(), "./user_db.json"))).toString();
            if (database) {
                USER_DATABASES.set(username, JSON.parse(database));
            }
            else {
                USER_DATABASES.set(username, {});
                await fs.writeFile(path.resolve(user.getPath(), "./user_db.json"), JSON.stringify({}));
            }
        }
        catch (_err) {
            return res.json({ error: "authorization fail" });
        }
    }
    if (__internalGetSessionsDoNotUseOutsideOfCore()[username].find((session) => session.sessionToken === token)) {
        return next();
    }
    return res.json({ error: "authorization fail" });
});
exp.get("/core/sessions", async (req, res) => {
    const { username } = req.headers;
    const user = await new YourDashUnreadUser(username).read();
    return res.json({ sessions: await user.getSessions() });
});
exp.delete("/core/session/:id", async (req, res) => {
    const { username } = req.headers;
    const { id: sessionId } = req.params;
    const user = await new YourDashUnreadUser(username).read();
    user.getSession(parseInt(sessionId, 10)).invalidate();
    return res.json({ success: true });
});
exp.get("/core/personal-server-accelerator/sessions", async (req, res) => {
    const { username } = req.headers;
    const user = await new YourDashUnreadUser(username).read();
    return res.json({
        sessions: (await user.getSessions()).filter((session) => session.type === YOURDASH_SESSION_TYPE.desktop)
    });
});
exp.get("/core/personal-server-accelerator/", async (req, res) => {
    const { username } = req.headers;
    const unreadUser = new YourDashUnreadUser(username);
    try {
        return JSON.parse((await fs.readFile(path.resolve(unreadUser.getPath(), "personal_server_accelerator.json"))).toString());
    }
    catch (_err) {
        return res.json({
            error: `Unable to read ${username}/personal_server_accelerator.json`
        });
    }
});
exp.post("/core/personal-server-accelerator/", async (req, res) => {
    const { username } = req.headers;
    const body = req.body;
    const user = new YourDashUnreadUser(username);
    try {
        await fs.writeFile(path.resolve(user.getPath(), "personal_server_accelerator.json"), JSON.stringify(body));
    }
    catch (_err) {
        return res.json({ error: `Unable to write to ${username}/personal_server_accelerator.json` });
    }
    return res.json({ success: true });
});
defineUserDatabaseRoutes(exp);
defineCorePanelRoutes(exp);
defineUserEndpoints(exp);
startUserDatabaseService();
loadApplications(exp, socketIo);
//# sourceMappingURL=main.js.map