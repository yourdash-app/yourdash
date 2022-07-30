const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("min-button").addEventListener("click", () => {
    ipcRenderer.send("window_minimize", "")
  })

  document.getElementById("max-button").addEventListener("click", () => {
    ipcRenderer.send("is_window_maximized", "")
  })

  document.getElementById("close-button").addEventListener("click", () => {
    ipcRenderer.send("window_close", "")
  })
})