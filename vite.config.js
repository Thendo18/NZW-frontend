import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:7135',
                changeOrigin: true,
                secure: false,
            }
        },
        port: 5173
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser'
    }
});
