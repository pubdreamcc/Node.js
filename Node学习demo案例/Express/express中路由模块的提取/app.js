let express = require('express')
let router = require('./router')
let app = express()
app.use(router)
app.listen(3000, () => {
  console.log('running...')
})