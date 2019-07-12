## 前言

hello，小伙伴们，我是你们的`pubdreamcc`，本篇博文出至于我的GitHub仓库`node学习教程资料`，欢迎小伙伴们点赞和`star`，你们的点赞是我持续更新的动力。

> GitHub仓库地址：[node学习教程](https://github.com/pubdreamcc/Node.js)

> 本篇文章对应的源码：[Student-Management-System](https://github.com/pubdreamcc/Student-Management-System)

好了，废话不多说了，今天继续我们`express`的学习~

## Student-Management-System

今天我们实现一个案例，用express实现基本的C-R-U-D（增删改查）学生信息管理系统。学习这个案例一方面让我们熟悉业务开发的流程，一方面可以巩固之前学习的express知识。

## 文件说明

* app.js -- 入口模块

* router.js -- 路由模块

* student.js -- 操作数据模块（封装操作数据的基本API）

* Db.json -- 模拟数据库，保存数据的文件

* views文件夹 -- 页面视图文件

* public文件夹 -- 静态资源文件

## 启动

* `git clone` 克隆项目到本地

* `npm install` 进入项目文件夹，下载相关依赖

* `node app.js` node启动项目

## 主体设计

1. 创建`public`静态文件夹，`views`页面视图文件夹。

项目中前端页面使用了`bootstrap`快速搭建，所有需要开放bootstrap样式文件和页面相关的脚本文件。在`views`文件夹中存放主页面： `index.html`，编辑学生信息页面：`edit.html`，添加学生页面：`add.html`。

2. 创建数据文件`Db.json`，模拟数据库存放学生信息数据

因为我们没有涉及到数据库，所以暂时把学生数据存放在Db.json文件中，在数据文件中，我们需要一个数组：`students`，用来存放每一个学生的信息。通常数据文件都是一个json格式文件，所以严格按照json格式要求来模拟数据。

```javascript
{
  "students": [
    {
      "id": 1,
      "name": "牛魔王",
      "age": 18,
      "hobbies": "打人"
    }
    ...
  ]
}
```


3. 创建入口模块：app.js

在入口模块中启动服务器，配置`art-template`模板引擎，配置express中间件`body-parser`解析`post`请求提交的数据，最后把路由容器`router`挂载到app服务器实例上。因为node中解析代码是从上至下，所以路由容器挂载必须在各项配置之后，否则会出错。

```javascript
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const app = express()
// 开发静态资源
app.use('/public/', express.static('./public'))
app.use('/node_modules/', express.static('./node_modules'))
// 配置模板引擎
app.engine('html', require('express-art-template'))
// 配置body-parser，得到post请求体数据
app.use(bodyParser.urlencoded({ extended: false }))
// 注意：配置模板引擎和body-parser，开放静态资源必须放在路由容器挂载之前
// 挂载路由容器
app.use(router)
// 绑定端口号，开启服务
app.listen(3000, () => {
  console.log('running...')
})
```

4. 抽取路由模块`router.js`，专门处理每个路由

因为项目中需要处理多个路由，所以我们分离出一个路由模块，用来处理路由信息。模块的分离使得node中每个模块各司其职，职能单一，同时也便于后期代码维护。

`router.js`模块中每个路由都需要涉及到操作数据文件，所以我们在此之外需要封装一些数据操作的API。封装异步 API这里才是我们学习 Node 的精华部分：奥义之所在。

```javascript
// 路由模块
const express = require('express')
const Student = require('./student')
// 得到路由容器
const router = express.Router()
/*
  * 下面就是把每条路由都挂载到路由容器中
*/
// 请求'/'，显示全部学生信息
router.get('/', (req, res) => {
  // 调用Student.find()API，获取所有学生信息
  。。。
})

// 请求/add'，显示添加学生信息的界面
router.get('/add', (req, res) => {
  res.render('add.html')
})

// 表单post提交数据到'/add'，处理数据后重定向至'/'
router.post('/add', (req, res) => {
  /*
    *获取表单提交的数据
    *添加到数据文件中
    *重定向至首页，显示新提交的学生信息
  */
  。。。
})
// 请求'/edit'，展示编辑学生信息界面
router.get('/edit', (req, res) => {
  // 调用 Student.findById()API，通过id值获取学生信息渲染在页面上
  。。。
})

// 获取post请求提交的数据，更新学生信息，重定向到'/'
router.post('/edit', (req, res) => {
  /**
   * 获取新修改的post请求提交的学生信息
   * 处理数据文件，修改学生信息
   * 重定向到'/'
   */
})
// 当请求'/delete'，根据id值删除相应的学生信息，重定向到'/'
router.get('/delete', (req, res) => {
  // 调用 Student.deleteById()API，通过id值查找到对应学生，删除其信息
  。。。
})

module.exports = router
```

5. 封装数据操作的API，提取数据操作文件模块`student.js`

数据操作的模块，只负责操作数据（增加新数据，修改数据，删除数据等），不关心业务逻辑。

注意：我们在操作数据文件的时候，永远只能是：先读取出来原有的字符串数据，转换成对象，处理完成之后，再把对象转换成JSON格式字符串，最后再保存到数据文件中。**文件中永远存放的是字符串格式的数据**。

由于是这种操作顺序，所以student.js中频繁使用到node核心模块`fs`，反复调用`fs.readFile()`读取文件内容，`fs.writeFile()`修改文件中的数据。

```javascript
// 引入fs核心模块
const fs = require('fs')
// 保存学生信息
/**
 * 保存新添加的学生信息到数据文件中
 * 参数：
 * 1. 新加的学生信息对象
 * 2. callback回调函数，拿到异步操作的结果
 * callback中的参数：
 * 第一个参数err
 *   成功是null, 失败是错误对象
 *  第二个参数是结果
 *   成功是数组，失败是undefined
 */
exports.save = (student, callback) => {
  fs.readFile('./Db.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    // 得到所有学生信息
    let students = JSON.parse(data).students
    // 为新加的学生添加一个唯一的id属性（原来最大id属性值基础上加1）
    if (students.length === 0) {
      // 如果原始数据文件中没有学生信息
      student.id = 1
    } else {
      student.id = parseInt(students[students.length-1].id) + 1
    }
    students.push(student)
    // 把新增加学生信息后的对象转换成字符串保存到数据文件中
    let dataStr = JSON.stringify({
      students: students
    })
    fs.writeFile('./Db.json', dataStr, err => {
      if (err) {
        // 如果写入失败，则把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}
。。。
```

由于篇幅原因，这里只罗列了添加学生信息API的实现代码。这里还有一个非常重要的知识点：*怎样获取到一个函数内部异步操作的结果？* 
>只能是通过回调函数。

或许有一些其他的内置模块，包括封装的API也可以拿到异步操作的结果，但是其底层都是利用了回调函数的思想。比如常见的Node内置`events`事件模块等。

6. 视图文件编写

这里只需强调一点，在编写视图文件的时候，需要把一些动态的数据用模板语法包裹起来，能够使得模板引擎正确的渲染模板文件即可。

7. 启动服务后看结果（略）

## 后话

需要学习资料和案例源码的伙伴可以去GitHub上查看，如果您对这案例或者学习资料有更好的看法，欢迎issue，或者评论，谢谢。