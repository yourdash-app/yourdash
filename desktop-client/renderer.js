const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  document.getElementById("devtools-button").addEventListener("click", () => {
    webview.openDevTools()
  })
  document.getElementById("reload-button").addEventListener("click", () => {
    let elem = document.getElementById("reload-button")
    webview.reload()
    elem.style.transition = "transform 500ms linear"
    elem.style.transform = "rotate(360deg)"
    setTimeout(() => {
      elem.style.transition = "transform 0ms linear"
      elem.style.transform = "rotate(0deg)"
    }, 500)
  })
})