/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "crypto";
import pth from "path";
import path from "path";
import { Core } from "./core.js";
import ffmpeg from "fluent-ffmpeg";

export enum AUTHENTICATED_VIDEO_TYPE {
  FILE,
}

interface IauthenticatedVideo<T extends AUTHENTICATED_VIDEO_TYPE> {
  type: T;
  value: string;
  lastAccess?: number;
}

export default class CoreVideo {
  core: Core;
  private readonly AUTHENTICATED_VIDEOS: {
    [username: string]: {
      [id: string]: IauthenticatedVideo<AUTHENTICATED_VIDEO_TYPE>;
    };
  };

  constructor(core: Core) {
    this.core = core;
    this.AUTHENTICATED_VIDEOS = {};

    return this;
  }

  async createThumbnail(videoPath: string): Promise<string> {
    const cacheDir = pth.resolve(pth.join(this.core.fs.ROOT_PATH, "./cache/"));

    return await new Promise<string>((resolve) => {
      const fileName = `${crypto.randomUUID()}.video-thumbnail.png`;

      ffmpeg(videoPath)
        .thumbnail({ count: 1, filename: fileName }, cacheDir)
        .on("end", () => {
          resolve(pth.join(cacheDir, fileName));
        });
    });
  }

  getVideoDimensions(videoPath: string): Promise<{ width: number; height: number }> {
    return new Promise<{ width: number; height: number }>((resolve) => {
      ffmpeg.ffprobe(videoPath, (err, data) => {
        return resolve({ width: data.streams[0].width, height: data.streams[0].height });
      });
    });
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

    return `/core::auth-video/${username}/${id}`;
  }

  __internal__removeAuthenticatedVideo(username: string, id: string) {
    delete this.AUTHENTICATED_VIDEOS[username][id];

    return this;
  }

  __internal__loadEndpoints() {
    this.core.request.setNamespace("core::auth-video");

    this.core.request.get("/:username/:id", async (req, res) => {
      const { username, id } = req.params;

      this.core.log.info(
        "Authenticated video range requested",
        JSON.stringify({ username, id, range: req.headers.range }),
      );

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
        return res.sendFile(
          pth.resolve(pth.join(process.cwd(), "./src/defaults/default_video.mp4")) as unknown as string,
        );
      } catch (e) {
        return;
      }
    });
  }
}
