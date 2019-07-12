## 前言

hello，小伙伴们，通过上一节的学习，我们已经可以通过mongoose连接上mongoDB数据库了，这一节就说下具体的增删改查操作。

## 增加数据

实例化一个模型构造函数就得到一个具体文档。

```javascript
const user = new User({
  // 传入具体的数据信息，必须和之前的Schema 配置的结构一致
  name: 'pubdreamcc',
  password: '123456',
  email: '333@pubdreamcc.com' // 可有可无
})

// 通过save()方法持久化存储数据

user.save((err, ret) => {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(ret) // ret 就是刚新增加的文档
  }
})
```

ok， 通过上面两步我们就已经保存了一条数据到数据库中了，就是怎么简单。

## 查询数据

查询数据这里有好几个 API ， 可以看下 mongoose 的官网：
*  find() 
*  findById()
* findOne()

具体的用法和之前在控制台 操作mongoDB 数据类似，不清楚的同学可以查看本章第一节知识点： [mongoDB数据库的使用](https://github.com/pubdreamcc/Node.js/blob/master/%E7%AC%AC%E4%BA%94%E7%AB%A0/mongoDB%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8.md)

这里选取一个findOne代表

```javascript
User.findOne({name: 'pubdreamcc'}, (err, ret) => {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret) // ret 即为查询出来的那一条文档
  }
})
```

`findOne()` 会查找匹配的第一个文档出来，通常传入一个查找条件（对象），这里是从数据库查找 `name`  为 `pubdreamcc`  的文档出来。

## 删除数据

删除数据同样也有好几个方法，这里参照官网 api ：
* remove()
* findOneAndRemove()
* findByIdAndRemove()

用法其实和更新数据，包括前面说到的查找数据类似，`remove()` 会删除所有匹配的全部文档，`findOneAndRemove()` 会删除匹配的第一个文档，`findByIdAndRemove()` 通过唯一的id值删除某一个文档。

这里选取`findByIdAndRemove()` 来说明，其他的小伙伴可以去 `mongoose` 官网 `api` 查询，我就不再反复说了，用法很简单，大家看一下都懂的。

> mongoose 官网 api： [api document](http://mongoosejs.net/docs/api.html#Model)

```javascript
User.findByIdAndRemove('id值', (err, ret) => {
  if (err) {
    console.log('删除失败')
  } else {
    console.log('删除成功')
    console.log(ret) // ret 即为删除信息反馈对象，包括成功删了几条数据等
  }
})
```

## 更新数据

更新数据也有几个 api 可以供我们使用，我就罗列下，然后也是选取一个加以说明，其他的小伙伴们可以去官网查看 api 即可。

* findByIdAndUpdate()
* update()
* findOneAndUpdate()

这里选取 `update()` 来演示下：

```javascript
User.update({name: 'pubdreamcc'}, {email: '111@pubdreamcc.com'}, (err, ret) => {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成功')
  }
})
```

`update()` 方法会把所有满足条件的数据都更新，上面我们已经把 `name` 为： `pubdreamcc` 的所有文档的`email` 都修改为 `111@pubdreamcc.com` 。

## 提示

如果需要演示的所有源代码可以去 `Node学习demo案例` 文件夹下查找。