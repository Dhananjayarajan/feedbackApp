// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],
   optimizeDeps: {
    include: ['@stripe/stripe-js'],
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5005',
        changeOrigin: true,
        secure: false,
      }, "/api" : {
        target : 'http://localhost:5005',
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
