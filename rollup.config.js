import babel from 'rollup-plugin-babel';
// import commonjs from 'rollup-plugin-commonjs'; don't need this since we're using lodash-es
import resolve from 'rollup-plugin-node-resolve';
import embedCSS from 'rollup-plugin-embed-css';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/esm.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            embedCSS(),
            babel({
                exclude: 'node_modules/**'
            }),
        ],
        external: [
            'lodash-es/indexOf',
            'lodash-es/keys',
            'lodash-es/uniqueId',
            'react',
            'react-dom'
        ]
    }
];