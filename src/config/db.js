const env = process.env.NODE_ENV
console.log(env)

let MYSQL_CONFIG

if (env === 'developoment') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'kp4527KPH',
    port: '3306',
    database: 'blogapi'
  }
} else if (env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'kp4527KPH',
    port: '3306',
    database: 'blogapi'
  }
}

module.exports = {
  MYSQL_CONFIG
}