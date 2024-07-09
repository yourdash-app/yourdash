/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// YourDash Client-Server interface Toolkit
import KeyValueDatabase from "@yourdash/shared/core/database";
import { io as SocketIoClient, Socket as SocketIoSocket } from "socket.io-client";
import BrowserPath from "./browserPath.js";
import CSIYourDashTeam from "./team/team";
import CSIYourDashUser from "./user/user";

type ITJson = boolean | number | string | null | TJson | boolean[] | number[] | string[] | null[] | TJson[];

export type TJson = {
  [key: string]: ITJson;
};

export class UserDatabase extends KeyValueDatabase {
  constructor() {
    super();
  }

  set(key: string, value: unknown) {
    super.set(key, value);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    csi.postJson("/core/user_db", this.keys, () => {
      return 0;
    });

    return this;
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
  path: BrowserPath;
  private user!: CSIYourDashUser;

  constructor() {
    this.userDB = new UserDatabase();
    this.path = new BrowserPath();

    return this;
  }

  async getJson<ResponseType extends object>(
    endpoint: string,
    extraHeaders?: {
      [key: string]: string;
    },
  ): Promise<ResponseType> {
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    return new Promise<ResponseType>((resolve, reject) => {
      console.log(`${instanceUrl}${endpoint}`);
      fetch(`${instanceUrl}${endpoint}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          username,
          sessionId: sessionId,
          token: sessionToken,
          ...(extraHeaders || {}),
        },
      })
        .then((resp) => {
          if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") {
            return resp.json();
          }

          reject("not a valid JSON response");
        })
        .then((resp) => {
          if (resp?.error) {
            reject(resp.error);
            if (resp.error === "authorization fail") {
              console.error("unauthorized request ", endpoint);
              window.location.href = "/";
              return;
            }
            console.error(`Error fetching from instance: (json) GET ${endpoint}, Error:`, resp.error);
            return;
          }

          resolve(resp);
        })
        .catch((err) => {
          console.error(`Error parsing result from instance: (json) GET ${endpoint}`, err);

          reject(err);
        });
    });
  }

  syncGetJson(
    endpoint: string,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    fetch(`${instanceUrl}${endpoint}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        token: sessionToken,
        sessionId: sessionId,
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

  postJson<ResponseType extends object>(
    endpoint: string,
    body: TJson,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): Promise<ResponseType> {
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    return new Promise<ResponseType>((resolve, reject) => {
      fetch(`${instanceUrl}${endpoint}`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          username,
          sessionId: sessionId,
          token: sessionToken,
          ...(extraHeaders || {}),
        },
      })
        .then((resp) => {
          if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") {
            return resp.json();
          }

          reject("not a valid JSON response");
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

          resolve(resp);
        })
        .catch((err) => {
          console.error(`Error parsing result from instance: (json) POST ${endpoint}`, err);
        });
    });
  }

  syncPostJson(
    endpoint: string,
    body: TJson,
    // eslint-disable-next-line
    cb: (response: any) => void,
    error?: (response: string) => void,
    extraHeaders?: {
      [key: string]: string;
    },
  ): void {
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    fetch(`${instanceUrl}${endpoint}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        sessionId: sessionId,
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
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    fetch(`${instanceUrl}${endpoint}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        sessionId: sessionId,
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
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    fetch(`${instanceUrl}${endpoint}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        username,
        sessionId: sessionId,
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
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    fetch(`${instanceUrl}${endpoint}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        username,
        sessionId: sessionId,
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
    const instanceUrl = this.getInstanceUrl();
    const username = this.getUsername();
    const sessionToken = this.getUserToken();
    const sessionId = this.getSessionId();

    fetch(`${instanceUrl}${endpoint}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        username,
        sessionId: sessionId,
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

  // returns the URL of the current instance
  getInstanceUrl(): string {
    return localStorage.getItem("instance_url") || "";
  }

  // sets the URL of the current instance
  setInstanceUrl(url: string) {
    let newInstanceUrl = url;

    if (newInstanceUrl.endsWith("/")) {
      newInstanceUrl = newInstanceUrl.slice(0, -1);
    }

    if (!new RegExp(":\\d{1,5}$").test(newInstanceUrl)) {
      newInstanceUrl = newInstanceUrl + ":3563";
    }

    localStorage.setItem("instance_url", newInstanceUrl || "ERROR");

    return this;
  }

  // returns the Websocket version of the URL of the current instance
  getInstanceWebsocketUrl(): string {
    console.log(localStorage.getItem("instance_url"));

    return localStorage.getItem("instance_url")?.replace("http", "ws").replace("https", "wss") || "";
  }

  // returns the list of saved instance's urls
  getSavedInstances(): string[] {
    return JSON.parse(localStorage.getItem("saved_instances") || "[]");
  }

  // adds an instance to the list of saved instances
  addSavedInstance(instanceUrl: string) {
    const savedInstances = this.getSavedInstances();
    if (!savedInstances.includes(instanceUrl)) {
      savedInstances.push(instanceUrl);
      localStorage.setItem("saved_instances", JSON.stringify(savedInstances));
    }
  }

  // removes an instance from the list of saved instances by its url
  removeSavedInstance(instanceUrl: string) {
    const savedInstances = this.getSavedInstances();
    if (savedInstances.includes(instanceUrl)) {
      savedInstances.splice(savedInstances.indexOf(instanceUrl), 1);
      localStorage.setItem("saved_instances", JSON.stringify(savedInstances));
    }
  }

  // clears the list of saved instances
  clearSavedInstances() {
    localStorage.setItem("saved_instances", "[]");
  }

  // returns an array of usernames that have previously logged in with this instance
  getSavedLoginsForInstance(instanceUrl: string): string[] {
    const savedLogins = localStorage.getItem(`saved_logins_for_${instanceUrl}`) || "[]";
    return JSON.parse(savedLogins);
  }

  // get the username of the currently logged-in user
  getUsername(): string {
    return localStorage.getItem("current_user_username") || "";
  }

  setUsername(username: string) {
    localStorage.setItem("current_user_username", username);

    return this;
  }

  getSessionId(): string {
    return sessionStorage.getItem("session_id") || "0";
  }

  setSessionId(sessionId: string) {
    sessionStorage.setItem("session_id", sessionId);

    return this;
  }

  // get the login session token of the currently logged-in user
  getUserToken(): string {
    return sessionStorage.getItem("session_token") || "";
  }

  setUserToken(token: string) {
    sessionStorage.setItem("session_token", token);

    return this;
  }

  // get the user database for the currently logged-in user
  async getUserDB(): Promise<UserDatabase> {
    return new Promise((resolve) => {
      this.syncGetJson("/core/user_db", (data) => {
        this.userDB.clear();
        this.userDB.keys = data;

        resolve(this.userDB);
      });
    });
  }

  // set a key in the currently logged-in user's database
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

  // get the currently logged-in user
  getUser() {
    return this.user;
  }

  // returns a list of teams that the current user is a part of
  getTeams(): Promise<CSIYourDashTeam[]> {
    return new Promise((resolve, reject) => {
      this.syncGetJson(
        "/core/user/current/teams",
        (data: string[]) => {
          resolve(data.map((tn) => this.getTeam(tn)));
        },
        () => {
          reject([]);
        },
      );
    });
  }

  // get a YourDash team by its id
  getTeam(teamId: string) {
    return new CSIYourDashTeam(teamId);
  }

  // logout the current user
  logout(): void {
    localStorage.removeItem("current_user_username");
    sessionStorage.removeItem("session_token");
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
