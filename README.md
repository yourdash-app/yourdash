<h1 align="center" style="font-weight:900;color:#ff926c;">
    Notice: YourDash is under development
    You can find the current changes on the "dev" branch
</h1>

# YourDash


## Links
  - Website: https://ydsh.pages.dev or https://yourdash.pages.dev
  - Discord: https://discord.gg/aY5CjDZTpG
  - GitHub: https://github.com/yourdash-app/yourdash

## About

- YourDash's goal is to be a more-performant nextcloud alternative which can achieve a good level of performance on a
  Raspberry Pi 4.
- Built using Node.js, Vite, Express, Electron, Bun and Typescript

## Projects

This repository 'YourDash' is a collection of projects more commonly known as a monorepo

Some of the YourDash projects include

- YourDash Backend (backend)
- YourDash Web (web-client)
- UIKit (uikit)

## Host Your Own YourDash Instance

- [Docs](https://ydsh.pages.dev/#/docs)

## Development Setup

### Requirements

- Personal IDE / Text Editor of Choice
    (Webstorm or VSCode is recommended)
    - [Webstorm](https://www.jetbrains.com/webstorm/)
    - [VSCode](https://code.visualstudio.com/)
- Linting And Formatting
  - [ESLint](https://eslint.org)
- Package Manager
  - [Bun](https://bun.sh)
- Runtimes
  - [Bun ( Much faster Nodejs replacement )](https://bun.sh)
  - [Python 3.11.7](https://www.python.org/downloads/release/python-3117/)
  - [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
    - (Chocolately install method is prefered for windows)
- Version Control
  - [Git](https://git-scm.com/)

### Installation and setup

#### Install bun
```shell
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```
#### Install npm dependencies
```shell
bun install
```
#### Run YourDash backend in dev mode
```shell
bun run yd:dev-backend
```
#### Run YourDash web in dev mode
```shell
bun run yd:dev-web-client
```

#### Notes

- Ensure Python 3.11.x is the default for installing yarn packages as 3.11.x+ will cause node-gyp errors during `bun install`

# See more in the docs

https://ydsh.pages.dev/#/docs

# Credits

- Created by [Ewsgit](https://github.com/ewsgit)

## Top contributors

TODO: create a GH action to fetch top contributors and edit this list
%%__top_contributors_list__%%
