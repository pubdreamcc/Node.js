const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// 配置模板引擎，利用模板引擎来渲染模板文件
app.engine('html', require('express-art-template'))
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res)=>{
  res.render('index.html')
})
app.post('/post', (req, res)=>{
  // 得到post请求的数据
  const result = req.body
  console.log(result.username)
  res.send(result)
})
app.listen(3000, ()=>{
  console.log('running...')
})