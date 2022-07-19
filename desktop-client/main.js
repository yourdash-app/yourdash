/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        darkTheme: true,
        roundedCorners: true,
        title: "DevDash Desktop",
        icon: "./DevDash.png"
    })

    win.loadURL("http://localhost:3000")
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