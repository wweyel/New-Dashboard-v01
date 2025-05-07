import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Root ist jetzt das Projektverzeichnis
  build: {
    outDir: 'dist', // Standardausgabe bleibt dist
  },
})