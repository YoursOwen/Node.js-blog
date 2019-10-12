//DEMO
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  const path = req.path
  const query = querystring.parse(req.url.split('?')[1])

  const returnObj = {
    url,
    method,
    path,
    query
  }

  if (method === 'GET') {
    res.end(
      JSON.stringify(returnObj)
    )
  }

  if (method === 'POST') {
    res.setHeader('content-type', 'application/json')

    let data = ''

    req.on('data', function(chunk) {
      data += chunk.toString()
    })
    
    req.on('end', function() {
      res.end(
        JSON.stringify(data)
      )
    })
  }
})

server.listen(5500)
console.log('App is running at 5500 Port')