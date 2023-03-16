import { app, BrowserWindow } from "electron";
import path from "path";

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

function init() {
    let window = new BrowserWindow({ resizable: true, frame: false, movable: true })

    if (process.env.DEV) {
        window.loadURL("http://localhost:3000").then(() => {
            window.show()
            window.focus()
        })
    } else {
        window.loadFile(path.join(__dirname, "../../frontend/index.html")).then(() => {
            window.show()
            window.focus()
        })
    }


    window.webContents.on('before-input-event', (event, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === 'i') {
            event.preventDefault()
            window.webContents.toggleDevTools()
        }
    })

    // allow the electron frontend to have a different layout to the website
    window.webContents.executeJavaScript(`window.localStorage.setItem("desktop_mode", true)`).then(() => { console.log(`desktop-mode injection complete`) })
    // window.webContents.executeJavaScript(`window.localStorage.removeItem("desktop_mode")`)
}

app.whenReady().then(() => {
    init()
})
