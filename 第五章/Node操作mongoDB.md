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
// 连接数据库
mongoose.connect('mongodb://数据库地址(包括端口号)/数据库名称', (err, ret) => {
  if (err) {
    console.log('连接失败')
  } else {
    console.log('连接成功')
  }
})
```

这样，我们就可以连接上数据库了，注意：如果没有指定数据库名称，则默认连接 `test` 数据库。

3. 创建 `Schema` ，设计文档结构

 `Schema` 到底是个什么东西呢，我们在往数据库插入数据之前是不是应该得稍微设计下文档的结构，也就是关系数据库中表的结构啥的，因为有一定的设计才使得数据的完整性，不会产生脏数据，Schema就是用来干这个事情的，我们看下官方的介绍

`Schema` 主要用于定义 `MongoDB` 中集合 `Collection` 里文档 `document` 的结构。`mongoose` 对表结构的定义，每个 `Schema` 会映射到mongodb中的一个 `collection`，`Schema` 不具备操作数据库的能力。

定义`Schema`非常简单，指定字段名和类型即可，支持的类型包括以下8种：

```
String      字符串
Number      数字    
Date        日期
Buffer      二进制
Boolean     布尔值
Mixed       混合类型
ObjectId    对象ID    
Array       数组
```

通过`mongoose.Schema`来调用Schema，然后使用new方法来创建schema

```javascript
// 引入Schema
const Schema = mongoose.Schema
// 通过 new 创建一个Schema
const userSchema = new Schema({
  // 这里来设计文档的结构，后面插入集合的每一个文档必须是以下指定的结构
  name: {
    type: String,
    required: true //  规定 name 是必须有的字段
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})
```

通过以上的实例，我们就创建了一个 `userSchema` 的架构，规定了每个文档中必须有 `name`， `password` 字段，且类型为 `String`，`email` 字段类型为 `String`，有或没有都可以。

4. 把 `Schema` 发布为 `model` （模型）

简单说就是`model`是由 `Schema` 生成的模型，可以对数据库的操作。model的每一个实例（instance）就是一个文档。

把 Schema 发布为模型只需调用mongoose的 `mongoose.model()` 方法即可，`mongoose.model()` 接收两个参数，第一个参数表示模型的名称，第二个参数是 Schema，返回值为模型构造函数。这里一定得把第一个参数设置成和 `mongoose.model()` 的返回值相同，否则会出错。最后得到的集合名称就为模型名称的小写形式，如果模型名称最后一个字符是字母，则变成复数形式，如果最后一个是数字，则不变，比如：模型名称：`User`，得到的集合名称为： `users`，模型名称为：`User1`， 得到的集合名称为；`user1`。

```javascript
// 把Schema 发布为模型
const User = mongoose.model('User', userSchema)
```

5. 通过模型构造函数，可以对数据库进行一系列增删改查的操作。

好了，我们经过以上的步骤，最后就可以通过 `User` 模型构造函数操作数据库了。到这里，我们已经完成了node中操作mongoDB的前期步骤了，下一节会具体讲解增删改查等操作。
