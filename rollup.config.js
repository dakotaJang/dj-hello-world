import typescript from 'rollup-plugin-typescript2';

function config({output = {}}) {
  return {
    input: 'src/index.ts',
    output: {
      ...output,
    },
    plugins: [
      typescript()
    ]
  }
}

export default [
  config({
    output: {
      format: 'iife',
      file: 'packages/dj-hello-world-iife/index.js',
      name: 'DJ_Hello_World',
    }
  }),
  config({
    output: {
      format: 'esm',
      file: 'packages/dj-hello-world-es/index.js',
    }
  }),
  config({
    output: {
      format: 'cjs',
      file: 'packages/dj-hello-world/index.js',
    }
  })
];