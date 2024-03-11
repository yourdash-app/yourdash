import { defineConfig, externalizeDepsPlugin } from "electron-vite";

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
      port: 5174,
      hmr: {
        overlay: true
      }
    },
    plugins: [],
  }
} )
