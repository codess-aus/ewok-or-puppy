import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'img/**/*', 'models/**/*'],
      manifest: {
        name: 'Ewok or Puppy',
        short_name: 'EwokPuppy',
        description: 'Check if your puppy joined the Dark Side',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['customvision-tfjs']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'tensorflow': ['customvision-tfjs']
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    fs: {
      strict: false,
      allow: ['..']
    }
  }
})