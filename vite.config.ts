import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/image': path.resolve(__dirname, './src/lib/next-image-shim.tsx'),
      'next/link': path.resolve(__dirname, './src/lib/next-link-shim.tsx'),
      'next/font/google': path.resolve(__dirname, './src/lib/next-font-shim.ts'),
    },
  },
  build: {
    outDir: 'dist',
  }
});
