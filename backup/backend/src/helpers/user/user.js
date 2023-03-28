"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../../index.js");
var path_1 = require("path");
var fileSystem_js_1 = require("../../fileSystem/fileSystem.js");
var encryption_js_1 = require("../encryption.js");
var fs = require("fs");
var User = {
    create: function (username, password, options) {
        var userFolder = fileSystem_js_1.default.createFolder(this.getPath(username)).write();
        userFolder.createFile("user.json").setContent(JSON.stringify({
            name: options.name,
            username: username,
            permissions: options.permissions
        })).write();
        (0, encryption_js_1.hash)(password).then(function (pass) {
            userFolder.createFile("password.enc").setContent(pass).write();
        });
        userFolder.createFile("avatar").setContent(fs.readFileSync(path_1.default.resolve("".concat(index_js_1.FILESYSTEM_ROOT, "/../src/defaultAssets/avatar.png")))).write();
    },
    remove: function (username) {
        fileSystem_js_1.default.openFolder(this.getPath(username)).delete();
    },
    getPath: function (username) {
        return path_1.default.join(index_js_1.FILESYSTEM_ROOT, "/users/", username);
    }
};
exports.default = User;
