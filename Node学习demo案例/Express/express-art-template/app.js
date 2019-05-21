let express = require('express')
let app = express()
app.engine('html', require('express-art-template'))
app.get('/', (req, res)=> {
  // 使用模板引擎来解析渲染模板字符串
  res.render('login.html', {
    title: '这里是登陆页'
  })
})
app.listen(3000, () => {
  console.log('running...')
})