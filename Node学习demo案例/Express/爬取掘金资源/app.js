const express = require('express');
const cheerio = require('cheerio');
const superagent = require('superagent');
const app = express();
let result = [];
app.use('/public', express.static('./public'));
app.engine('html', require('express-art-template'));
let params = {
  category: "frontend",
  limit: 30,
  offset: 0,
  order: "time"
}
function getInfo () {
  superagent.post('https://e.xitu.io/resources/gold')
    .send(params)
    .end((err, res) => {
    if (err) {
      return console.log(err)
    } 
    result = res.body.data;
  })
}
getInfo();
setInterval(() => {
  getInfo()
}, 10*1000*24);

app.get('/', (req, res, next) => {
  res.render('index.html', {
    result
  });
})
app.listen(3000, () => {
  console.log('running...')
});
