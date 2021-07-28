import { resolve } from 'path'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'

/** @type {import('rollup').RollupOptions} */
const options = {
  output: [
    {
      format: 'cjs',
      file: 'lib/bundle.min.js',
      exports: 'auto',
    },
  ],
  input: resolve(__dirname, 'src/index.ts'),
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts'],
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
  external: ['postcss'],
}

export default options
