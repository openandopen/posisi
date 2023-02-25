import path from 'path'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import {babel} from '@rollup/plugin-babel';
//import pkg from './package.json' assert {type: "json"};
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
    input: 'src/index.ts',
    output: [
        {
            file:   "dist/index.umd.js", //pkg.jsdelivr,
            format: 'umd',
            name: 'posisi',
            sourcemap: true,
        },
        {
            file:  "dist/index.esm.js", //pkg.module,
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
            tsconfig: "tsconfig.json",//path.resolve(__dirname, './tsconfig.json'),
            extensions: ['.js', '.ts','.json','.cjs']
        })


    ]
}
