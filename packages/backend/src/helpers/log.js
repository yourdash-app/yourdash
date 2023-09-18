import chalk from "chalk";
import globalDatabase from "./globalDatabase.js";
export var logType;
(function (logType) {
    logType[logType["INFO"] = 0] = "INFO";
    logType[logType["WARNING"] = 1] = "WARNING";
    logType[logType["ERROR"] = 2] = "ERROR";
    logType[logType["SUCCESS"] = 3] = "SUCCESS";
})(logType || (logType = {}));
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
        case logType.INFO:
            logParams.push(chalk.blue("INFO    "));
            break;
        case logType.WARNING:
            logParams.push(chalk.yellow("WARN    "));
            break;
        case logType.ERROR:
            logParams.push(chalk.red("ERROR   "));
            break;
        case logType.SUCCESS:
            logParams.push(chalk.green("SUCCESS "));
            break;
        default:
            break;
    }
    logParams.push(...message);
    if (type === logType.ERROR) {
        logParams.push("\n" + new Error(...message).stack);
    }
    else {
        LOG_HISTORY.push({
            type: type === logType.INFO
                ? "INFO"
                : type === logType.WARNING
                    ? "WARN"
                    : type === logType.SUCCESS
                        ? "SUCCESS"
                        : "UNKNOWN",
            message: logParams.slice(1).map(msg => msg?.replace?.(/\x1b\[[0-9;]*m/g, "") || "LOGGING ERROR")
        });
    }
    console.log(...logParams);
}
//# sourceMappingURL=log.js.map