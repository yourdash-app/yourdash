// YourDash Client-Server interface Toolkit
type TJson = boolean | number | string | null | TJson[] | { [key: string]: TJson };

class __Internal__ClientServerInteraction {
  constructor() {
    return this;
  }

  getJson(endpoint: string, cb: (response: any) => void, error?: (response: object) => void): void {
    let instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    let username = localStorage.getItem("username") || "";
    let sessiontoken = sessionStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "GET",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        username: username,
        token: sessiontoken,
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") return resp.json();

        throw new Error(`not a valid JSON response`);
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          return console.error(`Error fetching from instance: ${endpoint}, Error:`, resp.error);
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: ${endpoint}`, err);
      });
  }

  postJson(endpoint: string, body: TJson, cb: (response: any) => void, error?: (response: object) => void): void {
    let instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    let username = localStorage.getItem("username") || "";
    let sessiontoken = sessionStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        username: username,
        token: sessiontoken,
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") return resp.json();

        throw new Error(`not a valid JSON response`);
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          return console.error(`Error fetching from instance: ${endpoint}, Error:`, resp.error);
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: ${endpoint}`, err);
      });
  }

  deleteJson(endpoint: string, cb: (response: any) => void, error?: (response: object) => void): void {
    let instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    let username = localStorage.getItem("username") || "";
    let sessiontoken = sessionStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "DELETE",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        username: username,
        token: sessiontoken,
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "application/json; charset=utf-8") return resp.json();

        throw new Error(`not a valid JSON response`);
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          return console.error(`Error fetching from instance: ${endpoint}, Error:`, resp.error);
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: ${endpoint}`, err);
      });
  }

  getText(endpoint: string, cb: (response: any) => void, error?: (response: object) => void): void {
    let instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    let username = localStorage.getItem("username") || "";
    let sessiontoken = sessionStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "GET",
      // @ts-ignore
      headers: {
        "Content-Type": "text/plain",
        username: username,
        token: sessiontoken,
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "text/plain; charset=utf-8") return resp.json();

        throw new Error(`not a valid text response`);
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          return console.error(`Error fetching from instance: ${endpoint}, Error:`, resp.error);
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: ${endpoint}`, err);
      });
  }

  postText(endpoint: string, body: string, cb: (response: any) => void, error?: (response: object) => void): void {
    let instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    let username = localStorage.getItem("username") || "";
    let sessiontoken = sessionStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      // @ts-ignore
      headers: {
        "Content-Type": "text/plain",
        username: username,
        token: sessiontoken,
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "text/plain; charset=utf-8") return resp.json();

        throw new Error(`not a valid text response`);
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          return console.error(`Error fetching from instance: ${endpoint}, Error:`, resp.error);
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: ${endpoint}`, err);
      });
  }

  deleteText(endpoint: string, cb: (response: any) => void, error?: (response: object) => void): void {
    let instanceUrl = localStorage.getItem("current_server") || "https://example.com";
    let username = localStorage.getItem("username") || "";
    let sessiontoken = sessionStorage.getItem("session_token") || "";

    fetch(`${instanceUrl}${endpoint}`, {
      method: "DELETE",
      // @ts-ignore
      headers: {
        "Content-Type": "text/plain",
        username: username,
        token: sessiontoken,
      },
    })
      .then((resp) => {
        if (resp.headers.get("Content-Type") === "text/plain; charset=utf-8") return resp.json();

        throw new Error(`not a valid text response`);
      })
      .then((resp) => {
        if (resp?.error) {
          error?.(resp);
          return console.error(`Error fetching from instance: ${endpoint}, Error:`, resp.error);
        }
        cb(resp);
      })
      .catch((err) => {
        console.error(`Error parsing result from instance: ${endpoint}`, err);
      });
  }
}

const csi = new __Internal__ClientServerInteraction();
export default csi;
