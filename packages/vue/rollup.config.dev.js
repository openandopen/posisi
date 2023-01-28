import path from 'path'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import {babel} from '@rollup/plugin-babel';
import pkg from './package.json'
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import alias from '@rollup/plugin-alias'
import vue from "rollup-plugin-vue"
import image from "@rollup/plugin-image"


export default {
    input: 'src/index.ts',
    external: ['element-plus', 'vue'], // 告诉rollup，不打包element-plus,vue;将其视为外部依赖
    output: [
        {
            file: pkg.jsdelivr,
            format: 'umd',
            name: 'posisi-vue',
            sourcemap: true,
            globals: {
                vue: "Vue" // 告诉rollup全局变量Vue即是vue
            }
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            globals: {
                vue: "Vue" // 告诉rollup全局变量Vue即是vue
            }
        },

    ],

    plugins: [
        resolve(),
        commonjs(),
        vue({
            css: true,
            compileTemplate: true
        }),
        image(),
        json(),
        globals(),
        builtins(),
        babel({
            presets: ["@babel/preset-env", "@vue/babel-preset-jsx"],
            exclude: "node_modules/**"
        }),
        ts({
            tsconfig: path.resolve(__dirname, './tsconfig.json'),
            extensions: ['.js', '.ts', ".tsx", ".jsx"]
        }),
        alias({
            entries: [
                {find: "@/assets", replacement: path.join(__dirname, "./src/assets")},
                {find: "@/components", replacement: path.join(__dirname, "./src/components")},
                {
                    find: "@/feign",
                    replacement: path.join(__dirname, "./src/feign"),
                },
            ],
        }),


    ]
}
