const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'js/[name].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10 // 优先级
                },
                common: {
                    name: "common",
                    test: /[\\/]src[\\/]/,
                    minSize: 1024,
                    chunks: "all",
                    priority: 5
                }
            }
        }
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:"css-loader"
              })
            },
        ]
    },
    plugins: [
      new ExtractTextPlugin('css/[name].css')
    ]

};

module.exports = config;
