import cors from "cors";
import express from "express";
import path from "path";
import { compareHash, generateRandomStringOfLength } from "./helpers/encryption.js";
import * as fs from "fs";
import { YourDashCorePermissions } from "./helpers/user/types.js";
import User from "./helpers/user/user.js";
import Fs from "./fileSystem/fileSystem.js";
import { getApplicationMetadata, getInstallableApplications, getInstalledApplications, loadApplication } from "./appManager/applications.js";
const app = express();
const FILESYSTEM_ROOT = path.resolve("./fs/");
const USER_SESSION_CACHE = [];
const INSTANCE_URL = "http://localhost:3560";
if (!fs.existsSync(path.resolve(FILESYSTEM_ROOT))) {
    fs.cpSync(path.resolve(`./defaultFs/`), path.resolve(FILESYSTEM_ROOT), { recursive: true });
    User.create("admin", "admin", {
        name: { first: "Admin", last: "istrator" },
        permissions: [YourDashCorePermissions.Administrator]
    });
}
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use((_req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
});
getInstalledApplications().forEach(app => loadApplication(app));
app.get(`/`, (_req, res) => {
    return res.redirect(`https://yourdash.vercel.app`);
});
app.get(`/test`, (_req, res) => {
    return res.send(`YourDash instance`);
});
app.get("/api/instance/login/background", (_req, res) => {
    return res.sendFile(path.resolve(`${FILESYSTEM_ROOT}/background`));
});
app.get("/api/instance/login/logo", (_req, res) => {
    return res.sendFile(path.resolve(`${FILESYSTEM_ROOT}/logo`));
});
app.get("/api/instance/login/name", (_req, res) => {
    return res.send(`Yourdash instance`);
});
app.get("/api/instance/login/message", (_req, res) => {
    return res.send(`This instance is new, welcome to YourDash`);
});
app.post("/api/instance/login/login", (req, res) => {
    let { username, password } = req.body;
    if (!username || !password)
        return res.json({ error: true });
    let hashedPassword = Fs.openFile(User.getPath(username), "password.enc").read();
    compareHash(hashedPassword, password).then(resp => {
        if (resp) {
            let token = generateRandomStringOfLength(128);
            USER_SESSION_CACHE[username] = token;
            return res.json({ token });
        }
        return res.json({ error: `The received password doesn't match` });
    }).catch(() => { return res.json({ error: `Unable to compare password` }); });
});
app.use((req, res, next) => {
    let { username, sessiontoken } = req.headers;
    let { u: usernameQuery, t: sessiontokenQuery } = req.query;
    if (usernameQuery)
        username = usernameQuery;
    if (sessiontokenQuery)
        sessiontoken = sessiontokenQuery;
    if (!username || !sessiontoken)
        return res.json({ error: `Unauthorized request` });
    if (USER_SESSION_CACHE?.[username] === sessiontoken) {
        return next();
    }
    return res.json({ error: `Unauthorized request` });
});
app.get(`/api/current/user`, (req, res) => {
    let { username } = req.headers;
    return res.json({
        avatar: `${INSTANCE_URL}/current/user/avatar`,
        ...JSON.parse(Fs.openFolder(User.getPath(username)).openFile(`user.json`).read())
    });
});
app.get(`/api/current/user/avatar`, (req, res) => {
    let { u: username } = req.query;
    return res.sendFile(Fs.openFolder(User.getPath(username)).openFile(`avatar`).getPath());
});
app.get(`/api/panel/launcher/applications`, (_req, res) => {
    return res.json([
        ...getInstallableApplications().map(app => {
            return getApplicationMetadata(app);
        })
    ]);
});
app.listen(3560, () => {
    console.log(`Yourdash backend listening on port 3560`);
});
export { FILESYSTEM_ROOT };
