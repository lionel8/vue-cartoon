import babel from "rollup-plugin-babel"
import VuePlugin from "rollup-plugin-vue"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { terser } from "rollup-plugin-terser"

const pkg = require("./package.json")
const DESTINATION = "dist"
const MODULE_NAME = "three-dimensional-slider"
const BANNER = `/* ${pkg.name} v${pkg.version} ${pkg.author} ${pkg.license} */`

const RollUpPlugins = [
    VuePlugin(),
    resolve({
        jsnext:true,
        main:true,
        browser:true
    }),
    commonjs(),
    babel({
        exclude: 'node_modules/**',
        presets:[
            ['@babel/env',{modules:false}]
        ],
        extensions:['.js','.jsx','.es6','.vue']
    }),
    terser({
        compress:false,
        output:{
            beautify:true,
            quote_style:3
        },
        ecma:5,
        mangle:false,
        module:true
    })
]

function RollupBuild(codeFormat,suffix=`${codeFormat}.min`){
    return {
        input: 'src/index.js',
        cache:false,
        plugins: RollUpPlugins,
        output: {
            file: `${DESTINATION}/${MODULE_NAME}.${suffix}.js`,
            format: codeFormat,
            name: MODULE_NAME,
            indent:false,
            sourceMap:true,
            exports:'named',
            banner:BANNER
        },
        external:["vue","axios","loadsh"]
    }
}
export default [
    RollupBuild('es','esm'),
    RollupBuild('umd'),
    // RollupBuild('system'),
    // RollupBuild('amd'),
    // RollupBuild('cjs'),
    // RollupBuild('iife')
]