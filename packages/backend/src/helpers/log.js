import chalk from "chalk";
import globalDatabase from "./globalDatabase.js";
export var LOG_TYPES;
(function (LOG_TYPES) {
    LOG_TYPES[LOG_TYPES["INFO"] = 0] = "INFO";
    LOG_TYPES[LOG_TYPES["WARNING"] = 1] = "WARNING";
    LOG_TYPES[LOG_TYPES["ERROR"] = 2] = "ERROR";
    LOG_TYPES[LOG_TYPES["SUCCESS"] = 3] = "SUCCESS";
})(LOG_TYPES || (LOG_TYPES = {}));
export const LOG_HISTORY = [];
export default function log(type, ...message) {
    const logParams = [];
    if (globalDatabase.get("settings:log_should_log_time")) {
        const date = new Date();
        logParams.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10
            ? `${date.getSeconds()}0`
            : date.getSeconds()} `);
    }
    switch (type) {
        case LOG_TYPES.INFO:
            logParams.push(chalk.blue("INFO    "));
            break;
        case LOG_TYPES.WARNING:
            logParams.push(chalk.yellow("WARN    "));
            break;
        case LOG_TYPES.ERROR:
            logParams.push(chalk.red("ERROR   "));
            break;
        case LOG_TYPES.SUCCESS:
            logParams.push(chalk.green("SUCCESS "));
            break;
        default:
            break;
    }
    logParams.push(...message);
    LOG_HISTORY.push({
        type: (type === LOG_TYPES.INFO
            ? "INFO"
            : type === LOG_TYPES.WARNING
                ? "WARN"
                : type === LOG_TYPES.ERROR
                    ? "ERROR"
                    : type === LOG_TYPES.SUCCESS ? "SUCCESS" : "UNKNOWN"),
        message: logParams.slice(1).map(msg => msg?.replace?.(/\x1b\[[0-9;]*m/g, "") || "LOGGING ERROR")
    });
    console.log(...logParams);
}
//# sourceMappingURL=log.js.map