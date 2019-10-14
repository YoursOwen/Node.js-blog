const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG)

//连接
con.connect()

function exec(sql) {
  return new Promise((resolev, reject) => {
    con.query(sql, (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolev(result)
    })
  })
}

//不使用con.end() 原因在于1.创建类似单例模式，避免资源消耗 2.该文件只会被执行一次，而exec为异步

module.exports = {
  exec
}
