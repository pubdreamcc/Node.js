const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')
const app = express()
let result = []
app.use('/public', express.static('./public'))
app.engine('html', require('express-art-template'))
let params = {
  operationName:"",
  query:"",
  variables: {
    first:20,
    after: "",
    order: "POPULAR"
  },
  extensions: {
    query: {
      id: "21207e9ddb1de777adeaca7a2fb38030"
    }
  }
}
function getInfo () {
  superagent.post('https://web-api.juejin.im/query').send(params).set('X-Agent', 'Juejin/Web').end((err, res) => {
    if (err) {
      return console.log(err)
    } 
    const array1 = JSON.parse(res.text).data.articleFeed.items.edges
    const num = JSON.parse(res.text).data.articleFeed.items.pageInfo.endCursor
    result = array1.filter(item => {
      return item.node.likeCount > 50
    })
    params.variables.after = num.toString()
    superagent.post('https://web-api.juejin.im/query').send(params).set('X-Agent', 'Juejin/Web').end((err, res) => {
      if (err) {
        return console.log(err)
      }
      const array2 = JSON.parse(res.text).data.articleFeed.items.edges
      const result2 = array2.filter(item => {
        return item.node.likeCount > 50
      })
      result2.forEach(item => {
        result.push(item)
      })
    })
  })
}
getInfo()
setInterval(() => {
  getInfo()
}, 10*1000*60)

app.get('/', (req, res, next) => {
  res.render('index.html', {
    result
  })
})
app.listen(3000, () => {
  console.log('running...')
})