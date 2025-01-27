/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { ZodType } from "zod";

type TunnelResponseType = "text" | "json" | "uint8" | "bytes";

async function ftch<ReponseDataType>(
  basePath: string,
  path: string,
  method: string,
  responseType: TunnelResponseType,
  headers?: { [key: string]: string },
  body?: string,
) {
  console.log(`${method} ${path}`, body || "");
  const response = await fetch(basePath + path, {
    method: method,
    body: body,
    headers: { ...headers, "Content-Type": "application/json" },
    credentials: "include",
  });

  if (response.status !== 200 && response.status !== 201 && response.status !== 202 && response.status !== 204) {
    throw { status: response.status, error: true, response };
  }
  switch (responseType) {
    case "json":
      return { data: (await response.json()) as ReponseDataType, status: response.status, error: false, response };
    case "text":
      return { data: (await response.text()) as ReponseDataType, status: response.status, error: false, response };
    case "bytes":
    case "uint8":
      return { data: (await response.bytes()) as ReponseDataType, status: response.status, error: false, response };
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

  async get<S extends ZodType>(
    path: string,
    responseType: TunnelResponseType,
    responseSchema: S,
  ): Promise<{
    data: S["_output"];
    status: number;
    error: boolean;
    response: Response;
  }> {
    return await ftch<S>(this.baseUrl, path, "GET", responseType);
  }

  async post<S extends ZodType>(
    path: string,
    body: object,
    responseType: TunnelResponseType,
    responseSchema: S,
  ): Promise<{
    data: S["_output"];
    status: number;
    error: boolean;
    response: Response;
  }> {
    return await ftch<S>(this.baseUrl, path, "POST", responseType, {}, JSON.stringify(body));
  }

  async put<S extends ZodType>(
    path: string,
    body: string,
    responseType: TunnelResponseType,
    responseSchema: S,
  ): Promise<{
    data: S["_output"];
    status: number;
    error: boolean;
    response: Response;
  }> {
    return await ftch<S>(this.baseUrl, path, "PUT", responseType, {}, body);
  }

  async delete<S extends ZodType>(
    path: string,
    responseType: TunnelResponseType,
    responseSchema: S,
  ): Promise<{
    data: S["_output"];
    status: number;
    error: boolean;
    response: Response;
  }> {
    return await ftch<S>(this.baseUrl, path, "DELETE", responseType, {});
  }
}

const tun = new Tunnel();

export default tun;
