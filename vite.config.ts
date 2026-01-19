import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Salaxy',
      fileName: (format) => `salaxy.${format === 'es' ? 'js' : 'umd.js'}`,
    },
  },
  resolve: {
    alias: {
      '@salaxy/expressions': resolve(__dirname, './@salaxy/expressions'),
    },
  },
});
