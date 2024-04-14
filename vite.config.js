import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue(), vueJsx(), externalGlobals({
    vue: 'Vue',
    'element-plus': 'ElementPlus'
  })],
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus']
    }
  }
})
