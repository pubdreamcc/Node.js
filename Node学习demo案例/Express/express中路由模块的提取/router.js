let express = require('express')
let router = express.Router()
router.get('/', (req, res) => {
  res.send('index page')
})
router.get('/post', (req, res) => {
  res.send('post page')
})
router.get('/login', (req, res) => {
  res.send('login page')
})
router.get('/edit', (req, res) => {
  res.send('edit page')
})
module.exports = router