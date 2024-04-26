import {createAliasPlugin} from '@rx/vite-plugins/alias.mjs';
import {csrLangFilePlugin} from '@rx/vite-plugins/plugin-lang-csr.mjs';
import {vitePluginNodeGlobals} from '@rx/vite-plugins/vite-plugin-node-globals.mjs';
import react from '@vitejs/plugin-react';
import {join} from 'node:path';
import crypto from 'node:crypto'
import UnoCSS from 'unocss/vite';
import {build} from 'vite';
import {viteExternalsPlugin} from 'vite-plugin-externals';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

let __dirname;
const langRecordDic = new Map();

export const buildAll = async ({dirname, worker, csr, ssr, buildPackages}) => {
  __dirname = dirname;
  const workerEntryFileName = await buildWorker(worker);
  // TODO: 检查 buildId 是否重复
  for (const buildPackage of buildPackages) {
    const output = await buildCSR(csr, buildPackage, workerEntryFileName);
    await buildSSG(ssr, buildPackage, output);
  }
};

async function buildWorker({name, entry}) {
  const now = Date.now();
  console.log(`[WORKER] start build`);
  const id = genHash(name);
  const {output} = await build({
    configFile: false,
    envFile: false,
    root: __dirname,
    build: {
      outDir: `dist/client/${id}`,
      target: 'esnext',
      minify: true,
      rollupOptions: {
        input: entry,
        output: {
          entryFileNames: 'js/worker-[hash].js',
        },
      },
    },
    plugins: [createAliasPlugin()],
  });
  const {fileName} = output.find((o) => o.isEntry);
  console.log(`[WORKER] build complete (${Date.now() - now}ms)`);
  return `/${id}/${fileName}`;
}

async function buildCSR(csr, buildPackage, workerEntryFileName) {
  const {name, main} = buildPackage;
  const now = Date.now();
  console.log(`[CSR] start build ${name}`);
  const id = genHash(name);
  const moduleId = join(name, main);
  const {output} = await build({
    configFile: false,
    envFile: false,
    root: __dirname,
    define: {
      __WORKER_URL__: `"${workerEntryFileName}"`,
    },
    base: `/${id}`,
    build: {
      outDir: `dist/client/${id}`,
      target: 'esnext',
      minify: true,
      rollupOptions: {
        input: csr.entry,
        output: {
          entryFileNames: 'js/main-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/chunk-[hash][extname]'; // CSS 文件将被放到 'css' 文件夹中
            }
            return 'assets/assets-[hash][extname]';
          },
          chunkFileNames: 'js/chunk-[hash].js',
        },
      },
    },
    resolve: {
      alias: {
        'crypto': 'crypto-browserify',
      },
    },
    plugins: [
      UnoCSS(),
      createAliasPlugin(),
      createOneRouteGroupPlugin(moduleId),
      csrLangFilePlugin(langRecordDic, join(__dirname, 'dist'), id),
      viteExternalsPlugin({
        echarts: 'echarts',
        react: 'React',
        'react-dom': 'ReactDOM',
      }),
      react(),
      nodePolyfills({globals: {process: true, global: false}})
    ],
  });
  const entry = output.find((o) => o.isEntry);
  const css = output.filter((o) => o.fileName.endsWith('.css')).map((o) => `/${id}/${o.fileName}`);
  console.log(`[CSR] complete build ${name}  (${Date.now() - now}ms)`);
  return {entryFileName: `/${id}/${entry.fileName}`, css};
}

async function buildSSG(ssr, buildPackage, output) {
  const {buildId, name, main} = buildPackage;
  const now = Date.now();
  console.log(`[SSG] start build ${name}`);
  const moduleId = join(name, main);
  await build({
    configFile: false,
    envFile: false,
    root: __dirname,
    define: {
      __ENTRY_FILE_NAME__: `"${output.entryFileName}"`,
      __ENTRY_CSS_FILES__: output.css,
      __ENTRY_LANG_FILES__: JSON.stringify(Object.fromEntries(langRecordDic)),
    },
    ssr: {format: 'esm'},
    build: {
      outDir: `dist/ssg/${buildId}`,
      ssr: ssr.entry,
      target: 'esnext',
      minify: false,
      rollupOptions: {
        output: {
          entryFileNames: 'app-ssg.mjs',
          chunkFileNames: 'template-[hash].mjs',
        },
      },
    },
    resolve: {
      alias: {
        'crypto': 'crypto-browserify',
      },
    },
    plugins: [
      UnoCSS(),
      createAliasPlugin(),
      createOneRouteGroupPlugin(moduleId),
      react(),
      vitePluginNodeGlobals(),
    ],
  });
  console.log(`[SSG] complete build ${name}  (${Date.now() - now}ms)`);
}

function createOneRouteGroupPlugin(moduleId) {
  const virtualModuleId = 'templates-center';
  return {
    name: 'one-route-group-plugin',
    resolveId(source) {
      if (source === virtualModuleId) {
        return source;
      }
      return null;
    },
    load(id) {
      if (id === virtualModuleId) {
        return `import '${moduleId}';`;
      }
      return null;
    },
  };
}

function genHash(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);

  const fullHash = hash.digest('hex');

  return fullHash.substring(0, 8);
}
