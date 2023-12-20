import gulp from "gulp"
import { exec } from "node:child_process"
import os from "node:os"

export default function postinstall() {
  // code_studio
  switch (os.platform()) {
    case "win32":
      return exec("cd ./code_studio/ && ./frontend/generate_treesitter_langs.ps1", { shell: "powershell" }, (error) => {
        if (error) console.log(error)
      })
    default:
      return exec("cd ./code_studio/ && ./frontend/generate_treesitter_langs.sh", { shell: "bash" }, (error) => {
        if (error) console.log(error)
      })
  }
}