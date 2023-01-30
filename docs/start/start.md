# 起步

## webpack.config.js

项目根目录新建`webpack.config.js`，该文件名是webpack默认配置文件名，webpack会使用其中的配置信息进行打包

```js
const path = require("path") // webpack是基于node.js执行的，所以可以使用node.js的路径解析模块path
module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // 输出文件路径
    path: path.resolve(__dirname, "dist"), // resolve方法，该方法的作用是将方法参数解析成一个绝对路径返回，__dirname是Node.js的一个全局变量，表示当前文件的路径。这样，path.resolve(__dirname, '')表示的其实就是当前文件夹根目录的绝对路径
    // 输出文件名
    filename: "bundle.js",
    // 自动清空上次打包的内容
    // 原理：在打包前，将path目录整个目录内容清空，再进行打包
    clean: true
  },
  // 模块
  module: {
    // 配置loader
    rules: []
  },
  // 插件
  plugins: [],
  // 打包模式
  mode: "production"
}
```

现在只需要一行命令即可打包，会自动使用`webpack.config.js`的配置

```sh
  npx webpack 
```

## 


 <git-talk/> 
 
 <git-talk/> 
 