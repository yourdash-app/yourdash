/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import dynamicImport from "vite-plugin-dynamic-import";
import dts from "vite-plugin-dts";

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport(), dts({ include: ["src"] })],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  publicDir: "./src/theme/",
  build: {
    lib: {
      entry: resolve(__dirname, "src/uikit.ts"),
      formats: ["es"],
    },
    copyPublicDir: true,
  },
});
