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
  base: './',
  build: {
    assetsDir: '.',
  },
});
