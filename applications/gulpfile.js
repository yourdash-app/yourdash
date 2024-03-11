import gulp from "gulp";
import { exec } from "node:child_process";
import os from "node:os";

// code_studio
async function codeStudio() {
  switch (os.platform()) {
    case "win32":
      return await new Promise((resolve, reject) => {
        let childProcessWin32 = exec(
          "cd ./code_studio/ && ./meta/generate_treesitter_langs.ps1",
          { shell: "pwsh" },
          (error, stdout) => {
            if (error) {
              console.log(error);
              reject(error);
            }

            resolve(stdout);
          },
        );

        childProcessWin32.stdout.on("data", (data) => {
          process.stdout.write(data);
        });
      });
    default:
      return await new Promise((resolve, reject) => {
        let childProcess = exec(
          "cd ./code_studio/ && ./meta/generate_treesitter_langs.sh",
          { shell: "bash" },
          (error, stdout) => {
            if (error) {
              console.log(error);
              reject(error);
            }

            resolve(stdout);
          },
        );

        childProcess.stdout.on("data", (data) => {
          process.stdout.write(data);
        });
      });
  }
}

export default gulp.parallel(codeStudio);
