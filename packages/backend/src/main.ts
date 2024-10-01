/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

/**
 * # The YourDash project
 *  - https://github.com/yourdash/yourdash
 *  - https://yourdash.ewsgit.uk
 *  - https://ydsh.pages.dev
 */

import Bun from "bun";

async function initProcess() {
  console.log("Starting YourDash process...");

  const yourdashProcess = Bun.spawn(["bun", "run", "dev-standalone", ...process.argv.slice(2)], {
    stdin: "pipe",
    stderr: "pipe",
    stdout: "pipe",
    cwd: process.cwd(),
  });

  const stdoutDecoder = new TextDecoder();
  const stdinEncoder = new TextEncoder();

  for await (const chunk of yourdashProcess.stdout) {
    let decodedChunk = stdoutDecoder.decode(chunk);

    if (decodedChunk.includes("oh no: Bun has crashed. This indicates a bug in Bun, not your code.")) {
      yourdashProcess.kill();

      initProcess().then((r) => {
        console.log("process restarted");
      });
    }

    process.stdout.write(decodedChunk);
  }

  for await (const chunk of yourdashProcess.stderr) {
    let decodedChunk = stdoutDecoder.decode(chunk);

    process.stderr.write("stderr " + decodedChunk);
  }

  process.stdin.on("data", (chunk: any) => {
    yourdashProcess.stdin.write(stdinEncoder.encode(chunk));
    yourdashProcess.stdin.flush();
  });

  process.on("beforeExit", () => {
    yourdashProcess.kill();
  });

  yourdashProcess.exited.then((processExitCode) => {
    console.log(`YourDash instance process exited with exit code ${processExitCode}`);
  });
}

initProcess();
