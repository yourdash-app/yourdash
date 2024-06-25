/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { app, BrowserWindow, globalShortcut, screen, ipcMain, protocol, net } from "electron";
import path from "path";
import "./modules";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
import("electron-squirrel-startup").then((mod) => {
  if (mod.default) {
    app.quit();
  }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 512,
    height: 32,
    minHeight: 16,
    minWidth: 16,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
    roundedCorners: false,
    show: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    minimizable: false,
    skipTaskbar: true,
    // backgroundMaterial: "mica",
    titleBarStyle: "hidden",
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protocol.handle("local", async (request) => {
    const filePath = request.url.replace(`local://`, "file://");

    console.log(filePath);

    try {
      return await net.fetch(filePath);
    } catch (error) {
      console.error(error, "replacing with default image");
      return await net.fetch("https://www.bing.com/favicon.ico");
    }
  });

  const win = createWindow();
  win.on("ready-to-show", () => {
    const HEIGHT = 32;
    const display = screen.getPrimaryDisplay();
    const { x, y, width } = display.bounds;

    win.setMinimumSize(width, HEIGHT);
    win.setShape([{ width: width, height: HEIGHT, y: 0, x: 0 }]);
    win.setBounds({ x, y, width, height: HEIGHT });

    globalShortcut.register("f5", () => {
      console.log("Reloading window, resetting position and size");
      win.webContents.reload();
      win.setBounds({ x, y, width, height: HEIGHT });
    });

    globalShortcut.register("ctrl+f12", () => {
      win.webContents.openDevTools({ mode: "detach" });
    });
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

ipcMain.on(
  "set-wallpaper",
  (event, path: string, scale: "auto" | "fill" | "fit" | "stretch" | "center" | "tile" | "span") => {
    // TODO: map to the correct values depending on the operating system
    //       macOS Values: "auto", "fill", "fit", "stretch", "center".
    //       Windows Values: "stretch", "center", "tile", "span", "max", "crop-to-fit", "keep-aspect-ratio".

    import("wallpaper").then((mod) => {
      const { setWallpaper } = mod;
      setWallpaper(path, { scale });
    });
  },
);

ipcMain.on("get-wallpaper", (event) => {
  import("wallpaper").then(async (mod) => {
    const { getWallpaper } = mod;

    const wallpaper = (await getWallpaper({ screen: "main" })).replaceAll("\\", "/");

    event.reply("get-wallpaper", wallpaper);
  });
});
