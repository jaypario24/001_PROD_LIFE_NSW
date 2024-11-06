import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/esm/index.js',
      format: 'es',
    },
    {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: 'MedipassTransactionSDK',
    },
  ],
  plugins: [json(), terser(), typescript(), commonjs({ include: /node_modules/ }), nodeResolve(), nodePolyfills()],
};
