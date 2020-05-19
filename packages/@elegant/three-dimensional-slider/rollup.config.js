import babel from "rollup-plugin-babel"
import VuePlugin from "rollup-plugin-vue"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { terser } from "rollup-plugin-terser"

const pkgInfo = require("./package.json")
const DESTINATION = "lib"
const MODULE_NAME = "three-dimensional-slider"
const BANNER = 
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
            quote_style:3
        },
        ecma:5,
        mangle:false,
        module:true
    })
]

function RollupBuild(codeFormat,suffix=`${codeFormat}.min`){
    return {
        input: 'src/three-dimensional-slider.vue',
        cache:false,
        plugins: RollUpPlugins,
        output: {
            file: `${DESTINATION}/${MODULE_NAME}.${suffix}.js`,
            format: codeFormat,
            name: MODULE_NAME,
            indent:false,
            sourcemap:true,
            exports:'named',
            banner:BANNER
        },
        external:["vue","axios","loadsh"]
    }
}
export default [
    RollupBuild('es','esm'),
    RollupBuild('umd','umd'),
    RollupBuild('system','system'),
    RollupBuild('amd','amd'),
    RollupBuild('cjs','cjs'),
    //RollupBuild('iife')
]