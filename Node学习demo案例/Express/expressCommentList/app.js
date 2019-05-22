const express = require('express')
// 引入body-parser
const bodyParser = require('body-parser')
const app = express()
// 开放静态资源
app.use('/public/', express.static('./public'))
// 配置express-art-template模板引擎
app.engine('html', require('express-art-template'))
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
// 先造一些假数据，供模板引擎渲染
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
app.get('/', (req, res) => {
  res.render('index.html', {
    comments: comments
  })
})
app.get('/post', (req, res) => {
  res.render('post.html')
})
app.post('/comment', (req, res) => {
  // 得到post请求发送的数据
  const comment = req.body
  comment.time = '2019-5-21'
  comments.unshift(comment)
  // 重定向到首页（‘/’）
  res.redirect('/')
})
app.listen(3000, () => {
  console.log('running...')
})