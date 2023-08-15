import chalk from "chalk";
import globalDatabase from "./globalDatabase.js";
export var logTypes;
(function (logTypes) {
    logTypes[logTypes["info"] = 0] = "info";
    logTypes[logTypes["warn"] = 1] = "warn";
    logTypes[logTypes["error"] = 2] = "error";
    logTypes[logTypes["success"] = 3] = "success";
})(logTypes || (logTypes = {}));
export const logHistory = [];
export default function log(type, ...message) {
    const logParams = [];
    if (globalDatabase.get("settings:log_should_log_time")) {
        const date = new Date();
        logParams.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10
            ? `${date.getSeconds()}0`
            : date.getSeconds()} `);
    }
    switch (type) {
        case logTypes.info:
            logParams.push(chalk.blue("INFO    "));
            break;
        case logTypes.warn:
            logParams.push(chalk.yellow("WARN    "));
            break;
        case logTypes.error:
            logParams.push(chalk.red("ERROR   "));
            break;
        case logTypes.success:
            logParams.push(chalk.green("SUCCESS "));
            break;
        default:
            break;
    }
    logParams.push(...message);
    logHistory.push({
        type: (type === logTypes.info
            ? "INFO"
            : type === logTypes.warn
                ? "WARN"
                : type === logTypes.error
                    ? "ERROR"
                    : type === logTypes.success ? "SUCCESS" : "UNKNOWN"),
        message: logParams.slice(1).map(msg => msg?.replace?.(/\x1b\[[0-9;]*m/g, "") || "LOGGING ERROR")
    });
    console.log(...logParams);
}
//# sourceMappingURL=log.js.map