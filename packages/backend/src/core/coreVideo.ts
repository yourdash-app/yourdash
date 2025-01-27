/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "crypto";
import pth from "path";
import path from "path";
import { Core } from "./core.js";
import ffmpeg from "fluent-ffmpeg";
import timeMethod from "../lib/time.js";
import { $ } from "bun";
import { z } from "zod";

export enum AUTHENTICATED_VIDEO_TYPE {
  FILE,
}

interface IauthenticatedVideo<T extends AUTHENTICATED_VIDEO_TYPE> {
  type: T;
  value: string;
}

export default class CoreVideo {
  core: Core;
  // private readonly AUTHENTICATED_VIDEOS: {
  //   [username: string]: {
  //     [id: string]: IauthenticatedVideo<AUTHENTICATED_VIDEO_TYPE>;
  //   };
  // };
  private readonly authenticatedVideos: Map<string, Map<string, Map<string, IauthenticatedVideo<AUTHENTICATED_VIDEO_TYPE>>>>;

  constructor(core: Core) {
    this.core = core;
    this.authenticatedVideos = new Map();

    return this;
  }

  async createThumbnail(videoPath: string): Promise<string> {
    const cacheDir = "./cache/core/video/thumbnails";

    if (await this.core.fs.doesExist(`${path.join(cacheDir, videoPath)}.png`)) {
      return path.join(cacheDir, `${path.join(cacheDir, videoPath)}.png`);
    }

    if (!(await this.core.fs.doesExist(cacheDir))) {
      await this.core.fs.createDirectory(cacheDir);
    }

    return await new Promise<string>((resolve) => {
      const fileName = `${crypto.randomUUID()}.video-thumbnail.png`;

      // very slow on windows
      timeMethod(async () => {
        return new Promise((resolveTime) => {
          $`ffmpeg -i ${path.join(this.core.fs.ROOT_PATH, videoPath)} -ss 00:00:1 -frames:v 1 ${path.join(cacheDir, fileName)}`.then(() => {
            resolveTime(null);
            resolve(path.join(cacheDir, fileName));
          });
        });
      }, "createVideoThumbnail");
    });
  }

  getVideoDimensions(videoPath: string): Promise<{ width: number; height: number }> {
    return new Promise<{ width: number; height: number }>((resolve) => {
      ffmpeg.ffprobe(path.join(this.core.fs.ROOT_PATH, videoPath), (err, data) => {
        if (err) {
          this.core.log.warning("video", "Failed to get video dimensions: " + err.message);
          return resolve({ width: 512, height: 768 });
        }

        if (!data) {
          this.core.log.warning("video", "Failed to get video dimensions: no data");
        }

        return resolve({ width: data?.streams?.[0]?.width || 512, height: data?.streams?.[0]?.height || 768 });
      });
    });
  }

  getVideoDuration(videoPath: string): Promise<number> {
    return new Promise<number>((resolve) => {
      ffmpeg.ffprobe(path.join(this.core.fs.ROOT_PATH, videoPath), (err, data) => {
        if (err) {
          this.core.log.warning("video", "Failed to get video duration: " + err.message);
        }

        if (!data) {
          this.core.log.warning("video", "Failed to get video duration: no data");
        }

        return resolve(data?.format?.duration || 0);
      });
    });
  }

  createAuthenticatedVideo<VideoType extends AUTHENTICATED_VIDEO_TYPE>(
    username: string,
    sessionId: string,
    type: AUTHENTICATED_VIDEO_TYPE,
    value: IauthenticatedVideo<VideoType>["value"],
  ): string {
    try {
      let resultingExtension = "";
      let val = value;

      if (type === AUTHENTICATED_VIDEO_TYPE.FILE) {
        resultingExtension = path.extname(value as string);
        val = path.resolve(path.join(this.core.fs.ROOT_PATH, value as string));
      }

      const id = crypto.randomUUID() + resultingExtension;

      if (!this.authenticatedVideos.get(username)) {
        this.authenticatedVideos.set(username, new Map());
      }

      const user = this.authenticatedVideos.get(username)!;

      if (!user.has(sessionId)) {
        user.set(sessionId, new Map());
      }

      user.get(sessionId)!.set(id, {
        type,
        value: val,
      });

      return `/core/auth-video/${username}/${sessionId}/${id}`;
    } catch (err) {
      this.core.log.error("video", "failed to create authenticated video", err);

      return "";
    }
  }

  __internal__removeAuthenticatedVideo(username: string, sessionId: string, id: string) {
    this.authenticatedVideos.get(username)?.get(sessionId)?.delete(id);

    return this;
  }

  __internal__loadEndpoints() {
    this.core.request.setNamespace("core/auth-video");

    this.core.request.get("/:username/:sessionId/:id", z.unknown(), async (req, res) => {
      const { username, sessionId, id } = req.params;

      const video = this.authenticatedVideos.get(username)?.get(sessionId)?.get(id);

      if (!video) {
        return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_video.mp4"));
      }

      if (video.type === AUTHENTICATED_VIDEO_TYPE.FILE) {
        try {
          return res.sendFile(
            pth.resolve(video.value) || (pth.resolve(pth.join(process.cwd(), "./src/defaults/default_video.mp4")) as unknown as string),
          );
        } catch (e) {
          return;
        }
      } else {
        try {
          return res.sendFile(pth.resolve(pth.join(process.cwd(), "./src/defaults/default_video.mp4")) as unknown as string);
        } catch (e) {
          return;
        }
      }
    });
  }
}
