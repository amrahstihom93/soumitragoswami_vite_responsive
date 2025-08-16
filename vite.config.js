import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cert: resolve(__dirname, 'cert.html'),
        ins: resolve(__dirname, 'ins.html'),
        itr: resolve(__dirname, 'itr.html'),
        loan: resolve(__dirname, 'loan.html'),
        login: resolve(__dirname, 'login.html'),
        other: resolve(__dirname, 'other.html'),
        sip: resolve(__dirname, 'sip.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  publicDir: 'public',
});
