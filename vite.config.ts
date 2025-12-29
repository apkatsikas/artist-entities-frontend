import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allow `describe`, `it`, etc. without imports
    environment: 'happy-dom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    proxy: {
      '/artist/random': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/artist': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  base: './',
  build: {
    assetsDir: '.',
  },
});
