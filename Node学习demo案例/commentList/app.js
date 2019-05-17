// 创建HTTP服务器
let http = require('http')
let fs = require('fs')
let url = require('url')
let template = require('art-template')
let comments = [
  {
    name: 'jack',
    content: 'hello world',
    time: '2019-5-1'
  },
  {
    name: 'Tom',
    content: 'hello world',
    time: '2019-5-1'
  },
  {
    name: 'dream',
    content: 'hello world',
    time: '2019-5-1'
  },
  {
    name: 'james',
    content: 'hello world',
    time: '2019-5-1'
  },
  {
    name: 'jack',
    content: 'hello world',
    time: '2019-5-1'
  },
  {
    name: 'life',
    content: 'hello world',
    time: '2019-5-3'
  }
]
http.createServer((req, res) => {
  let obj = url.parse(req.url, true) // 得到url模板解析后的Url对象，传入第二个参数“true”，将form表单提交的查询字符串query转换成对象
  let pathname = obj.pathname
  let query = obj.query
  if (pathname === '/') {
    fs.readFile('./public/views/index.html', (err, data) => {
      if (err) {
        return res.end('404 NOT FOUND')
      }
      let htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr)
    })
  } else if (pathname.indexOf('/public/') === 0){
    fs.readFile('.'+pathname, (err, data) => {
      if (err) {
        return res.end('404 NOT FOUND')
      }
      res.end(data)
    })
  } else if (pathname ==='/post') {
    fs.readFile('./public/views/post.html', (err, data) => {
      if (err) {
        return res.end('404 NOT FOUND')
      }
      res.end(data)
    })
  } else if (pathname === '/comment') {
    res.statusCode = 302      // 设置响应状态码为302(重定向)
    res.setHeader('location', '/') // 设置响应头location，告诉浏览器重定向地址
    if (query.name) {
      query.time = '2015-5-10'
      comments.unshift(query)
    } // 放置用户手动输入'/comment'，导致query为空
    res.end()  // 结束响应，不能少
  }
  
  else {
    fs.readFile('./public/views/404.html', (err, data) => {
      if (err) {
        return res.end('404 NOT FOUND')
      }
      res.end(data)
    })
  }  
}).listen(3000, () => {
  console.log('running...')
})