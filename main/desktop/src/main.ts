/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { app, BrowserWindow, globalShortcut, screen } from "electron";
import win32 from "win32-api";
import wallpaper from "wallpaper";
import path from "path";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 512,
    height: 32,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    frame: false,
    roundedCorners: false,
    show: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    minimizable: false,
    // skipTaskbar: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const win = createWindow();

  win.setPosition(screen.getPrimaryDisplay().nativeOrigin.x, screen.getPrimaryDisplay().nativeOrigin.y);
  win.setShape([{ width: screen.getPrimaryDisplay().size.width, height: 32, x: 0, y: 0 }]);
  win.setSize(screen.getPrimaryDisplay().size.width, 32);

  globalShortcut.register("f5", async () => {
    win.webContents.reload();
    win.setPosition(screen.getPrimaryDisplay().nativeOrigin.x, screen.getPrimaryDisplay().nativeOrigin.y);
    win.setShape([{ width: screen.getPrimaryDisplay().size.width, height: 32, x: 0, y: 0 }]);
    win.setSize(screen.getPrimaryDisplay().size.width, 32);
  });

  globalShortcut.register("f12", () => {
    const devtoolsWindow = new BrowserWindow({
      width: 512,
      height: 768,
      y: 32,
    });

    win.webContents.setDevToolsWebContents(devtoolsWindow.webContents);
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
