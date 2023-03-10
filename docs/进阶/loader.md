# loader

> 帮助 webpakck 将不同类型的文件转换为 webpack 可识别的模块

## loader 执行顺序

### 分类

- pre 前置
- normal 普通
- inline 内联
- post 后置

### 执行顺序

`pre`>`normal`>`inline`>`post`

相同优先级的 loader 执行顺序为`从右到左，从下到上`

```js
// 执行顺序 loader3 - loader2 - loader1
modele: {
  rules: [
    {
      test: /\.js$/,
      loader: 'loader1',
    },
    {
      test: /\.js$/,
      loader: 'loader2',
    },
    {
      test: /\.js$/,
      loader: 'loader3',
    },
  ]
}
```

```js
// 执行顺序 loader1 - loader2 - loader3
modele: {
  rules: [
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'loader1',
    },
    {
      // 没有enforce就是normal
      test: /\.js$/,
      loader: 'loader2',
    },
    {
      enforce: 'post',
      test: /\.js$/,
      loader: 'loader3',
    },
  ]
}
```

### 使用 loader

- 配置方式：在`webpack.config.js`文件中指定 loader(pre、normrl、post)
- 内联方式：早每个 import 语句中显式指定 loader(inline)

### lnline loader

## 开发一个 loader
