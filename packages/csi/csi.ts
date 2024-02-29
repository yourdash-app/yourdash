/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// YourDash Client-Server interface Toolkit
import KeyValueDatabase from "@yourdash/shared/core/database";
import { io as SocketIoClient, Socket as SocketIoSocket } from "socket.io-client";
import CSIYourDashUser from "./user/user";

type ITJson = boolean | number | string | null | TJson | boolean[] | number[] | string[] | null[] | TJson[];

export type TJson = {
  [key: string]: ITJson;
};

export class UserDatabase extends KeyValueDatabase {
  constructor() {
    super();
  }

  set(key: string, value: ITJson) {
    super.set(key, value);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    csi.postJson("/core/user_db", this.keys, () => {
      return 0;
    });
  }
}

class __internalClientServerWebsocketConnection {
  endpointPath: string;
  connection: SocketIoSocket;

  constructor(endpointPath: string) {
    this.endpointPath = endpointPath;

    this.connection = SocketIoClient();

    return this;
  }
}

class __internalClientServerInteraction {
  userDB: UserDatabase;
  private user!: CSIYourDashUser;

  constructor() {
    this.userDB = new UserDatabase();

    return this;
  }

  getJson(
    endpoint: string,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    const username = localStorage.getItem("username") || "";
    const sessionToken = localStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "GET",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessionToken,
        ...(extraHeaders || {}),
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return resp.json();
        }

        throw new Error("not a valid JSON response");
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          if (resp.error === "authorization fail") {
            console.error("unauthorized request ", endpoint);
            window.location.href = "/";
            return;
          }
          console.error(`Error fetching from instance: (json) GET ${endpoint}, Error:`, resp.error);
          return;
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: (json) GET ${endpoint}`, err);
      });
  }

  postJson(
    endpoint: string,
    body: TJson,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    const username = localStorage.getItem("username") || "";
    const sessionToken = localStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessionToken,
        ...(extraHeaders || {}),
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return resp.json();
        }

        throw new Error("not a valid JSON response");
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          if (resp.error === "authorization fail") {
            console.error("unauthorized request ", endpoint);
            window.location.href = "/";
            return;
          }
          console.error(`Error fetching from instance: (json) POST ${endpoint}, Error:`, resp.error);
          return;
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: (json) POST ${endpoint}`, err);
      });
  }

  deleteJson(
    endpoint: string,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    const username = localStorage.getItem("username") || "";
    const sessionToken = localStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "DELETE",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessionToken,
        ...(extraHeaders || {}),
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") {
          return resp.json();
        }

        throw new Error("not a valid JSON response");
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          if (resp.error === "authorization fail") {
            console.error("unauthorized request ", endpoint);
            window.location.href = "/";
            return;
          }
          console.error(`Error fetching from instance: (json) DELETE ${endpoint}, Error:`, resp.error);
          return;
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: (json) DELETE ${endpoint}`, err);
      });
  }

  getText(
    endpoint: string,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    const username = localStorage.getItem("username") || "";
    const sessionToken = localStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "GET",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        username,
        token: sessionToken,
        ...(extraHeaders || {}),
      },
    })
      .then((resp) => {
        return resp.text();
      })
      .then((resp) => {
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: (txt) GET ${endpoint}`, err);
      });
  }

  postText(
    endpoint: string,
    body: TJson,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    const username = localStorage.getItem("username") || "";
    const sessionToken = localStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessionToken,
        ...(extraHeaders || {}),
      },
    })
      .then((resp) => resp.text())
      .then((resp) => {
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: (txt) POST ${endpoint}`, err);
      });
  }

  deleteText(
    endpoint: string,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    const username = localStorage.getItem("username") || "";
    const sessionToken = localStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "DELETE",
      mode: "cors",
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        username,
        token: sessionToken,
        ...(extraHeaders || {}),
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "text/plain; charset=utf-8") {
          return resp.text();
        }

        throw new Error("not a valid text response");
      })
      .then((resp) => {
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: (txt) DELETE ${endpoint}`, err);
      });
  }

  getInstanceUrl(): string {
    return localStorage.getItem("current_server") || "https://example.com";
  }

  getInstanceWebsocketUrl(): string {
    return localStorage.getItem("current_server") || "wss://example.com";
  }

  getUserName(): string {
    return localStorage.getItem("username") || "";
  }

  async getUserDB(): Promise<UserDatabase> {
    return new Promise((resolve) => {
      this.getJson("/core/user_db", (data) => {
        this.userDB.clear();
        // @ts-ignore
        this.userDB.keys = data;

        resolve(this.userDB);
      });
    });
  }

  setUserDB(database: KeyValueDatabase): Promise<KeyValueDatabase> {
    return new Promise<KeyValueDatabase>((resolve, reject) => {
      const previousKeys = this.userDB.keys;
      this.postJson(
        "/core/user_db",
        database.keys,
        () => {
          this.userDB.keys = database.keys;

          resolve(this.userDB);
        },
        () => {
          this.userDB.keys = previousKeys;

          reject("Unable to save the user database to the server");
        },
      );
    });
  }

  getUser() {
    return this.user;
  }

  getTeam(teamName: string) {
    // TODO: implement THIS next!!!!
    //       @ewsgit

    return teamName;
  }

  logout(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("session_token");
  }

  openWebsocketConnection(path: string) {
    return new __internalClientServerWebsocketConnection(path);
  }
}

const csi = new __internalClientServerInteraction();
export default csi;

// @ts-ignore
window.csi = csi;

// @ts-ignore
csi.user = new CSIYourDashUser();
