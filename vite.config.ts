import { defineConfig } from 'vite';
import MillionLint from '@million/lint';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';

    return {
        plugins: [react(), MillionLint.vite()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            },
        },
        server: isProduction
            ? undefined
            : {
                  allowedHosts: true,
                  proxy: {
                      '/api': {
                          target: 'http://localhost:5197',
                          changeOrigin: true,
                      },
                  },
              },
    };
});
