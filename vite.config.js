import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const BANNER = `/*! ${pkg.title} v${pkg.version} | Copyright (c) 2016-present ${pkg.author} */`;

export default defineConfig({
    plugins: [
        banner(BANNER)
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                paths: [
                    path.resolve(__dirname, './src/styles'),
                    path.resolve(__dirname, './src/styles/keditor')
                ]
            },
            scss: {}
        },
        devSourcemap: true
    },
    resolve: {
        alias: {
            'keditor': path.resolve(__dirname, './src/keditor')
        }
    },
    build: {
        lib: {
            entry: './src/index.js',
            name: 'KEditor',
            formats: ['umd', 'es'],
            fileName: (format) => `js/keditor.${format}.js`
        },
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            external: ['jquery'],
            output: {
                globals: {
                    jquery: 'jQuery'
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'css/keditor[extname]';
                    }
                    return 'assets/[name][extname]';
                }
            }
        },
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true
            }
        }
    }
});
