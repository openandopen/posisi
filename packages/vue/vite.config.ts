import {resolve} from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';


const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
    '@/': pathResolve('./src/'),
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};


// https://vitejs.dev/config/
export default defineConfig({
    base: '/',

    plugins: [
        vue()
    ],
    resolve: {alias},
    define: {
        'process.env': {},
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "element-plus/dist/index.css" as *;`,
            }
        },
    },
    build: {
        target: 'modules',
        outDir: 'dist',           // 指定输出路径
        minify: 'terser',         // 混淆器,terser构建后文件体积更小
        sourcemap: false,         // 输出.map文件
        terserOptions: {
            compress: {
                drop_console: true,   // 生产环境移除console
                drop_debugger: true   // 生产环境移除debugger
            }
        },
    }
})
