const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('您好，中国')
})
app.get('/login', (req, res) => {
  res.send('<h1>登录</h1>')
})
app.get('/register', (req, res) => {
  res.send('<h1>注册</h1>')
})
app.listen('3000', () => {
  console.log('running...')
})