/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Core } from "./core.js";

export default class CoreCommands {
  availableCommands: {
    [command: string]: {
      callback(args: string[]): void;
    };
  };
  private stdout = process.stdout;
  private stdin = process.stdin;
  private currentCommandInput: string;
  private lastCommandAndArgs: string[];
  prompt: string;
  private readonly core: Core;

  constructor(core: Core) {
    this.availableCommands = {};
    this.core = core;
    this.currentCommandInput = "";
    this.lastCommandAndArgs = [];
    this.prompt = "> ";

    this.stdin.setRawMode?.(true);
    this.stdin.setEncoding?.("utf8");
    this.stdin.resume?.();

    let cursorPosition = 0;

    this.stdin.on("data", (data) => {
      const stringData = data.toString("utf8");
      this.stdout.write(stringData);
      if (stringData === "\u0003") {
        this.core.shutdownInstance();
        return;
      }

      if (stringData === /* enter */ "\r") {
        this.onSubmit();
        return;
      }
      if (stringData === /* backspace */ "\b" || stringData === /* backspace */ "") {
        if (cursorPosition === 0) {
          this.stdout.clearLine(0);
          this.stdout.cursorTo(0);
          this.stdout.write("> " + this.currentCommandInput);
          this.stdout.cursorTo(this.prompt.length);
          return;
        }

        this.currentCommandInput = this.currentCommandInput.slice(0, cursorPosition - 1) + this.currentCommandInput.slice(cursorPosition);
        cursorPosition--;
        this.stdout.clearLine(0);
        this.stdout.cursorTo(0);
        this.stdout.write("> " + this.currentCommandInput);
        this.stdout.cursorTo(cursorPosition + this.prompt.length);
        return;
      }
      if (stringData === /* arrow left */ "\u001b[D") {
        if (cursorPosition === 0) {
          return;
        }
        cursorPosition--;
        this.stdout.cursorTo(cursorPosition + this.prompt.length);
        return;
      }
      if (stringData === /* arrow right */ "\u001b[C") {
        if (cursorPosition === this.currentCommandInput.length) {
          return;
        }

        cursorPosition++;
        this.stdout.cursorTo(cursorPosition + this.prompt.length);
        return;
      }
      if (stringData === /* arrow up */ "\u001b[A") {
        this.stdout.cursorTo(0, this.stdout.rows);
        return;
      }
      if (stringData === /* arrow down */ "\u001b[B") {
        this.stdout.cursorTo(0, this.stdout.rows);
        return;
      }

      this.currentCommandInput += stringData;
      cursorPosition++;
      this.stdout.clearLine(0);
      this.stdout.cursorTo(0);
      this.stdout.write("> " + this.currentCommandInput);
      this.stdout.cursorTo(cursorPosition + this.prompt.length);
    });

    return this;
  }

  onSubmit() {
    const commandAndArgs =
      this.currentCommandInput === ""
        ? this.lastCommandAndArgs
        : this.currentCommandInput.replaceAll("\n", "").replaceAll("\r", "").split(" ");
    const command = commandAndArgs[0];

    this.lastCommandAndArgs = commandAndArgs;
    this.stdout.clearLine(0);

    this.currentCommandInput = "";

    if (!this.availableCommands[command]) {
      this.stdout.cursorTo(0);
      this.core.log.warning("command", `Command '${command}' does not exist!`);
      return;
    }

    this.stdout.cursorTo(0);

    this.runCommand(command, commandAndArgs.slice(1));

    return this;
  }

  registerCommand(commandName: string | string[], callback: (args: string[]) => void) {
    if (typeof commandName === "string") {
      this.availableCommands[commandName] = {
        callback: callback,
      };
      this.core.log.info("command", `Registered command: '${commandName}'`);
    } else {
      for (const name of commandName) {
        this.availableCommands[name] = {
          callback: callback,
        };
        this.core.log.info("command", `Registered command: '${name}'`);
      }
    }

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

  displayPrompt() {
    this.stdout.clearLine(0);
    this.stdout.cursorTo(0);
    this.stdout.write("> " + this.currentCommandInput);
    this.stdout.cursorTo(this.prompt.length);
  }
}
