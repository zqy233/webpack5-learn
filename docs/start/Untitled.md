# 起步

## 处理图片

webpack5之前，使用`file-loader`和`url-loader`，处理图片资源

webpack5，已将两个loader功能内置

```js
 module: {
    // 配置loader
    rules: [
        {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于100kb的图片转base64
            // 优点，减少请求数量，缺点，体积会大一点
            maxSize: 100 * 1024 // 100kb
          }
        }
      }
    ]
  }
```

## 设置输出文件

js文件输出在js目录，图片文件输出在imgs目录

```js
const path = require("path") // webpack是基于node.js执行的，所以可以使用node.js的路径解析模块path
module.exports = {
  // 输出
  output: {
    // 输出文件路径
    path: path.resolve(__dirname, "dist"), // resolve方法，该方法的作用是将方法参数解析成一个绝对路径返回，__dirname是Node.js的一个全局变量，表示当前文件的路径。这样，path.resolve(__dirname, '')表示的其实就是当前文件夹根目录的绝对路径
    // 输出文件名
    filename: "js/bundle.js"
  },
  // 模块
  module: {
    // 配置loader
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转base64
            // 优点，减少请求数量，缺点，体积会大一点
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          // 输出图片 hash表示唯一hash标识 ext表示文件扩展名 query表示参数，如果存在则会加上
          filename: "imgs/[hash:10][ext][query]"
        }
      }
    ]
  }
}
```

## 处理字体图标与视频

```js
module: {
    // 配置loader
    rules: [
        {
        test: /\.(ttf|woff2?|map3|map4|avi)$/,
        type: "asset/resource",
        generator: {
          // 输出字体图标在font文件夹下
          filename: "media/[hash:10][ext][query]"
        }
      }
    ]
  }
```

## eslint

webpack默认是不做代码校验与兼容性处理的

针对代码校验，可以使用eslint来完成

eslint是用于校验js或jsx语法的工具，可以配置校验规则，可以通过配置文件或package.json配置的方法设置

#### 配置文件

可以有很多不同的后缀名写法

- `.eslintrc.*`：新建文件，处于项目根目录

  - `.eslintrc`
  - `.eslintrc.js`
  - `.eslintrc.json`
  - 区别在于配置格式不一样
  - `package.json`中`eslintConfig`：不需要创建配置文件

  eslint会自动查找读取配置文件，使用其中的规则

#### 具体配置

```sh
npm i -D eslint eslint-webpack-plugin
```

如果使用的是`typescript`的话，则还需安装

```sh
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

`.eslintrc.js`中设置

```js
module.exports = {
  // 使用的解析器
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module"
  },
  // 使用的插件
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "no-var": 2
  }
}
```

`webpack.config.js`中设置

```js
const ESLintPlugin = require("eslint-webpack-plugin")

module.exports = {
  ...
  plugins: [
    new ESLintPlugin({
      extensions: ["js", "ts", "vue"],
      exclude: ["node_modules"]
    })
  ]
}
```

## babel

> JavaScript编译器，可以将es6编写的代码转换为向后兼容的js语法，以便能够运行在当前和旧版本的浏览器或其他环境中

webpack默认是不做代码校验与兼容性处理的

针对js兼容性处理，可以使用babel来完成

### 配置文件

可以有很多不同的后缀名写法

- `babel.config.*`：新建文件，处于项目根目录

  - `babel.config.js`

  - `babel.config.json`

- `.babelrc.*`：新建文件，位于项目根目录

  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`
  - `package.json`中`babel`：不需要创建配置文件

  babel会自动查找读取配置文件，使用其中的规则

#### 具体配置

babel.config.js配置预设presets

presets简单理解就是一组babel插件，拓展babel的功能

- `@babel/preset-env`: 一个智能预设，允许您使用最新的javaScript
- `@babel/preset-react`: 一个用来编译react jsx语法的预设
- `@babel/preset-typescript`: 一个用来编译typescript语法的预设

```js
module.exports = {
  presets: ["@babel/preset-env"]
}
```

### 安装

```sh
npm i -D babel-loader @babel/core @babel/preset-env 
```

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

## html-webpack-plugin

动态处理html文件，使用html-webpack-plugin插件，可以自动引入打包后的js文件，设置html模板等

```sh
npm i -D html-webpack-plugin
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  ...
   // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 模板，以public/index.html文件创建新的html文件
      // 新的html文件特点，1.基于指定的html模板，2.自动引入打包输出的资源
      template: path.resolve(__dirname, "public/index.html")
    })
  ]
}
```

## webpack-dev-server

代码发生变化后自动打包

```sh
npm i webpack-dev-server -D
```

参数

```json
 "scripts": {
    "dev": "webpack-dev-server --inline --progress --open --config build/webpack.dev.conf.js",
    ......
  }
```

```sh
# 监听文件的变化，然后将编译后的文件推送到前端，完成页面的reload
-- inline
# 显示打包进程
--progress
# 使用浏览器打开
--open 
# 指定配置文件
--config 
```

或者直接在webpack.config.js配置

```js
module.exports = {
  ...
  // 开发服务器不会输出资源，而是在内存中编译运行
  devServer: {
    host: "localhost", // 服务器域名
    port: "3000", // 服务器端口
    open: true // 是否启动打开浏览器
  }
}
```

```sh
npx webpack serve
```


## 自动压缩文件

```bash
npm i -D filemanager-webpack-plugin
```

vue.config.js

```js
const FileManagerPlugin = require("filemanager-webpack-plugin") // 自动压缩文件 
module.exports = {
    ...
configureWebpack: {
    plugins: [
      // 压缩生成zip文件
      new FileManagerPlugin({
        events: {
          onEnd: {
            delete: ["./云中驿站"],
            archive: [{ source: "./云中驿站", destination: "./云中驿站.zip" }]
          }
        }
      })
    ]
  }
}
```

## 压缩图片

使用npm下载会出现下载失败的情况，所以选择使用cnpm下载

```bash
npm i -g cnpm
cnpm i -D image-webpack-loader
```

```js
module.exports = {
    ...
chainWebpack: config => {
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false }
      })
  }
}
```

## [HMR] Waiting for update signal from WDS

vue-cli项目运行后控制台出现这个语句，翻译下：来自 WDS 的提示，正在等待更新

说明：

[HMR] 是什么：

它是 Hot Module Replacement 的简写。翻译过来：模块热更新。所以HDR开头的信息提示由webpack/hot/dev-server模块产生

[WDS] 是什么：

它是 Webpack dev Server 的简写。翻译过来：webpack的开发环境服务器（本地服务器）。所以WDS开头的信息提示由 webpack-dev-server本地服务器产生

如何注释：

按照路径node_modules -> webpack -> hot -> log.js注释控制台打印语句

```js
module.exports = function(level, msg){    
    // if (shouldLog(level)) {        
    // if (level === "info") {           
    // console.log(msg);       
    //   } else if (level === "warning") {            
    // console.warn(msg);        
    //   } else if (level === "error") {            
    // console.error(msg);        
    //   }    
    // }}
```

此时控制台完全干净了



