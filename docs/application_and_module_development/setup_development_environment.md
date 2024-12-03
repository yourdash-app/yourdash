# Setup YourDash Development Environment (outdated)

## 1. Install required dependencies

To develop for / with YourDash, you will need the following dependencies:

- Git
- Bun
- NodeJs
- Yarn
- Emscripten (Windows only)
- Text Editor / IDE of choice

---

### 1.1 Installing Git

<details closed>

<summary>Windows</summary>

#### Windows

```powershell
winget install --id Git.Git -e --source winget
```

</details>

<details closed>

<summary>Linux</summary>

#### Linux

<details closed>

<summary>Ubuntu / Debian</summary>

```bash
sudo apt install git
```

</details>

<details closed>

<summary>Arch Linux</summary>

```bash
sudo pacman -S git
```

</details>

</details>

---

### 1.2 Installing Bun

<details closed>

<summary>Windows</summary>

### Windows

```powershell
powershell -c "irm bun.sh/install.powershell | iex"
```

</details>

<details closed>

<summary>Linux</summary>

### Linux

<details closed>

<summary>Ubuntu / Debian</summary>

```bash
sudo apt install curl
curl -fsSL https://bun.sh/install | bash
```

</details>

<details closed>

<summary>Arch Linux</summary>

```bash
sudo pacman -S curl
curl -fsSL https://bun.sh/install | bash
```

</details>

</details>

---

### 1.3 Installing NodeJS

<details closed>

<summary>Windows</summary>

### Windows

```powershell
winget install Schniz.fnm
fnm use --install-if-missing --lts
```

</details>

<details closed>

<summary>Linux</summary>

### Linux

<details closed>

<summary>Ubuntu / Debian</summary>

```bash
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
```

</details>

<details closed>

<summary>Arch Linux</summary>

```bash
sudo pacman -S curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
```

</details>

</details>

---

### 1.4 Installing Yarn

<details closed>

<summary>Windows</summary>

### Windows

```powershell
npm i -g yarn
```

</details>

<details closed>

<summary>Linux</summary>

### Linux

<details closed>

<summary>Ubuntu / Debian</summary>

```bash
npm i -g yarn
```

</details>

<details closed>

<summary>Arch Linux</summary>

```bash
npm i -g yarn
```

</details>

</details>

---

### 1.5 Installing Emscripten (Windows only)

> This step is for Windows only.

<a href="https://emscripten.org/docs/getting_started/downloads.html">Download And Install Emscripten</a>

---

### 1.6 Installing An IDE / Text Editor

> This step can be skipped if you prefer to use another IDE or text editor.

### Webstorm (recommended but paid)

[Download Webstorm](https://www.jetbrains.com/webstorm/download/)

### Visual Studio Code (free and open source)

[Download Visual Studio Code](https://code.visualstudio.com/Download)

## 2. Restart your computer

> To help to avoid any issues, restart your computer before proceeding.

## 3. Clone YourDash From GitHub

### Main Branch

<details closed>

<summary>Windows</summary>

### Windows

```powershell
git clone git@github.com:yourdash/yourdash.git
```

</details>

<details closed>

<summary>Linux</summary>

### Linux

```bash
git clone git@github.com:yourdash/yourdash.git
```

</details>

### Dev Branch

<details closed>

<summary>Windows</summary>

### Windows

```powershell
git clone git@github.com:yourdash/yourdash.git -b dev
```

</details>

<details closed>

<summary>Linux</summary>

### Linux

```bash
git clone git@github.com:yourdash/yourdash.git -b dev
```

</details>

## 4. Install YourDash's npm dependencies with Yarn

<details closed>

<summary>Windows</summary>

### Windows

```powershell
yarn install
```

</details>

<details closed>

<summary>Linux</summary>

### Linux

```bash
yarn install
```

</details>

## 5. Start YourDash from the command line

> The following commands must only be run from the directory which YourDash was cloned to.

<details closed>

<summary>Windows</summary>

### Windows

#### Start the backend in development mode
```powershell
yarn run dev-backend
```

#### Start the web client in development mode
```powershell
yarn run dev-web
```

</details>

<details closed>

<summary>Linux</summary>

### Linux

#### Start the backend in development mode
```bash
yarn run dev-backend
```

#### Start the web client in development mode
```bash
yarn run dev-web
```

</details>
