/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { type Instance } from "./main.js";

class Authorization {
  instance: Instance;

  constructor(instance: Instance) {
    this.instance = instance;

    return;
  }

  async __internal_authHook() {
    try {
      // @ts-ignore
      this.instance.requestManager.app.addHook("onRequest", async (req, res) => {
        for (const route of this.instance.requestManager.publicRoutes) {
          if (req.originalUrl.startsWith(route)) return;
        }

        const authorization = req.cookies["authorization"];

        if (!authorization) return res.status(401).send({ unauthorized: true });

        const [username, sessionToken] = authorization.split(" ");

        if (!(await this.authorizeUser(username, sessionToken))) return res.status(401).send({ unauthorized: true });
      });
    } catch (err) {
      console.error(err);
    }
  }

  // check the sessionToken is valid for the user
  async authorizeUser(username: string, sessionToken: string): Promise<boolean> {
    return false;
  }

  // generate a sessionToken if the username and password are valid, else return null
  async authenticateUser(username: string, password: string): Promise<string | null> {
    if (this) return "";

    return null;
  }
}

export default Authorization;
