/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Core } from "./core.js";

export default class CoreCommands {
  availableCommands: {
    [command: string]: {
      callback(args: string[]): void;
    };
  };
  private lastCommandAndArgs: string[];
  private readonly core: Core;

  constructor(core: Core) {
    this.availableCommands = {};
    this.core = core;

    process.stdin.on("data", (data) => {
      const commandAndArgs =
        data.toString() === "" ? this.lastCommandAndArgs : data.toString().replaceAll("\n", "").replaceAll("\r", "").split(" ");
      const command = commandAndArgs[0];

      this.lastCommandAndArgs = commandAndArgs;
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1);

      if (!this.availableCommands[command]) {
        this.core.log.warning("command", `Command '${command}' does not exist!`);
        return;
      }

      this.runCommand(command, commandAndArgs.slice(1));
    });

    return this;
  }

  registerCommand(commandName: string, callback: (args: string[]) => void) {
    // Placeholder function
    this.availableCommands[commandName] = {
      callback: callback,
    };

    this.core.log.info("command", `Registered command: '${commandName}'`);

    return this;
  }

  removeCommand(commandName: string) {
    delete this.availableCommands[commandName];

    return this;
  }

  getAllCommands(): string[] {
    return Object.keys(this.availableCommands);
  }

  updateCommand(commandName: string, callback: (args: string[]) => void) {
    this.removeCommand(commandName);
    this.registerCommand(commandName, callback);
  }

  runCommand(commandName: string, args: string[]) {
    if (!this.availableCommands[commandName]) {
      this.core.log.error("command", `Command '${commandName}' does not exist!`);
      return false;
    }

    this.availableCommands[commandName].callback(args);
    return true;
  }

  registerCommandAlias(aliasName: string, commandName: string) {
    this.availableCommands[aliasName] = {
      callback: this.availableCommands[commandName].callback,
    };

    return this;
  }
}
