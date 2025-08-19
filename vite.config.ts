/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  server: {
    port: 8102,
    host: true,
    proxy: {
      '/api': {
        target: 'https://adamix.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/medioambiente'),
        secure: false
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
