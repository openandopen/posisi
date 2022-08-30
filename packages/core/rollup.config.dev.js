import path from 'path'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import {babel} from '@rollup/plugin-babel';
import pkg from './package.json'
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.jsdelivr,
            format: 'umd',
            name: 'posisi',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        json(),
        globals(),
        builtins(),
        babel({
            presets: ["@babel/preset-env"],
            exclude: "node_modules/**"
        }),
        ts({
            tsconfig: path.resolve(__dirname, './tsconfig.json'),
            extensions: ['.js', '.ts']
        })


    ]
}
