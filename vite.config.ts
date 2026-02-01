import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose server to network
    port: 5173, // Default Vite port
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
            if (id.includes('framer-motion')) return 'vendor-framer'
            if (id.includes('firebase')) return 'vendor-firebase'
            if (id.includes('react-router')) return 'vendor-router'
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 400,
  },
})
