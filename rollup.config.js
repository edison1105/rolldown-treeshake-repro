import { defineConfig } from 'rollup'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/rollup.js',
    format: 'es',
  },
  treeshake: {
    moduleSideEffects: false,
  },
  plugins: [
    replace({
      preventAssignment: true,
      __FEATURE_A__: 'true',
      __FEATURE_B__: 'false',
    }),
  ],
})
