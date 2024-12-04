/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import react from "@vitejs/plugin-react";
import { glob } from "glob";
import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import dynamicImport from "vite-plugin-dynamic-import";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { fileURLToPath } from "url";

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react(), dynamicImport(), dts({ include: ["src"] }), libInjectCss()],
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
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: ["src/**/*.d.ts"],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative("src", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            // @ts-ignore
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
