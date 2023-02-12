# 安装typescript

```bash
npm i -D typescript ts-loader
```

根目录添加tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  },
  "include": [
    "./src/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

webpack.config.js中使用loader

```js
module.exports = {
 ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
}
```


 
 <git-talk/> 
 