import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssr: {
    noExternal: ['react-helmet-async', 'file-saver', 'react-signature-canvas', 'jszip', 'pdf-lib', '@vercel/analytics', '@vercel/speed-insights', 'react-ga4'],
  },
  ssgOptions: {
    includedRoutes: async (paths, routes) => {
      // Only pre-render the home page and potentially static pages like privacy if they exist.
      // For now, limiting to root '/' satisfies the SEO requirement.
      return paths.filter(path => path === '/');
    },
  },
})

