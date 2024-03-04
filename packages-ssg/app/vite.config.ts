/// <reference types="vitest" />
/// <reference types="vite/client" />

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import {createAliasPlugin} from '@rx/vite-plugins/alias.mjs';

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
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    threads: false,
    isolate: false,
  },
  define: {
    'process.env': process.env,
  },
});
