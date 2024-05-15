import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import externalGlobals from 'rollup-plugin-external-globals'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['lodash', 'vue']
    }
  },
  plugins: [vue(), vueJSX(), externalGlobals({
    vue: 'Vue'
  })]
})