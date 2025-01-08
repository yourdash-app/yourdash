/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

type TunnelResponseType = "text" | "json" | "uint8" | "bytes";

async function ftch(
  basePath: string,
  path: string,
  method: string,
  responseType: TunnelResponseType,
  headers?: { [key: string]: string },
  body?: string,
) {
  console.log(`${method} ${path}`, body || "");
  const response = await fetch(basePath + path, { method: method, body: body, headers: headers, credentials: "include" });

  if (response.status !== 200 && response.status !== 201 && response.status !== 202 && response.status !== 204) {
    throw { status: response.status, error: true, response };
  }
  switch (responseType) {
    case "json":
      return { data: await response.json(), status: response.status, error: false, response };
    case "text":
      return { data: await response.text(), status: response.status, error: false, response };
    case "bytes":
    case "uint8":
      return { data: await response.bytes(), status: response.status, error: false, response };
  }
}

class Tunnel {
  baseUrl: string;
  constructor() {
    this.baseUrl = "";

    if (localStorage.getItem("instance_url") !== undefined && localStorage.getItem("instance_url") !== "") {
      this.__internal_connectTo(localStorage.getItem("instance_url") as string);
    }

    return this;
  }

  __internal_connectTo(instanceUrl: string) {
    this.baseUrl = instanceUrl;
    return this;
  }

  async get(path: string, responseType: TunnelResponseType) {
    return await ftch(this.baseUrl, path, "GET", responseType);
  }

  async post(path: string, body: string, responseType: TunnelResponseType) {
    return await ftch(this.baseUrl, path, "POST", responseType, {}, body);
  }

  async put(path: string, body: string, responseType: TunnelResponseType) {
    return await ftch(this.baseUrl, path, "PUT", responseType, {}, body);
  }

  async delete(path: string, responseType: TunnelResponseType) {
    return await ftch(this.baseUrl, path, "DELETE", responseType, {});
  }
}

const tun = new Tunnel();

export default tun;
