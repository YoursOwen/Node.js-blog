const env = process.env.NODE_ENV
console.log(env)

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'developoment') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'kp4527KPH',
    port: '3306',
    database: 'blogapi'
  }

  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1"
  }
} else if (env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'kp4527KPH',
    port: '3306',
    database: 'blogapi'
  }

  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1"
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}