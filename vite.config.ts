import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Root path for Vercel deployment
  // Change to '/setupWiz/' if deploying to GitHub Pages
  base: '/',
})

