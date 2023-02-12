# 指南

> [查看简洁版指南文档](https://zqy233.github.io/webpack5-vue3-practise/#/)
>
> 简洁版指南文档只介绍项目架构、使用的依赖与其作用，具体 webpack 配置则需要查看源码

## 起步-搭建项目

打开文件夹，初始化 package.json

```sh
npm init -y
```

下载 webpack 相关依赖

```sh
npm i webpack webpack-cli webpack-merge -D
```

| 依赖包        | 作用                                            |
| ------------- | ----------------------------------------------- |
| webpack       | 核心库                                          |
| webpack-cli   | 命令行中调用 webpack                            |
| webpack-merge | 合并 webpack 配置文件，用于开发生产使用不同配置 |

新建`build`文件夹

文件夹下创建`webpack.common.js`、`webpack.dev.js`、`webpack.prod.js`三个文件

## webpack.common.js

```js
const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = env => {
  return {
    entry: "./src/main.js", // 入口文件
    // stats: "errors-only", // 仅错误时显示logo
    output: {
      filename: "assets/js/[name].js",
      chunkFilename: "assets/js/[name].bundle.js", // 动态导入 分离bundle 比如lodashjs配合注释import(/* webpackChunkName: "lodash" */ 'lodash') 会打包成lodash.bundle.js
      path: path.resolve(__dirname, "../dist"),
      // 清空dist文件夹
      clean: true
    },
    plugins: [
      new VueLoaderPlugin(),
      // vue3 浏览器控制台会输出warning，提示：ReferenceError: __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ is not defined
      // __VUE_OPTIONS_API__表示是否支持 options api 的写法，默认是 true，如果只用composition写法，可以设置为false来优化打包
      // __VUE_PROD_DEVTOOLS__：表示生产包是否要继续支持 devtools 插件，默认是 false
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public/index.html")
        // title: "webpack5+vue3",
        // filename: "index.html" //输出的文件名
      })
    ],
    resolve: {
      //配置模块如会解析
      extensions: [".vue", ".js", ".json"], //引入这些文件 可以不带后缀 按顺序解析
      alias: {
        "@": path.join("../src"), //@方式引入资源
        // 解决警告:vue-i18n.esm-bundler.js:39 You are running the esm-bundler build of vue-i18n
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }, // 它会应用到普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 6 * 1024 //小于6kb的图片内联处理
            }
          }
        },
        // 将HTML文件转换为为字符串，生产模式下，会压缩字符串
        {
          test: /\.html$/i,
          loader: "html-loader"
        }
      ]
    }
  }
}
```



## html 与开发服务器

```sh
npm i webpack-dev-serve html-webpack-plugin -D
```

`webpack-dev-server` 提供一个本地 server 服务器

`html-webpack-plugin` 指定使用的 html 模板

### 创建 public/html 文件

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script src="./config.js"></script>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without
        JavaScript enabled. Please enable it to continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

## vue 相关依赖

```sh
npm i -s vue@next vue-loader@next @vue/compiler-sfc
```

> 模仿 vue 脚手架创建模板

### 创建 src/main.js

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### src/App.vue

```vue
<template>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
}
</script>
```

### src/components/HelloWorld.vue

```vue
<template>
  {{ num }}
  <button @click="add">点击增加</button>
</template>

<script setup>
import { ref } from 'vue'
const num = ref(0)
const add = () => {
  num.value++
}
</script>
<style lang="scss" scoped>
button {
  border: none;
  background-color: skyblue;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
}
</style>
```

## babel

```sh
npm i -D babel-loader @babel/core @babel/preset-env
```

## 处理 css/sass/less

```sh
npm i -D style-loader css-loader sass-loader less-loader sass less
```

## 复制静态文件

复制不参与打包的静态文件至打包后的文件夹中

```sh
npm i -D copy-webpack-plugin
```

## 控制台显示信息

原始版本的`friendly-errors-webpack-plugin`已经长时间不更新了，webpack5 中虽然能正常使用，但是使用 npm 下载依赖时会报错（yarn 中不会报错），报错提示 webpack 版本不兼容，所以使用 fork 版本的`friendly-errors-webpack-plugin`

```sh
npm i -D @soda/friendly-errors-webpack-plugin
```

## 实时打包

webpack-dev-server 通过内存打包，启动开发服务器，不会生成打包文件

可以使用 webpack 内置的--watch 参数监听文件，动态打包

```json
 "scripts": {
    "dev": "webpack-dev-server --progress --config build/webpack.dev.js",
    "build": "webpack --watch --progress --config build/webpack.prod.js"
  },
```

## 公共 chunk 抽取

### CommonsChunkPlugin

在 webpack 4 之前，使用 `CommonsChunkPlugin` 进行公共 chunk 抽取

```js
module.exports = {
  entry: './src/index.js',
  entry: {
    main: './src/index.js',
    vendor: ['lodash'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

这里有两点值得注意：

- `entry` 中的 `vendor`：显式引用 `lodash`，由于 `index.js` 也导入了 `lodash`，因此它就变成了一个公共的模块
- 使用 `new webpack.optimize.CommonsChunkPlugin` 抽取这些公共模块

### SplitChunksPlugin

webpack 4 之后 `CommonsChunkPlugin` 被弃用了，使用 `SplitChunksPlugin` 代替。 `SplitChunksPlugin` 是开箱即用的，只需要在 `module.exports` 中进行配置：

## 分割内容

代码分割的关键点在于控制**分割粒度**：

- 分割文件多少
- 文件大小

如果在不考虑大小的情况下，最后会打包出包含所有代码的单个文件。我们可以 `optimization.splitChunks.maxSize` 来控制 chunk 的大小以达到分割成多文件的目的。

只通过大小来控制代码分割拥有如下弊端：

- 入口文件大小未得到最大的优化

- 不能使用缓存，在项目中，有些引入的工具的更新频率是非常低的，这时候能大幅提高响应时间

- 表现和结构未进行分离。

  浏览器进行渲染的时候，表现和结构是基于不同的算法进行解析的。并且，样式代码也会增加请求的响应时间

## 处理第三方库的策略

在项目中，常常会引入一些第三方的框架或者库等，比如 `vue`，`element-ui`。这些第三方库的代码在项目中很少或者基本不会变动，因此建议将这些代码提取到一个单独的文件中

这样做有几个好处：

- 可以进行缓存
- 优化入口文件大小
- 进行关注点分离

## 使用 i18n

```sh
npm i vue-i18n@next
```

### main.js 使用

```js
import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    message: {
      hello: '你好世界',
    },
  },
  en: {
    message: {
      hello: 'hello world',
    },
  },
}
const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages,
})
const app = createApp(App)
app.use(i18n)
app.mount('#app')
```

### vue 中使用

```vue
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
console.log('i18n', t('message.hello'))
</script>

<template>
  {{ $t('message.hello') }}
  <select v-model="$i18n.locale">
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>
```

### 解决控制台警告

解决控制台警告 vue-i18n.esm-bundler.js:39 You are running the esm-bundler build of vue-i18n

```js
 alias: {
        "@": join("../src"), // @方式引入资源
        // 添加下方代码
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
```

## 鸣谢

本项目深受以下文章的影响

- https://juejin.cn/post/7034810358795599880#comment
- https://juejin.cn/post/7029609093539037197#comment
- [vite 解决警告:vue-i18n.esm-bundler.js:39 You are running the esm-bundler build of vue-i18n. It is recomme_BY_BC 的博客-CSDN 博客](https://blog.csdn.net/BY_BC/article/details/125387921)
