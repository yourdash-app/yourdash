const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  document.getElementById("devtools-button").addEventListener("click", () => {
    webview.openDevTools()
  })
})