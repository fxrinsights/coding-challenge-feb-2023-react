/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import checker from 'vite-plugin-checker'

const babelPluginsList = [
  'babel-plugin-macros',
  'babel-plugin-styled-components',
]

const babelPluginPaths = [path.resolve('../ui'), path.resolve('../common')]
/* const babelPluginFilter = new RegExp(`^(${babelPluginPaths.join('|')}).*\.jsx`) */
const babelPluginFilter = new RegExp(
  `^(${babelPluginPaths.join('|')}).*\.(j|t)sx`
)

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  return defineConfig({
    server: {
      port: 3000,
    },
    resolve: {
      alias: {},
    },
    plugins: [
      babel({
        babelConfig: {
          babelrc: false,
          configFile: false,
          plugins: babelPluginsList,
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
        },
        filter: babelPluginFilter,
      }),
      react({
        babel: {
          plugins: babelPluginsList,
        },
      }),
      checker({
        typescript: true,
        overlay: true,
      }),
    ],
    define: {
      'process.env': process.env,
    },
  })
}
