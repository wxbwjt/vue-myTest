'use strict'
require('./check-versions')()
require('shelljs/global')
process.env.NODE_ENV = 'production'

const ora = require('ora')
const rim = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
var fs = require('fs');
const spinner = ora('building for production...')
spinner.start()

rim(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
      var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
      rm('-rf',config.build.realProjectRoot);
      cp('-R',assetsPath,config.build.realProjectRoot);
      fs.readFile(path.join(config.build.assetsRoot,'./asm_index.html'),function(err,data){
          if(err) throw err;
          var src = '<%@ page contentType="text/html;charset=UTF-8" language="java" %>'+data.toString('utf8');
          let  srcBuffer = Buffer.from(src,'utf8');
          let jspPath = path.resolve(config.build.realProjectRoot,'../../../','./WEB-INF/views/modules/sys/asm_index.jsp');
          fs.writeFile(jspPath,srcBuffer,(err)=>{
              if(err) throw err;
              process.stdout.write('replaced asm_index.jsp');
          });
      });
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
