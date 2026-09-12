import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: {
    sourcemap: false,
    minify: 'oxc',
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 350,
  },
})
