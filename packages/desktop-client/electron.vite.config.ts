import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig( {
  main: {
    plugins: [
      externalizeDepsPlugin()
    ],
  },
  preload: {
    plugins: [
      externalizeDepsPlugin()
    ]
  },
  renderer: {
    server: {
      port: 5174
    },
    plugins: [
      react()
    ]
  }
} )
