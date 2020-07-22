import babel from '@rollup/plugin-babel';
// import commonjs from 'rollup-plugin-commonjs'; don't need this since we're using lodash-es
import resolve from '@rollup/plugin-node-resolve';
import embedCSS from 'rollup-plugin-embed-css';
import { terser } from 'rollup-plugin-terser';

// n.b.:  May 23, 2020: @rollup/plugin-commonjs is stuck at 11.0.2 due to outstanding bug
// for babelHelpers see
// https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/react-dump.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
//            json({
//              preferConst: true,
//              compact:true
//            }),
//            scss(),
            embedCSS(),
            babel({
              babelHelpers: 'bundled',
              exclude: 'node_modules/**'
            }),
//            commonjs(),
            terser(),
        ],
        external: [
          'lodash-es/includes',
          'lodash-es/indexOf',
          'lodash-es/forEach',
          'lodash-es/keys',
          'lodash-es/uniqueId',
          'react',
          'react-dom'
        ]
    }
];


/*
export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/react-dump.js',
            format: 'esm',
            plugins: [terser()]
        },
        plugins: [
            resolve(),
            embedCSS(),
            babel({
                exclude: 'node_modules/**'
            }),
        ],
        external: [
            'lodash-es/includes',
            'lodash-es/indexOf',
            'lodash-es/forEach',
            'lodash-es/keys',
            'lodash-es/uniqueId',
            'react',
            'react-dom'
        ]
    }
];
*/
