import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import embedCSS from 'rollup-plugin-embed-css';
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
            embedCSS(),
            babel({
                exclude: 'node_modules/**'
            }),
            terser(),
        ],
        external: [
            'react',
            'react-dom'
        ]
    }
];