import { app, BrowserWindow } from "electron"
import path from "node:path"

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

function init() {
  let window = new BrowserWindow({
    resizable: true,
    frame: true,
    movable: true,
  });

  window.menuBarVisible = false;
  window.title = "YourDash Desktop";

  if (process.env.DEV) {
    window.loadURL("http://localhost:5173").then(() => {
      window.show();
      window.focus();
    });
  } else {
    window
      .loadFile(path.join(process.cwd(), "../client/dist/index.html"))
      .then(() => {
        window.show();
        window.focus();
      });
  }

  window.webContents.on("before-input-event", (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === "i") {
      event.preventDefault();
      window.webContents.toggleDevTools();
    }
  });

  // allow the electron frontend to have a different layout to the website
  window.webContents
    .executeJavaScript(`window.localStorage.setItem("desktop_mode", true)`)
    .then(() => {
      console.log(`desktop-mode injection complete`);
    });
  // window.webContents.executeJavaScript(`window.localStorage.removeItem("desktop_mode")`)
}

app.whenReady().then(() => {
  init();
});
