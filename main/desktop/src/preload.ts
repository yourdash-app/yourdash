/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer } from "electron";
import electron from "electron";

interface IElectronInterface {
  ipcRenderer: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (channel: string, ...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: (channel: string, func: (event: any, ...args: any[]) => void) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once: (channel: string, func: (event: any, ...args: any[]) => void) => void;
  };
}

declare global {
  interface Window {
    electron: IElectronInterface;
  }
}

electron.contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...(args || [])),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: (channel: string, func: (event: any, ...args: any[]) => void) => ipcRenderer.on(channel, func),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once: (channel: string, func: (event: any, ...args: any[]) => void) => ipcRenderer.once(channel, func),
  },
});
