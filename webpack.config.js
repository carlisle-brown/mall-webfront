const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 环境变量配置 dev/online
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name) {
    return {
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        inject: true,
        hash: true,
        chunks: ['common',name]
    };
}
// webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist',
        filename:'js/[name].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
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
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
              test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
              loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
        ]
    },
    plugins: [
      // 将CSS单独打包至一个文件
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      // html模板处理插件
      new HtmlWebpackPlugin(getHtmlConfig('index')),
      new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]

};

if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;
