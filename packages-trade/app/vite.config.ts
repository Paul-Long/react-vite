/// <reference types="vitest" />
/// <reference types="vite/client" />

import {fileURLToPath} from 'node:url';

import {createAliasPlugin} from '@rx/vite-plugins/alias.mjs';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node';
import UnoCSS from 'unocss/vite';
import {defineConfig} from 'vite';
import buildPackage from './package.json';

const isProd = process.env['NODE_ENV'] === 'production';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const langRecordDic = new Map();

export default defineConfig({
  publicDir: isProd ? undefined : '../../public',
  plugins: [polyfillNode(), UnoCSS(), createAliasPlugin(), react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist/client',
    assetsDir: 'js',
    target: 'esnext',
    rollupOptions: {
      output: {
        entryFileNames: `s-${buildPackage.buildId}/js/main-[hash].js`,
        chunkFileNames: `s-${buildPackage.buildId}/js/chunk-[hash].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo?.name?.endsWith('.css')) {
            return `s-${buildPackage.buildId}/css/chunk-[hash][extname]`; // CSS 文件将被放到 'css' 文件夹中
          }
          return `s-${buildPackage.buildId}/assets/assets-[hash][extname]`;
        },
      },
    },
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
  define: {
    'process.env': process.env,
  },
});
