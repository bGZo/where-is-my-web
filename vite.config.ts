import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// import mdPlugin, {Mode} from 'vite-plugin-markdown'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // via: https://www.npmjs.com/package/vite-plugin-markdown
    // mdPlugin({
    //   mode: [Mode.HTML, Mode.MARKDOWN]
    // }),
  ],
  // assetsInclude: ['**/**/*.md'], // 将 md 文件视为静态资源
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
