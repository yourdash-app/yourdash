const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("min-button").addEventListener("click", () => {
    ipcRenderer.send("window_minimize", "")
  })

  document.getElementById("max-button").addEventListener("click", () => {
    ipcRenderer.send("is_window_maximized", "")
  })

  let root_window_devtools_count = 0;
  document.getElementById("close-button").onmousedown = (e) => {
    if (e.button === 0) {
      ipcRenderer.send("window_close", "")
    }
    if (e.button === 2) {
      root_window_devtools_count++
      if (root_window_devtools_count === 5) {
        ipcRenderer.send("open_devtools", "")
        root_window_devtools_count = 0
      } else {
        ipcRenderer.send("close_devtools", "")
      }
    }
  }
})