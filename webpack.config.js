const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin   = require('extract-text-webpack-plugin');

// 环境变量配置 dev/online
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        title: title,
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
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'result': ['./src/page/result/index.js']
    },
    mode: 'development',
    output: {
        path: 'dist',
        publicPath: '/dist',
        filename:'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
              test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
              loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
              test: /\.string$/,
              loader: 'html-loader'
            },
        ]
    },
    resolve : {
      alias : {
        util    : __dirname + '/src/util',
        node_modules    : __dirname + '/node_modules',
        page    : __dirname + '/src/page',
        image   : __dirname + '/src/image',
        service : __dirname + '/src/service',
      }
    },
    plugins: [
      // 独立通用模块到js/base.js
      new webpack.optimize.CommonsChunkPlugin({
        name : 'common',
        filename : 'js/base.js'
      }),
      // 将CSS单独打包至一个文件
      new ExtractTextPlugin("css/[name].css"),
      // html模板处理插件
      new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
      new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登陆')),
      new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
      new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
      new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
};

if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;
