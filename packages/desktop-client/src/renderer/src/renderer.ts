const ELECTRON = window.electron

export function init(): void {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
  })
}

function replaceText(selector: string, text: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    element.innerText = text
  }
}

init()
