import babel from "rollup-plugin-babel"
import VuePlugin from "rollup-plugin-vue"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { terser } from "rollup-plugin-terser"

const pkgInfo = require("./package.json")
const DESTINATION = "lib"
const MODULE_NAME = "three-dimensional-slider"
const BANNERTEXT = 
    '/*\n' +
    ` * ${pkgInfo.name} v${pkgInfo.version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} ${pkgInfo.author}\n` +
    ` * Released under the ${pkgInfo.license} License.\n` +
    ' */'

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
            quote_style:3,
            comments: BANNERTEXT
        },
        ecma:5,
        mangle:false,
        module:true
    })
]

function RollupBuild(codeFormat,suffix=`${codeFormat}.min`){
    return {
        input: 'src/three-dimensional-slider.js',
        cache:false,
        plugins: RollUpPlugins,
        output: {
            file: `${DESTINATION}/${MODULE_NAME}.${suffix}.js`,
            format: codeFormat,
            name: MODULE_NAME,
            indent:false,
            extend:true,
            sourcemap:true,
            exports:'named',
            banner:BANNERTEXT
        },
        external:["vue","axios","loadsh"]
    }
}
export default [
    RollupBuild('es','esm'),
    RollupBuild('umd'),
    RollupBuild('system'),
    RollupBuild('amd'),
    RollupBuild('cjs','common'),
    RollupBuild('iife')
]