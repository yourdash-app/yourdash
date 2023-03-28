"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.getApplicationMetadata = exports.loadApplication = exports.getInstalledApplications = exports.getInstallableApplications = void 0;
var fs = require("fs");
var path_1 = require("path");
var fileSystem_js_1 = require("../fileSystem/fileSystem.js");

function getInstallableApplications() {
    return fs.readdirSync(path_1.default.resolve("./src/appManager/", "apps"));
}

exports.getInstallableApplications = getInstallableApplications;

function getInstalledApplications() {
    return fs.readdirSync(path_1.default.resolve("./src/appManager/", "apps"));
}

exports.getInstalledApplications = getInstalledApplications;

function loadApplication(name) {
    if (getInstallableApplications().indexOf(name) === -1)
        return;
    var filePath = path_1.default.resolve('./src/appManager/promo-apps', name, 'index.js');
    var fileUrl = "file:///".concat(filePath.replace(/\\/g, '/'));
    Promise.resolve("".concat(fileUrl)).then(function (s) {
        return require(s);
    }).then(function (imp) {
        return imp.default();
    });
}

exports.loadApplication = loadApplication;

function getApplicationMetadata(applicationName) {
    return JSON.parse(fileSystem_js_1.default.openFolder("./src/appManager/", "promo-apps/", applicationName).openFile("application.json").read());
}

exports.getApplicationMetadata = getApplicationMetadata;
