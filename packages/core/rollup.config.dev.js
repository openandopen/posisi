import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import {babel} from '@rollup/plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import autoExternal from 'rollup-plugin-auto-external';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
        {
            file:   "dist/index.umd.js", //pkg.jsdelivr,
            format: 'umd',
            es5: true,
            name: 'posisi',
            sourcemap: false,
        },
        {
            file:   "dist/index.cjs.js", //pkg.jsdelivr,
            format: 'cjs',
            es5: false,
            name: 'posisi',
            sourcemap: false,
        },
        {
            file:  "dist/index.esm.js", //pkg.module,
            format: 'esm',
            sourcemap: true,
         },

    ],
    plugins: [
        resolve(),
        commonjs(),
        json(),
        globals(),
        builtins(),
        terser(),
        autoExternal(),
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
