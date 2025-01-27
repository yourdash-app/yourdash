/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "../core/core.js";

export default async function timeMethod<TFR extends Promise<unknown>>(
  cb: () => TFR,
  log?: string,
): Promise<{ microseconds: number; formattedMicrosecconds: string; callbackResult: Awaited<TFR> }> {
  const startTime = performance.now();
  const callbackResult = await cb();
  const endTime = performance.now();

  const formattedMicrosecconds = `${(endTime * 1000 - startTime * 1000).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}μs`;

  if (log) {
    core.log.debug("TIMER", `${log} took ${formattedMicrosecconds}`);
  }

  return {
    microseconds: endTime * 1000 - startTime * 1000,
    formattedMicrosecconds,
    callbackResult,
  };
}

export function timeMethodSync<TFR extends unknown>(
  cb: () => TFR,
): { microseconds: number; formattedMicrosecconds: string; callbackResult: TFR } {
  const startTime = performance.now();
  const callbackResult = cb();
  const endTime = performance.now();

  return {
    microseconds: endTime * 1000 - startTime * 1000,
    formattedMicrosecconds: `${(endTime * 1000 - startTime * 1000).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}μs`,
    callbackResult,
  };
}
