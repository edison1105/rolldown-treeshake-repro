import { defineConfig } from 'rolldown'

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/rolldown.js',
    format: 'es',
    minify: 'dce-only'
  },
  treeshake: {
    moduleSideEffects: false,
  }
})
