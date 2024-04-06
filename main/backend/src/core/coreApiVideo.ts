/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "crypto";
import pth from "path";
import path from "path";
import { CoreApi } from "./coreApi.js";

export enum AUTHENTICATED_VIDEO_TYPE {
  FILE,
}

interface IauthenticatedVideo<T extends AUTHENTICATED_VIDEO_TYPE> {
  type: T;
  value: string;
  lastAccess?: number;
}

export default class CoreApiVideo {
  coreApi: CoreApi;
  private readonly AUTHENTICATED_VIDEOS: {
    [username: string]: {
      [id: string]: IauthenticatedVideo<AUTHENTICATED_VIDEO_TYPE>;
    };
  };

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
    this.AUTHENTICATED_VIDEOS = {};

    return this;
  }

  createAuthenticatedVideo<VideoType extends AUTHENTICATED_VIDEO_TYPE>(
    username: string,
    type: AUTHENTICATED_VIDEO_TYPE,
    value: IauthenticatedVideo<VideoType>["value"],
  ): string {
    const id = crypto.randomUUID();

    if (!this.AUTHENTICATED_VIDEOS[username]) {
      this.AUTHENTICATED_VIDEOS[username] = {};
    }

    this.AUTHENTICATED_VIDEOS[username][id] = {
      type,
      value,
    };

    return `/core/auth-video/${username}/${id}`;
  }

  __internal__removeAuthenticatedVideo(username: string, id: string) {
    delete this.AUTHENTICATED_VIDEOS[username][id];

    return this;
  }

  __internal__loadEndpoints() {
    this.coreApi.request.get("/core/auth-video/:username/:id", async (req, res) => {
      const { username, id } = req.params;

      this.coreApi.log.info("Authenticated video range requested", JSON.stringify({ username, id: value, range: req.headers.range }));

      const video = this.AUTHENTICATED_VIDEOS?.[username]?.[id];

      if (!video) {
        return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_avatar.avif"));
      }

      if (video?.lastAccess === undefined) {
        video.lastAccess = Date.now();
      }

      if (video.type === AUTHENTICATED_VIDEO_TYPE.FILE) {
        this.__internal__removeAuthenticatedVideo(username, id);

        if (Date.now() - video.lastAccess < 5 * 60 * 1000) {
          video.lastAccess = Date.now();
          try {
            res.sendFile(video.value as unknown as string);
          } catch (e) {
            return;
          }
        } else {
          this.__internal__removeAuthenticatedVideo(username, id);
        }

        return;
      }

      this.__internal__removeAuthenticatedVideo(username, id);

      try {
        return res.sendFile(pth.resolve(pth.join(process.cwd(), "./src/defaults/default_video.mp4")) as unknown as string);
      } catch (e) {
        return;
      }
    });
  }
}
