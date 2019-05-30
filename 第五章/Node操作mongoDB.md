上一节我们已经学习了 `mongoDB` 的基本使用，这节我来了解下node中怎么操作 `mongoDB `。

方法一：

* 使用 `mongoDB` 官方提供的 `node mongodb driver ` 包 `mongoDB` ，这种方法是官方提供的，感兴趣的同学可以去 npm 官网查找文档，这里推荐下面一种方法。

> [`mongoDB` npm 文档](https://www.npmjs.com/package/mongodb)

方法二：

* 使用 `mongoose `

`Mongoose` 是在 `node.js` 环境下对 `mongodb` 进行便捷操作的对象模型工具。

官方 [api 文档](http://www.nodeclass.com/api/mongoose.html)

下面说明下 `mongoose` 的具体用法。

1. 安装 `mongoose`
```shell
npm install mongoose
```
安装完成后，打开mongodb。命令行敲入：`mongod`，即可打开 mongodb

2. 利用mongoose连接mongodb

新建一个js文件，引入mongoose，这里可以参照官网 写的一个 `hello world` 。

```javascript
const mongoose = require('mongoose')
//
mongoose.connect('mongodb://数据库地址(包括端口号)/数据库名称', (err, ))