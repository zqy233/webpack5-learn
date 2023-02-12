# 前言

> 本博客是个人学习 webpack5，收集整理相关学习资料整合而成
>
> 内容来自但不限于以下文章
>
> - 官网https://webpack.docschina.org/concepts/
> - 尚硅谷http://xxpromise.gitee.io/webpack5-docs/
> - 掘金https://juejin.cn/post/7034810358795599880#comment
> - 掘金https://juejin.cn/post/7029609093539037197#comment

## 前端为什么需要打包工具

开发前端项目时，会使用如`react`，`vue`等框架，会使用`es6`与模块化语法，会使用`less`和`sass`等 css 预处理器等语法进行开发，这样的代码要想在浏览器运行，需要编译成浏览器能识别的`js`、`css`语法

所以可以使用打包工具来帮我们做这些事，除此之外，打包工具还能压缩代码，做兼容性处理，提升代码性能等等

### 有哪些打包工具

- webpack
- rollup
- vite
- parcel
- grunt
- gulp
- ...

目前前端使用量最高的打包工具还是`webpack`，所以是前端开发者应该学习与掌握的

## 什么是 webpack

`webpack`是一个静态资源打包工具，它会以一个或多个文件作为打包的入口。将整个项目的所有文件编译组合成一个或多个文件输出出去。输出的文件就是编译好的文件，就可以在浏览器端运行了

`webpack`输出的文件叫做`bundle`

`webpack`本身功能是有限的

- 开发模式：仅能编译 js 中的`ES Module`语法
- 生产模式：能编译 js 中的`ES Module`语法，还能压缩 js 代码

## 入门示例

定义一个 main.js

```js
import { name } from './name.js'
console.log(name)
```

定义一个 name.js

```js
export const name = 'Jack'
```

新建一个 html，引入 main.js

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./main.js"></script>
  </body>
</html>
```

运行 html 到浏览器，会提示

```js
Uncaught SyntaxError: Cannot use import statement outside a module
```

浏览器会报错，是因为浏览器对 ES6 模块引入语法不支持而报错，所以需要使用 webpack 来打包代码为浏览器能识别的语法

### 如何使用 webpack

webpack 是运行在 node 环境中的，需要安装以下两个 npm 包：

`webpack`是 webpack 核心包，`webpack-cli`是命令行工具包

```sh
npm i -D webpack webpack-cli
```

使用 webpack 打包`main.js`为`dist/main.js`(`dist`为压缩文件夹名)，`--mode`代表模式，`development`开发模式，`production`生产模式，`-o`代表输出到指定文件夹下

```js
npx webpack ./main.js --mode=development -o dist
```

index.html 引入打包后的 main.js 文件，浏览器中可以正常输出`Jack`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="../dist/main.js"></script>
  </body>
</html>
```

 
 <git-talk/> 
 