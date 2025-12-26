import { defineConfig } from 'rolldown'

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/rolldown.js',
    format: 'esm',
    minify: 'dce-only',
  },
  treeshake: {
    moduleSideEffects: false,
  },
})
