import { Server as SocketIOServer } from "socket.io";
import log, { LOG_TYPES } from "../helpers/log.js";
class YourDashWebsocketManager {
    servers;
    httpServer;
    constructor(app, httpServer) {
        this.servers = {};
        this.httpServer = httpServer;
    }
    _selfDestruct() {
        Object.keys(this.servers).map(async (appName) => {
            if ((await this.servers[appName].server.fetchSockets()).length === 0) {
                this.servers[appName].server.close();
                delete this.servers[appName];
                log(LOG_TYPES.INFO, `[YourDashWebsocketManager] ${appName} was closed as it has no clients connected.`);
            }
            else {
                log(LOG_TYPES.INFO, `[YourDashWebsocketManager] ${appName} is connected with ${Object.keys(this.servers[appName].server.fetchSockets()).length} clients.`);
            }
        });
    }
    createServer(appName) {
        const server = new SocketIOServer(this.httpServer, {
            path: `/core/app/${appName}/`,
            cors: { origin: "*" }
        });
        this.servers[appName] = {
            server,
            connections: []
        };
        log(LOG_TYPES.INFO, `[YourDashWebsocketManager] ${appName} was created.`);
        return server;
    }
    getServer(appName) {
        return this.servers[appName];
    }
    closeServer(appName) {
        this.servers[appName].server.close();
    }
}
export default class YourDashApi {
    websocket;
    constructor(app, httpServer) {
        this.websocket = new YourDashWebsocketManager(app, httpServer);
        return this;
    }
}
//# sourceMappingURL=yourDashApi.js.map