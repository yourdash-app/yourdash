import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import * as path from "path";

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      helpers: path.resolve(process.cwd(), `./src/helpers/`),
      ui: path.resolve(process.cwd(), `./src/ui/`),
    },
  },
  plugins: [react(), dynamicImport()],
});
