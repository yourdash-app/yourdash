/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { type Instance } from "./main.js";

export enum YourDashSessionType {
  WEB,
  NEXTCLOUD_COMPATIBILITY,
}

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

  private __internal_generateSessionToken(username: string, sessionType: YourDashSessionType) {
    let sessionToken = "";
    function generateStringOfLength(length: number) {
      let output = "";
      const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890-/+=_-~#@'!$%^&*(){}[]<>?¬`|\\.,:;";

      function getRandomIntInclusive(min: number, max: number) {
        const randomBuffer = new Uint32Array(1);

        self.crypto.getRandomValues(randomBuffer);

        let randomNumber = randomBuffer[0] / (0xffffffff + 1);

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(randomNumber * (max - min + 1)) + min;
      }

      let array: number[] = [];

      while (array.length < length) {
        array.push(getRandomIntInclusive(0, characters.length - 1));
      }

      for (const num of array) {
        output += characters[num];
      }

      return output;
    }

    switch (sessionType) {
      case YourDashSessionType.WEB:
        sessionToken = `WEB_${generateStringOfLength(128)}_YOURDASH_SESSION`;
        break;
      case YourDashSessionType.NEXTCLOUD_COMPATIBILITY:
        sessionToken = `unimplemented session token generation!`;
        break;
    }

    this.instance.database.query("UPDATE users SET session_tokens = array_append(session_tokens, $1) WHERE username = $2;", [
      sessionToken,
      username,
    ]);

    return sessionToken;
  }

  // TODO: implement me
  // check the sessionToken is valid for the user
  async authorizeUser(username: string, sessionToken: string): Promise<boolean> {
    return false;
  }

  // TODO: implement me
  // generate a sessionToken if the username and password are valid, else return null
  async authenticateUser(username: string, password: string): Promise<string | null> {
    this.__internal_generateSessionToken(username, YourDashSessionType.WEB);

    if (this) return "";

    return null;
  }
}

export default Authorization;
