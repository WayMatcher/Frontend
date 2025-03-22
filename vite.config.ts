import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        },
    },
    server: {
        // allowedHosts: ['waymatcher.hobedere.com'], // This is likely not needed with the proxy
        fs: {
            strict: true,
        },
        proxy: {
            // Add the proxy configuration here
            '/api': {
                // Proxy requests that start with /api
                target: 'http://localhost:5197', // Your ASP.NET API's base URL
                changeOrigin: true, // Needed for virtual hosted sites
                //rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix. We don't need this now.
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
