## 前言

在Node.js中赋予了JavaScript很多服务器级别的API，Node中认为每个js文件都是一个模块，模块之间可以相互引用。

## 核心模块

Node.js中核心模块指的是Node.js官方封装好的js模块，这些模块都有特定的名称标识，我们可以直接拿来使用。

常见的核心模块： `path`，`os`，`http`，`fs`等等。具体可以参考Node的官方文档API，点这里：<a href="https://nodejs.org/dist/latest-v10.x/docs/api/">Node官方文档API</a>。

## 理解

Node中核心模块往往在接口对象中挂载了很多特定功能的函数，便于加载它的其他模块使用。我们需要使用核心模块提供的函数，必须先引人：
```javascript
let fs = require('fs')
// 第一个fs是变量名，接收核心模块提供的接口对象。 第二个fs是Node的核心模块
```

以后凡是我们需要用到Node中提供的核心模块，必须先引入，方式同上。