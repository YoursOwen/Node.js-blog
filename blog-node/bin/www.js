const http = require('http')
const handleServer = require('../app.js')

const server = http.createServer(handleServer)

server.listen(8000)
console.log('App is running at 8000 Port')