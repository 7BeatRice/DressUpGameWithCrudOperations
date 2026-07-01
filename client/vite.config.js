import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'picocss': path.resolve(__dirname, '../node_modules/@picocss/pico/css')
    }
  },
  server: {
    proxy: {
      '/character': {
        target: 'http://localhost:3000'
      },
       '/skins': {
        target: 'http://localhost:3000'
      },
       '/hairs': {
        target: 'http://localhost:3000'
      },
       '/tops': {
        target: 'http://localhost:3000'
      },
       '/bottoms': {
        target: 'http://localhost:3000'
      },
       '/dresses': {
        target: 'http://localhost:3000'
      }
  
    }
  }
})
