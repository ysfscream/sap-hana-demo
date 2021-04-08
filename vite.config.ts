import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/test': {
        target: 'http://10.207.198.5:8888',
        changeOrigin: true,
      }
    }
  },
})
