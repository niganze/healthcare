import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/material': '@mui/material', // adjust this according to your project structure
      '@mui/icons-material': '@mui/icons-material', // adjust this according to your project structure
    },
  },
})
