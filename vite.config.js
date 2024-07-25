import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/jason-huang-dev.github.io/",
  server: {
    port: 5173,
    open: true,
    cors: {
      origin: '*', // Allow all origins
      methods: '*',
      allowedHeaders: '*',
    },
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
})
