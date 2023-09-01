import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
// enable for https testing. `import mkcert from "vite-plugin-mkcert"`

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig( {
  plugins: [
    react(),
    // enable for https tests. `mkcert()`
  ],
} )
