/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "crypto";
import path from "path";
import { CoreApi } from "./coreApi.js";

export enum AUTHENTICATED_IMAGE_TYPE {
  BASE64,
  FILE,
  BUFFER,
}

interface IauthenticatedImage<T extends AUTHENTICATED_IMAGE_TYPE> {
  type: T;
  value: T extends AUTHENTICATED_IMAGE_TYPE.BUFFER ? Buffer : string;
}

export default class CoreApiAuthenticatedImage {
  private coreApi: CoreApi;
  private readonly AUTHENTICATED_IMAGES: {
    [username: string]: {
      [id: string]: IauthenticatedImage<AUTHENTICATED_IMAGE_TYPE>;
    };
  };

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
    this.AUTHENTICATED_IMAGES = {};
  }

  create<ImageType extends AUTHENTICATED_IMAGE_TYPE>(
    username: string,
    type: AUTHENTICATED_IMAGE_TYPE,
    value: IauthenticatedImage<ImageType>["value"],
  ): string {
    const id = crypto.randomUUID();

    if (!this.AUTHENTICATED_IMAGES[username]) {
      this.AUTHENTICATED_IMAGES[username] = {};
    }

    this.AUTHENTICATED_IMAGES[username][id] = {
      type,
      value,
    };

    return `/core/auth-img/${username}/${id}`;
  }

  __internal__removeImage(username: string, id: string) {
    delete this.AUTHENTICATED_IMAGES[username][id];

    return this;
  }

  __internal__loadEndpoints() {
    this.coreApi.request.get("/core/auth-img/:username/:id", (req, res) => {
      const { username, id } = req.params;

      const image = this.AUTHENTICATED_IMAGES?.[username]?.[id];

      if (!image) {
        return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.BUFFER) {
        return res.send(image.value);
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.BASE64) {
        const buf = Buffer.from(image.value as string, "base64");
        this.__internal__removeImage(username, id);
        return res.send(buf);
      }

      if (image.type === AUTHENTICATED_IMAGE_TYPE.FILE) {
        this.__internal__removeImage(username, id);
        return res.sendFile(image.value as string);
      }

      this.__internal__removeImage(username, id);
      return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
    });
  }
}
