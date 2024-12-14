/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Log from "./log.js";
import RequestManager from "./requestManager.js";

class Instance {
  flags: {
    isDebugMode: boolean;
    logQueryParameters: boolean;
    logOptionsRequests: boolean;
    isDevMode: boolean;
  };
  log: Log;
  requestManager: RequestManager;

  constructor() {
    // FLAGS FOR DEVELOPMENT FEATURES
    this.flags = {
      isDebugMode: false,
      logOptionsRequests: false,
      logQueryParameters: false,
      isDevMode: true,
    };

    this.log = new Log();
    this.requestManager = new RequestManager();
  }

  startup() {
    this.log.info("startup", "YourDash Instance Startup Complete");
  }
}

const instance = new Instance();

export default instance;

/*
 *https://fastify-vite.dev/guide/getting-started
 *https://github.com/fastify/fastify-schedule
 *https://github.com/fastify/session
 *https://github.com/fastify/fastify-websocket
 *https://github.com/turkerdev/fastify-type-provider-zod
 *https://github.com/fastify/fastify-cors
 *https://github.com/fastify/fastify-cookie
 *https://github.com/fastify/fastify-express
 *https://node-postgres.com/
 *https://github.com/fastify/fastify-auth
 *https://fastify.dev/docs/latest/Reference/Hooks/#hooks
 *http://localhost:3563/swagger
 */
