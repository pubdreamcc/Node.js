我们在开发的过程中，每次改完代码之后都必须重启服务器，显然这样的操作效率是比较低，这里给大家推荐个工具，`nodemon`,`nodemon`可以帮我们实时监听项目中代码的变化，并且自动重启服务，而且配置简单。

1. 安装：`npm install -g nodemon`

2. 使用`nodemon`运行项目，取代之前的`node app.js`。

`nodemon  [your app.js]`

项目运行之后，`nodemon`会自动监听代码的改动，并且重新启动服务，大大增加我们开发效率。

3. `nodemon`常见配置

* 在命令行指定应用的端口号：`nodemon ./server.js localhost 8080`

* 查看帮助，帮助里面有很多选项都是一目了然：`nodemon -h 或者 nodemon --help`

* 运行 debug 模式：`nodemon --debug ./server.js 80`

* 手动重启项目： `Nodemon` 命令运行的终端 窗口中输入 `rs` 两个字符，然后再按下回车键，就能手动重启 `Nodemon`了。