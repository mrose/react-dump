import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import embedCSS from 'rollup-plugin-embed-css';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/react-dump.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            json({
              preferConst: true,
              compact:true
            }),
            embedCSS(),
            babel({
                exclude: 'node_modules/**'
            }),
            commonjs(),
            terser(),
        ],
        external: [
            'react',
            'react-dom'
        ]
    }
];
