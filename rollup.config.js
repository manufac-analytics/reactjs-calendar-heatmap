import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    format: 'es',
    dir: 'dist/esm',
  },
  plugins: [
    nodeResolve({ extensions: ['.js', '.jsx'] }),
    babel({
      babelHelpers: 'bundled', // https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
      presets: [
        '@babel/env',
        ['@babel/preset-react', { runtime: 'automatic' }], // Ref: https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined
      ],
    }),
    postcss(),
  ],
  external: ['moment', 'd3', 'react', 'react/jsx-runtime'],
};
