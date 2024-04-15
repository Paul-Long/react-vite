/// <reference types="vitest" />
/// <reference types="vite/client" />

import {createAliasPlugin} from '@rx/vite-plugins/alias.mjs';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  publicDir: '../../public',
  plugins: [UnoCSS(), createAliasPlugin(), react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
  define: {
    'process.env': process.env,
  },
});
