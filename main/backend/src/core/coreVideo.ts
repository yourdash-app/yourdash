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
}

export default class CoreVideo {
  core: Core;
  // private readonly AUTHENTICATED_VIDEOS: {
  //   [username: string]: {
  //     [id: string]: IauthenticatedVideo<AUTHENTICATED_VIDEO_TYPE>;
  //   };
  // };
  private readonly authenticatedVideos: Map<
    string,
    Map<string, Map<string, IauthenticatedVideo<AUTHENTICATED_VIDEO_TYPE>>>
  >;

  constructor(core: Core) {
    this.core = core;
    this.authenticatedVideos = new Map();

    return this;
  }

  async createThumbnail(videoPath: string): Promise<string> {
    const cacheDir = pth.resolve(pth.join(this.core.fs.ROOT_PATH, "./cache/"));

    return await new Promise<string>((resolve) => {
      const fileName = `${crypto.randomUUID()}.video-thumbnail.png`;

      ffmpeg(videoPath)
        .output(path.join(cacheDir, fileName))
        .outputOptions("-frames:v", "1")
        .on("end", () => {
          resolve(pth.join(cacheDir, fileName));
        })
        .run();
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
    sessionId: string,
    type: AUTHENTICATED_VIDEO_TYPE,
    value: IauthenticatedVideo<VideoType>["value"],
  ): string {
    let resultingExtension = "";

    if (type === AUTHENTICATED_VIDEO_TYPE.FILE) {
      resultingExtension = path.extname(value as string);
    }

    const id = crypto.randomUUID() + resultingExtension;

    if (!this.authenticatedVideos.get(username)) {
      this.authenticatedVideos.set(username, new Map());
    }

    const user = this.authenticatedVideos.get(username);

    if (!user.has(sessionId)) {
      user.set(sessionId, new Map());
    }

    user.get(sessionId).set(id, {
      type,
      value,
    });

    return `/core::auth-video/${username}/${sessionId}/${id}`;
  }

  __internal__removeAuthenticatedVideo(username: string, sessionId: string, id: string) {
    this.authenticatedVideos.get(username).get(sessionId).delete(id);

    return this;
  }

  __internal__loadEndpoints() {
    this.core.request.setNamespace("core::auth-video");

    this.core.request.get("/:username/:sessionId/:id", async (req, res) => {
      const { username, sessionId, id } = req.params;

      const video = this.authenticatedVideos.get(username)?.get(sessionId)?.get(id);

      if (!video) {
        return res.sendFile(path.resolve(process.cwd(), "./src/defaults/default_video.mp4"));
      }

      if (video.type === AUTHENTICATED_VIDEO_TYPE.FILE) {
        try {
          return res.sendFile(
            pth.resolve(video.value) ||
              (pth.resolve(pth.join(process.cwd(), "./src/defaults/default_video.mp4")) as unknown as string),
          );
        } catch (e) {
          return;
        }
      } else {
        try {
          return res.sendFile(
            pth.resolve(pth.join(process.cwd(), "./src/defaults/default_video.mp4")) as unknown as string,
          );
        } catch (e) {
          return;
        }
      }
    });
  }
}
