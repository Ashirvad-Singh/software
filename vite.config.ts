import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three') || id.includes('three-globe') || id.includes('three-stdlib') || id.includes('dotted-map')) {
              return 'three-vendor'
            }
            if (id.includes('@tabler/icons-react') || id.includes('lucide-react')) {
              return 'icons-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor'
            }
            if (id.includes('firebase')) {
              return 'firebase-vendor'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
