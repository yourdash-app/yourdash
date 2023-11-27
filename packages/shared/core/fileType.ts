/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import pathBrowserify from "path-browserify";

export enum FileTypes {
  PlainText,
  Image,
  Video,
  Audio
}

export default function getFileType( path: string ): FileTypes {
  const extension = pathBrowserify.extname( path ).replace( ".", "" );

  switch ( extension ) {
  case "jpg":
  case "jpeg":
  case "png":
  case "gif":
  case "webp":
  case "svg":
  case "avif":
    return FileTypes.Image;
  case "mp3":
  case "wav":
  case "aac":
  case "ogg":
  case "flac":
  case "m4a":
    return FileTypes.Audio;
  case "mp4":
  case "webm":
  case "mov":
  case "avi":
  case "av1":
    return FileTypes.Video;
  default:
    return FileTypes.PlainText;
  }
}
