import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import embedCSS from 'rollup-plugin-embed-css';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/cjs.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        commonjs(),
        embedCSS(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};