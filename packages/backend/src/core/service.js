export var YOURDASH_SERVICE_STARTUP_TYPE;
(function (YOURDASH_SERVICE_STARTUP_TYPE) {
    YOURDASH_SERVICE_STARTUP_TYPE[YOURDASH_SERVICE_STARTUP_TYPE["STARTUP"] = 0] = "STARTUP";
    YOURDASH_SERVICE_STARTUP_TYPE[YOURDASH_SERVICE_STARTUP_TYPE["MANUAL"] = 1] = "MANUAL";
    YOURDASH_SERVICE_STARTUP_TYPE[YOURDASH_SERVICE_STARTUP_TYPE["SHUT_DOWN"] = 2] = "SHUT_DOWN";
    YOURDASH_SERVICE_STARTUP_TYPE[YOURDASH_SERVICE_STARTUP_TYPE["POST_STARTUP"] = 3] = "POST_STARTUP";
    YOURDASH_SERVICE_STARTUP_TYPE[YOURDASH_SERVICE_STARTUP_TYPE["DATE_TIME"] = 4] = "DATE_TIME";
})(YOURDASH_SERVICE_STARTUP_TYPE || (YOURDASH_SERVICE_STARTUP_TYPE = {}));
export default class YourDashService {
    name;
    displayName;
    description;
    startupType;
    constructor(configuration) {
        this.name = configuration.name;
        this.displayName = configuration.displayName;
        this.description = configuration.description;
    }
}
//# sourceMappingURL=service.js.map