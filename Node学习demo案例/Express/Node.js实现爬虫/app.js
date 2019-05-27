const express = require('express')
// 引入superagent
const superagent = require('superagent')
// 引入cheerio
const cheerio = require('cheerio')
// 定义一个数组用来保存爬虫得到的结果
let result = []
// 创建服务器实例app
const app = express()
// 开发公共资源
app.use('/public', express.static('./public'))
// 配置模板引擎
app.engine('html', require('express-art-template'))

// 利用superagent发送请求，获取爬虫所需数据
superagent.get('https://news.baidu.com/').end((err, res) => {
  if (err) {
    return console.log(err)
  }
  // 成功，则爬虫得到的数据保存在res.text属性中
  const HtmlStr = res.text
  // 利用cheerio解析html字符串，生成 DOM 结构
  const $ = cheerio.load(HtmlStr)
  // 利用jQuery语法获取到爬虫内容对应的具体DOM元素
  $('.hotnews ul li a').each((index, Element) => {
    // 遍历保存每一项的信息
    let obj = {
      title: $(Element).text(),
      href: $(Element).attr('href')
    }
    result.push(obj)
  })
})

// 监听路由

app.get('/', (req, res) => {
  res.render('index.html', {
    result: result
  })
})
// 绑定端口启动服务
app.listen(3000, () => {
  console.log('running...')
})