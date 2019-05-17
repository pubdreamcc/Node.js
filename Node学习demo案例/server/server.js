let http = require('http')
let fs = require('fs')
let template = require('art-template')
let server = http.createServer()
server.on('request', (req, res) => {
  let url = req.url
  if (url === '/') {
    fs.readFile('./template.html', (error, data) => {
      if (error) {
        return res.end('404 NOT FOUND!')
      }
      fs.readdir('../www', (error, files) => {
        if (error) {
          return res.end('www dir is not found')
        }
        let htmlStr = template.render(data.toString(), {
          files: files
        })
        res.end(htmlStr)
      })
    })
  } else {
    let filePath = url
    fs.readFile('../www' + url, (error, data) => {
      if (error) {
        return res.end('404 not found')
      }
      res.end(data)
    })
  }
})
server.listen(3001, () => {
  console.log('server is running....')
})