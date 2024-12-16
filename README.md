<h1 align="center" style="font-weight:900;color:#ff926c;">
    Notice: YourDash is under development
    You can find the current changes on the "dev" branch
</h1>

# YourDash

## Links
  - Website: https://ydsh.ewsgit.uk or https://yourdash.ewsgit.uk
  - Discord: https://discord.gg/aY5CjDZTpG
  - GitHub: https://github.com/yourdash/yourdash

## About

- YourDash's goal is to be a more-performant nextcloud alternative which can achieve a good level of performance on a
  Raspberry Pi 4.
- Built using Node.js, Vite, Express, Electron, Bun and Typescript

## Projects

This repository 'yourdash' is a monorepo containing YourDash and it's related projects

Some of the YourDash projects include

- YourDash Backend (backend)
- YourDash Web (web)
- YourDash Desktop (desktop)
- UIKit (uikit)
- OpenGFX Engine (opengfx-engine)

## Host Your Own YourDash Instance

- [Docs](https://ydsh.ewsgit.uk/docs)

### Automated Deployment (Only Supports Linux)
```bash
# This has not been verified since September 2024
curl -L https://raw.githubusercontent.com/yourdash/yourdash/main/toolchain/setupInstance.sh | bash
```

## Development Setup

### Requirements

- Personal IDE / Text Editor of Choice
    (Webstorm is recommended but VSCode should work but is unverified)
    - [Webstorm](https://www.jetbrains.com/webstorm/)
    - [VSCode](https://code.visualstudio.com/)
- Linting And Formatting
  - [Prettier](https://prettier.io/)
  - [ESLint](https://eslint.org/)
- Package Manager
  - [Yarn](https://yarnpkg.com/)
- Runtimes
  - [NodeJS](https://nodejs.org/)
  - [Bun](https://bun.sh/)
  - [Python 3.11.7](https://www.python.org/downloads/release/python-3117/)
  - [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) (for CodeStudio builtin application)
    - (Chocolately install method is prefered for windows)
- Version Control
  - [Git](https://git-scm.com/)
- PostgreSQL
  - [PostgreSQL](https://www.postgresql.org/)

### Installation and setup for development (Linux)

#### Download Source Code
```bash
git clone git@github.com:yourdash/yourdash -b dev --recurse
```

#### Install Node.js with Node Version Manager and Yarn
  - Install Node Version Manager
    - ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
      source ~/.nvm/nvm.sh
      ```
  - Install Node v22
    - ```bash
      nvm install 22
      source ~/.nvm/nvm.sh
      ```
  - Install Yarn
    - ```bash
      npm i -g yarn
      ```

#### Install dependencies
```bash
# we do this twice because the first time will error but will succeed the seccond time
bun install && bun install
```
#### Run YourDash backend in dev mode
```bash
bun run dev-backend
```
#### Run YourDash web in dev mode
```bash
bun run dev-web
```

### Installation and setup for development (Windows)

Prerequisites:
- Bun - https://bun.sh/
- Git - https://git-scm.com/
- Node.js 22 or higher - https://nodejs.org/

#### Download Source Code
```shell
git clone git@github.com:yourdash/yourdash -b dev --recurse
```

#### Install yarn
```shell
npm i -g yarn
```

#### Install npm dependencies
```shell
# we do this twice because in some cases, the first time will error but will succeed the seccond time
yarn install && yarn install
```

> [!NOTE]
> Ensure Python 3.11.x is the default for installing yarn packages as 3.11.x+ will cause node-gyp errors during `bun install`

#### Run YourDash backend in dev mode
```shell
bun run dev-backend
```

#### Run YourDash web in dev mode
```shell
bun run dev-web
```

# See more in the docs

https://yourdash.ewsgit.uk/docs

# Credits

- Created by [Ewsgit](https://github.com/ewsgit)

## Top contributors

<a href="https://github.com/yourdash/yourdash/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourdash/yourdash" />
</a>
