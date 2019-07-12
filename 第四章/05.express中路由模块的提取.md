## 起步

`路由`这个词对于我们来说并不陌生，`前端路由`和`后端路由`不是一回事，我们这里主要来说说后端路由。

**分清楚两个概念**

> 后端路由：对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；

> 前端路由：前端路由主要借助`hash（#）`来实现，对于单页面应用程序来说，主要通过URL中的hash(#号)来实现不同页面之间的切换，这就称之为前端路由。

通过前面的学习我们可以利用`express`来判断不同的请求路径，响应不同的资源给到客户端，但是一旦我们要处理的请求路径比较多，如果都写在一个页面会使得代码冗杂，难于维护，例如：

```javascript
。。。。 // 引入express，得到服务器实例app

app.get('/', (req, res) => {
  ....
})
app.get('/post', (req, res) => {
  ....
})
app.get('/login', (req, res) => {
  ....
})
app.get('/edit', (req, res) => {
  ....
})
... // 后面省略更多的请求路径配置
```

这就很明显的看到一旦我们要处理的请求路径比较多时，这时候就必须把这些路径配置代码放到单一的文件中进行管理，我们把这个单一文件称之为`路由模块`，在express中进行路由模板的提取也是我们必须掌握的技能。

## 实现方法

1. 在入口模块`app.js`的同级目录下创建路由模块`router.js`，把之前`app.js`中路由设计都放到`router.js`文件中。

`app.js`文件代码：

```javascript
var express = require('express')
var app = express()
app.listen(3000, () => {
  console.log('running...')
})
```

`router.js`文件中代码:

```javascript
app.get('/', (req, res) => {
  ....
})
app.get('/post', (req, res) => {
  ....
})
app.get('/login', (req, res) => {
  ....
})
app.get('/edit', (req, res) => {
  ....
})
```

2. `router.js`文件中引入`express`，通过`express`内置API，得到`router`路由容器，然后把每个路由都挂载到`router`路由容器中，最后通过`module.exports`导出`router`。

`router.js`文件添加如下代码；

```javascript
let express = require('express')
let router = express.Router()
... // 每个路由配置代码
module.exports = router
```

3. `app.js`文件中引入`router.js`文件，并且通过`app.use(router)`，把`router`路由容器配置到`app`服务中。

`app.js`文件添加以下代码：

```javascript
let router = require('./router')
app.use(router) // 把路由容器挂载到app上
```

4. `Node`启动入口模块`app.js`，项目运行成功。

![node演示](../node学习图片资源/50.gif)

通过学习把路由设计提取到单一模块中，使得我们每个模块的职能变得单一和清晰化，便于我们提高开发效率和后期代码维护。

*如果需要整个demo的源码，可以在`Node学习demo案例`文件夹下查找。*