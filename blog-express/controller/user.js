const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../util/cryp')

const handleLogin = (username, password) => {
    username = escape(username)
    
    //生成加密代码
    password = genPassword(password)
    password = escape(password) //escape转换，防止sql注入，增加引号

    const sql = `select username,realname from users where username = ${username} and password = ${password} `
    console.log(sql)
    return exec(sql).then(res => {
       return res[0] || {}
    })
}

module.exports = {
    handleLogin
}