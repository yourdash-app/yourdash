/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 300,
        autoHideMenuBar: true,
        darkTheme: true,
        titleBarStyle: "hidden",
        roundedCorners: true,
        title: "DevDash Desktop",
        icon: "./DevDash.png",
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "./preload.js")
        }
    })

    ipcMain.on("window_close", () => {
        win.close()
    })

    ipcMain.on("window_minimize", () => {
        win.minimize()
    })

    ipcMain.on("is_window_maximized", () => {
        win.webContents.send("is_window_maximized", "" + win.isMaximized())
        if (win.isMaximized()) {
            win.unmaximize()
        } else {
            win.maximize()
        }
    })

    win.loadFile(path.join(__dirname, "index.html"))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})