Node.js采用的是CommonJs规范，在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。
在编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用。

> Node.js中模块的分类：
* 核心模块（已经封装好的内置模块）；
* 自己定义的模块；
* 第三方的模块（npm下载下来的）； 

1. require

`require`函数用来在一个模块中引入另外一个模块。传入一个模块名，返回一个模块导出对象。用法：` let cc = require("模块名")` ，其中模块名可以用绝对路径也可以用相对路径,模块的后缀名.js可以省略。例如：
```
let cc1 = require('./main.js')
let cc2 = require('home/src/main.js')
let cc3 = require('./main')
```
require()函数用两个作用：

* 执行导入的模块中的代码；
* 返回导入模块中的接口对象； 

2. exports

`exports`对象用来导出当前模块的公共方法或属性，别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。用法：`exports.name`,name为导出的对象名。例子：
```
exports.add = function () {
  let i = 0
  console.log(++i)
}

导出一个add方法供其他模块使用
```
> 其实exports类似于ES6中的export的用法，用来导出一个指定名字的对象。

3. module.exports

`module.exports`用来导出一个默认对象，没有指定对象名，常见于修改模块的原始导出对象。比如原本模块导出的是一个对象，我们可以通过module.exports修改为导出一个函数。如下：
```
module.exports = function () {
  console.log('hello world！')
}
```
4. 模块的初始化

一个模块中的JS代码仅在模块**第一次被使用时**执行一次，并且在使用的过程中进行*初始化*，之后缓存起来便于后续继续使用。

5. 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，main.js就是主模块。
```
$ node main.js // 运行main.js启动程序，main.js称为主模块
```
完整实例：

在项目中我们有个`hello.js`文件，里面定义了一个求和的函数
```
var a = 1;

function add () {
  return ++a;
}

exports.add = add
```
我们在项目的主模块 `main.js`中引入`hello.js`
```
var add1 = require('./hello')
var add2 = require('./hello')

console.log(add1.add())
console.log(add2.add())
```
该程序运行的结果如下：

```
$ node main.js
2
3
```
我们可以看到`hello.js`并没有别引入两次而初始化两次，说明模块只会在执行的过程中被初始化一次。


