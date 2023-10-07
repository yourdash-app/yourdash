"use strict";
/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var minimist_1 = require("minimist");
var chalk_1 = require("chalk");
var centerTerminalOutputOnLine_js_1 = require("backend/src/helpers/terminal/centerTerminalOutputOnLine.js");
console.log((0, centerTerminalOutputOnLine_js_1.default)(chalk_1.default.whiteBright("YourDash CLI v0.0.1")));
// eslint-disable-next-line no-magic-numbers
var args = (0, minimist_1.default)(process.argv.slice(2));
console.log("Starting with arguments: ".concat(JSON.stringify(args)));
if (!args.dev && args.compile) {
    var childProcess_1 = (0, child_process_1.exec)("yarn run compile");
    childProcess_1.stdout.on("data", function (data) {
        if (data.toString() === "$ tsc\n") {
            return;
        }
        if (data.toString() === "\x1Bc") {
            return;
        }
        if (data.toString() === "") {
            return;
        }
        console.log("[".concat(chalk_1.default.bold.blue("TSC"), "]: ").concat(data.toString().replaceAll("\n", "").replaceAll("\x1Bc", "").replaceAll("error", "".concat(chalk_1.default.bold.redBright("ERROR")))));
    });
    childProcess_1.stderr.on("data", function (data) {
        if (data.toString() === "$ tsc\n") {
            return;
        }
        if (data.toString() === "\x1Bc") {
            return;
        }
        if (data.toString() === "") {
            return;
        }
        console.log("[".concat(chalk_1.default.bold.blue("TSC ERROR"), "]: ").concat(data.toString()
            .replaceAll("\n", "")
            .replaceAll("\x1Bc", "")
            .replaceAll("error", "".concat(chalk_1.default.bold.redBright("ERROR")))));
    });
    process.on("exit", function () {
        console.log("".concat(chalk_1.default.yellow.bold("CORE"), ": Server about to exit!"));
        if (childProcess_1 && !childProcess_1.killed) {
            console.log("".concat(chalk_1.default.yellow.bold("CORE"), ": Killing child process [ ").concat(childProcess_1.pid, " ] (").concat(chalk_1.default.bold.blue("TSC"), ")"));
            childProcess_1.kill();
        }
    });
}
function startDevServer() {
    var DEV_COMMAND = "nodemon ./src/main.ts -- ".concat(args.debug ? "--inspect-brk " : "", "--color=full ").concat(process.argv.slice(2).join(" "));
    console.log("[".concat(chalk_1.default.hex("#fc6f45").bold("DEV"), "]: ").concat(DEV_COMMAND));
    var devProcess = (0, child_process_1.exec)(DEV_COMMAND);
    devProcess.on("exit", function (code) {
        console.log("child process exited with code ".concat(code, ", will not auto-restart!"));
    });
    devProcess.stdout.on("data", function (data) {
        // remove all messages from nodemon
        if (data.toString().includes("[nodemon]")) {
            return;
        }
        if (data.toString().includes("Shutting down... ( restart should occur automatically )")) {
            devProcess.stdin.write("rs");
        }
        process.stdout.write(data);
    });
    devProcess.stderr.on("data", function (data) {
        if (data.toString().indexOf("warning From Yarn 1.0 onwards, scripts don't require \"--\" for options to be forwarded. In a future version, any explicit \"--\" will be forwarded as-is to the scripts.") !==
            -1) {
            return;
        }
        process.stdout.write(data);
    });
    process.stdin.on("data", function (chunk) {
        devProcess.stdin.write(chunk);
    });
    process.stdin.on("end", function () {
        devProcess.stdin.end();
    });
}
if (args.dev) {
    startDevServer();
}
else {
    await Promise.resolve().then(function () { return require("./main.js"); });
}
