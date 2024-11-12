/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import react from "@vitejs/plugin-react";
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
  root: "./",
  base: "./",
  build: {
    rollupOptions: {
      external: ["chart.js"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
});
