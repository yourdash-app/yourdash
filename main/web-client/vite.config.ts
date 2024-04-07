/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
// enable for https testing. `import mkcert from "vite-plugin-mkcert"`

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dynamicImport(),
    // enable for https tests. `mkcert()`
  ],
  appType: "spa",
  root: ".",
});
