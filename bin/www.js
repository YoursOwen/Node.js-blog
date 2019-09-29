const http = require('http')
const handleServer = require('../app.js')

const server = http.createServer(handleServer)

server.listen(5500)
console.log('App is running at 5500 Port')