import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

function config({context = undefined, output = {}, external = []}) {
  return {
    input: 'src/index.ts',
    context: context,
    output: {
      ...output,
    },
    external: [
      ...external,
    ],
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
    ]
  }
}

export default [
  config({
    output: {
      format: 'umd',
      file: 'packages/dj-hello-world/index.js',
      name: 'DJ_Hello_World',
    },
  }),
  config({
    output: {
      format: 'esm',
      file: 'packages/dj-hello-world/index.esm.js',
    },
  }),
  config({
    output: {
      format: 'esm',
      file: 'packages/dj-hello-world-es/index.js',
    },
    external: ['lodash-es/values']
  }),
  // config({
  //   output: {
  //     format: 'umd',
  //     file: 'packages/dj-hello-world-umd/index.js',
  //     name: 'DJ_Hello_World',
  //     globals: {
  //       'lodash-es': '_'
  //     }
  //   },
  //   external: ['lodash-es']
  // }),
];