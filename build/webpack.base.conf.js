'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var glob = require('glob')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
var SRC_PATH = path.resolve(__dirname,"../src");
var entries = getEntries(path.resolve(SRC_PATH,'./**/main.js')); // 获得入口js文件
  var webpackConfig = {
  entry: {},
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
    plugins:[],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
          use: [{
              loader: 'babel-loader',
              options: {
                  presets: ['es2015'],
                  compact: false
              }
          }],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
function getEntries(globPath){
  var files = glob.sync(globPath),
    entries = {};
  files.forEach(function(filepath){
    // 取倒数第二层(view下面的文件夹)做包名
    var split = filepath.split('/');
    var name = split[split.length - 2];
    entries[name] = filepath;
  });

  return entries;
}
  Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    var entryPath = entries[name];
    //设置路由
    // var routeObj = {from:new RegExp('\\/'+name+'$'),to:"/"+name+".html"};
    //rewrites.push(routeObj);


    webpackConfig.entry[name] = entryPath;
    var moudlePath = entryPath.slice(0,entryPath.lastIndexOf("/"))
    // 每个页面生成一个html
    var hwconfig = {
      // 生成出来的html文件名
      filename: name + '_index.html',
      // 每个html的模版,使用每个模块根目录下的'index.html'
      template: path.resolve(moudlePath,'index.html'),
      // 自动将引用插入html
      inject: true,
      chunks:['manifest','vendor',name]
    };
    if(process.env.NODE_ENV === 'production'){
      hwconfig.chunksSortMode = 'dependency';
      hwconfig.filename = path.resolve(config.build.index,name+ '_index.html');
      hwconfig.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }
    var plugin = new HtmlWebpackPlugin(hwconfig);
     webpackConfig.plugins.push(plugin);
  });


module.exports = webpackConfig;