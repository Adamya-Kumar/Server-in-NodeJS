const http = require('http')
const fs = require('fs')
const port = 8001
const url = require('url')

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return res.end()
  const log = `${Date.now()}:${req.url} new req received\n`
  const myUrl = url.parse(req.url, true)
  console.log(myUrl)
  fs.appendFile('log.txt', log, (err, data) => {
    switch (myUrl.pathname) {
      case '/':
        res.end('HomePage')
        break
      case '/about':
        const username = myUrl.query.myname
        res.end(`hi,${username}`)
        break
      case '/search':
        const search = myUrl.query.search_query
        res.end('this is my query is : ' + search)
        break
      default:
        res.end(
          `
          <h1 style="font-size:500px ">404</h1>`,
        )
    }
    // res.end('hello world server')
  })
})

server.listen(port, () => {
  console.log(`http://localhost:${port}`)
  console.log('serverd started :')
})
