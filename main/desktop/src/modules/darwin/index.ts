/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ipcMain } from "electron";

let currentWorkspace = 0;
const workspaces: { id: number; windows: unknown }[] = [];

ipcMain.on("get-current-workspace", (event) => {
  return event.reply("get-current-workspace", currentWorkspace);
});

ipcMain.on("get-workspaces", (event) => {
  return event.reply("get-workspaces", workspaces.length);
});

ipcMain.on("set-current-workspace", (event, workspace) => {
  currentWorkspace = workspace;
  console.log("set current workspace", currentWorkspace);
  return event.reply("set-current-workspace", currentWorkspace);
});

ipcMain.on("create-workspace", (event) => {
  const id = workspaces.length;
  workspaces.push({ id, windows: [] });
  console.log("created workspace", id);
  return event.reply("create-workspace", true);
});

ipcMain.on("remove-workspace", (event, workspace) => {
  if (currentWorkspace === workspace) {
    if (workspaces.length === 1) {
      currentWorkspace = 0;
      return;
    }

    currentWorkspace -= 1;
    return event.reply("set-current-workspace", currentWorkspace);
  }

  workspaces.splice(workspace, 1);

  return event.reply("remove-workspace", true);
});
