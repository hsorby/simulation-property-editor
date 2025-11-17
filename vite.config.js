import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // This is the key option for building a library
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'SimPropertyEditor', // The global variable name (for UMD builds)
      fileName: (format) => `simpropertyeditor.${format}.js`, // 'my-vue-component.es.js', 'my-vue-component.umd.js'
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})