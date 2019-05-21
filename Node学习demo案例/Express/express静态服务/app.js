let express = require('express')
let app = express()
app.use('/static/', express.static('./public'))
app.listen(3000, ()=> {
  console.log('running...')
})