这节主要讨论两个问题：

* 非阻塞I/O是什么？
* Node中事件驱动怎么理解？

1. 非阻塞I/O（异步I/O）

众所周知，Node.js 是以单线程的模式运行，Node.js 不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了， 就触发一个内部事件，通过非阻塞 I/O、事件驱动机制，让 Node.js 程序宏观上也是并行的。使用 Node.js，一个 8GB 内存的服务器，可以同时处理超过 4 万用户的连接。先来看一个例子，有如下代码：

```javascript
var fs = require('fs')
console.log(1)
fs.readFile('./index.html', (err, data) => {
  if (err) {
    return 
  }
  console.log(2)
})
console.log(3)
```

程序运行之后，我们看到控制台依次输出：

```javascript
// 1

// 3

// 2
```

 在上面代码中，由于 `fs.readFile` 是`Node`的异步函数。所以，程序先执行了 1 和 3，最后才执行 `fs.readFile` 的 2 部分。

> 这就说明Node不会去等一段异步代码执行后的结果再去执行下面的代码，也就是说不会因为一段代码的逻辑错误，从而导致其他代码无法运行。这就是**Node非阻塞I/O模型**。

2. 事件驱动
   
   1. `Node.js`使用事件驱动模型，当`server`收到请求，就关闭请求然后处理，接着处理下一个`web`请求。

   2. 当一个请求完成，它会返回处理队列，直到队列开头，会被返回给用户。

   3. 因为`server`一直接受请求而不等待任何读写操作，该模型非常高效，拓展性强。

   4. 会有一个主循环来监听事件，当检测到事件时触发回调函数。

![node演示](../node学习图片资源/51.jpg)

接着看上面的代码，我们会遇到一个问题：步骤 3 可能拿不到步骤 2 的执行结果了，也就是说拿不到`fs.readFile()`异步回调后的结果。对于这个，我们该如何解决呢，可以有以下两种方法。

* 通过回调函数

* 通过 Node 的 `events` 模块

通过回调函数：

```javascript
var fs = require('fs')
console.log(1)
var getText = (callback) => {
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      return 
    }
    // console.log(2)
    callback(data)
  })
}
getText((text) => {
  console.log(text.toString())
})
console.log(3)
```

通过回调我们可以拿到异步操作之后的结果。

然后，我们通过 Node 的 `events `模块来解决这个异步问题：

```javascript
// 引入 fs 模块
var fs = require("fs")
// 引入 events 模块， Node 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件。
var events = require("events")

// 实例化事件对象
var EventEmitter = new events.EventEmitter()

var getText = () => {
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      return 
    }
    // console.log(2)
    // 将 data 广播出去
    EventEmitter.emit('data', data.toString())
  })
}
getText()

// 监听data
EventEmitter.on('data', (text) => {
  console.log(text)
})
```

在这里，`EventEmitter.on `通过监听 `data` 的形式，获取了 `getText` 内部的异步操作执行的结果。

如此，我们就了解了Node中非阻塞I/O和事件驱动模型了。