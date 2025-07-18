import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig({
  css: {
    devSourcemap: true, // Enable sourcemap CSS when dev
  },
  preview: {
    port: 3000, // Port cho preview
    host: true, // Allow access from other devices on the network
    strictPort: true, // Prevent the server from trying to use another port if 3000 is already in use
  },
  server: {
    port: 3000, // Port for the development server
    host: true, // Allow access from other devices on the network
    strictPort: true, // Prevent the server from trying to use another port if 3000 is already in use
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson()],
})
