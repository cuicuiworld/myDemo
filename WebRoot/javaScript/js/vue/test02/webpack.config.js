var path = require('path');
module.exports = {
  entry: ['./src/main.js'],     //项目入口文件的路径，可以有多个文件，单个文件可以不用中括号
  output: {     //定义webpack输出的文件，这里设置了文件输出在dist文件夹下面的build.js
    path: './dist',
    publicPath:'dist/',
    filename: 'build.js'
  },
  //配置自动刷新,如果打开会使浏览器刷新而不是热替换
  /*devServer: {
   historyApiFallback: true,
   hot: false,
   inline: true,
   grogress: true
   },*/
  module: {
    loaders: [
      //转化ES6语法
      {
        test: /\.js$/,          //这里是匹配文件的正则
        loader: 'babel',        //这里是指定调用loader去处理对应文件类型
        exclude: /node_modules/
      },
      //解析.vue文件
      {
        test:/\.vue$/,
        loader:'vue'
      },
      //图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        loader:'url-loader?limit=8192'
      }
    ]
  },
  vue:{
    loaders:{
      js:'babel'
    }
  },
  resolve: {
    // require时省略的扩展名，如：require('app') 不需要app.js
    extensions: ['', '.js', '.vue'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      filter: path.join(__dirname, './src/filters'),
      components: path.join(__dirname, './src/components')
    }
  }
}
