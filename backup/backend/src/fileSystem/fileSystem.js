"use strict";
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
var fs = require("fs");
var nodePath = require("path");
var Fs = {
    createFile: function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        return new FileSystemFile(path);
    },
    createFolder: function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        return new FileSystemFolder(path);
    },
    openFile: function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        var contents = fs.readFileSync(nodePath.resolve(nodePath.join.apply(nodePath, path)));
        return new FileSystemFile(path, contents);
    },
    openFolder: function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        return new FileSystemFolder(path);
    },
};
var FileSystemFile = /** @class */ (function () {
    function FileSystemFile(path, content) {
        this.path = nodePath.join.apply(nodePath, path);
        this.content = content || "";
    }
    FileSystemFile.prototype.write = function () {
        try {
            fs.writeFileSync(nodePath.resolve(this.path), this.content);
        }
        catch (err) {
            console.error(err);
        }
        return this;
    };
    FileSystemFile.prototype.read = function () {
        return this.content.toString();
    };
    FileSystemFile.prototype.readRaw = function () {
        return this.content;
    };
    FileSystemFile.prototype.setContent = function (content) {
        this.content = content;
        return this;
    };
    FileSystemFile.prototype.move = function (path) {
        try {
            try {
                fs.rmSync(this.path);
            }
            catch (err) {
                return this;
            }
            this.path = nodePath.join.apply(nodePath, path);
            fs.writeFileSync(nodePath.resolve(this.path), this.content);
        }
        catch (err) {
            console.error(err);
        }
        return this;
    };
    FileSystemFile.prototype.delete = function () {
        try {
            fs.rmSync(this.path);
        }
        catch (err) {
            console.error(err);
        }
        return null;
    };
    FileSystemFile.prototype.getPath = function () {
        return this.path;
    };
    return FileSystemFile;
}());
var FileSystemFolder = /** @class */ (function () {
    function FileSystemFolder(path) {
        this.path = nodePath.join.apply(nodePath, path);
    }
    FileSystemFolder.prototype.write = function () {
        try {
            fs.mkdirSync(nodePath.resolve(this.path), { recursive: true });
        }
        catch (err) {
            console.error(err);
        }
        return this;
    };
    FileSystemFolder.prototype.read = function () {
        try {
            return fs.readdirSync(nodePath.resolve(this.path));
        }
        catch (err) {
            console.error(err);
        }
        return null;
    };
    FileSystemFolder.prototype.move = function (path) {
        try {
            fs.cpSync(nodePath.resolve(this.path), nodePath.join.apply(nodePath, path), { recursive: true });
            fs.rmSync(this.path);
            this.path = nodePath.join.apply(nodePath, path);
        }
        catch (err) {
            console.error(err);
        }
        return this;
    };
    FileSystemFolder.prototype.delete = function () {
        try {
            fs.rmdirSync(this.path);
        }
        catch (err) {
            console.error(err);
        }
        return null;
    };
    FileSystemFolder.prototype.createFile = function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        return new FileSystemFile(__spreadArray([this.path], path, true));
    };
    FileSystemFolder.prototype.openFile = function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        var contents = fs.readFileSync(nodePath.resolve(nodePath.join.apply(nodePath, __spreadArray([this.path], path, false))));
        return new FileSystemFile(__spreadArray([this.path], path, true), contents);
    };
    FileSystemFolder.prototype.getPath = function () {
        return this.path;
    };
    return FileSystemFolder;
}());
exports.default = Fs;
