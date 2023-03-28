"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILESYSTEM_ROOT = void 0;
var cors_1 = require("cors");
var express_1 = require("express");
var path_1 = require("path");
var encryption_js_1 = require("./helpers/encryption.js");
var fs = require("fs");
var types_js_1 = require("./helpers/user/types.js");
var user_js_1 = require("./helpers/user/user.js");
var fileSystem_js_1 = require("./fileSystem/fileSystem.js");
var applications_js_1 = require("./appManager/applications.js");
var app = (0, express_1.default)();
var FILESYSTEM_ROOT = path_1.default.resolve("./fs/");
exports.FILESYSTEM_ROOT = FILESYSTEM_ROOT;
var USER_SESSION_CACHE = [];
// TODO: load from a config file
var INSTANCE_URL = "http://localhost:3560";
if (!fs.existsSync(path_1.default.resolve(FILESYSTEM_ROOT))) {
    fs.cpSync(path_1.default.resolve("./defaultFs/"), path_1.default.resolve(FILESYSTEM_ROOT), { recursive: true });
    user_js_1.default.create("admin", "admin", {
        name: { first: "Admin", last: "istrator" },
        permissions: [types_js_1.YourDashCorePermissions.Administrator]
    });
}
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "25mb" }));
app.use(function (_req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});
(0, applications_js_1.getInstalledApplications)().forEach(function (app) { return (0, applications_js_1.loadApplication)(app); });
// #region allows use without authentication
app.get("/", function (_req, res) {
    return res.redirect("https://yourdash.vercel.app");
});
app.get("/test", function (_req, res) {
    return res.send("YourDash instance");
});
app.get("/api/instance/login/background", function (_req, res) {
    return res.sendFile(path_1.default.resolve("".concat(FILESYSTEM_ROOT, "/background")));
});
app.get("/api/instance/login/logo", function (_req, res) {
    return res.sendFile(path_1.default.resolve("".concat(FILESYSTEM_ROOT, "/logo")));
});
app.get("/api/instance/login/name", function (_req, res) {
    // TODO: save and load the actual instance name
    return res.send("Yourdash instance");
});
app.get("/api/instance/login/message", function (_req, res) {
    // TODO: save and load the actual instance message
    return res.send("This instance is new, welcome to YourDash");
});
// @ts-ignore
app.post("/api/instance/login/login", function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    if (!username || !password)
        return res.json({ error: true });
    var hashedPassword = fileSystem_js_1.default.openFile(user_js_1.default.getPath(username), "password.enc").read();
    (0, encryption_js_1.compareHash)(hashedPassword, password).then(function (resp) {
        if (resp) {
            var token = (0, encryption_js_1.generateRandomStringOfLength)(128);
            USER_SESSION_CACHE[username] = token;
            return res.json({ token: token });
        }
        return res.json({ error: "The received password doesn't match" });
    }).catch(function () { return res.json({ error: "Unable to compare password" }); });
});
// #endregion
// check for authentication
app.use(function (req, res, next) {
    var _a = req.headers, username = _a.username, sessiontoken = _a.sessiontoken;
    var _b = req.query, usernameQuery = _b.u, sessiontokenQuery = _b.t;
    if (usernameQuery)
        username = usernameQuery;
    if (sessiontokenQuery)
        sessiontoken = sessiontokenQuery;
    if (!username || !sessiontoken)
        return res.json({ error: "Unauthorized request" });
    if ((USER_SESSION_CACHE === null || USER_SESSION_CACHE === void 0 ? void 0 : USER_SESSION_CACHE[username]) === sessiontoken) {
        return next();
    }
    return res.json({ error: "Unauthorized request" });
});
app.get("/api/current/user", function (req, res) {
    var username = req.headers.username;
    return res.json(__assign({ avatar: "".concat(INSTANCE_URL, "/current/user/avatar") }, JSON.parse(fileSystem_js_1.default.openFolder(user_js_1.default.getPath(username)).openFile("user.json").read())));
});
app.get("/api/current/user/avatar", function (req, res) {
    var username = req.query.u;
    return res.sendFile(fileSystem_js_1.default.openFolder(user_js_1.default.getPath(username)).openFile("avatar").getPath());
});
app.get("/api/panel/launcher/applications", function (_req, res) {
    return res.json(__spreadArray([], (0, applications_js_1.getInstallableApplications)().map(function (app) {
        return (0, applications_js_1.getApplicationMetadata)(app);
    }), true));
});
app.listen(3560, function () {
    console.log("Yourdash backend listening on port 3560");
});
