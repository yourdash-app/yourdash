/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as pth from "path-browserify";

function convertSeparator(path: string) {
  return path.replace(/\\/g, "/");
}

export default class BrowserPath {
  constructor() {
    return this;
  }

  join(p1: string, p2: string) {
    return pth.join(convertSeparator(p1), convertSeparator(p2));
  }

  relative(p1: string, p2: string) {
    return pth.relative(convertSeparator(p1), convertSeparator(p2));
  }

  dirname(p: string) {
    return pth.dirname(convertSeparator(p));
  }

  basename(p: string, ext?: string) {
    return pth.basename(convertSeparator(p), ext);
  }

  extname(p: string) {
    return pth.extname(convertSeparator(p));
  }

  normalize(p: string) {
    return pth.normalize(convertSeparator(p));
  }

  isAbsolute(p: string) {
    return pth.isAbsolute(convertSeparator(p));
  }

  parse(p: string) {
    return pth.parse(convertSeparator(p));
  }

  sep() {
    return pth.sep;
  }

  toUnix(p: string) {
    return convertSeparator(p);
  }
}
