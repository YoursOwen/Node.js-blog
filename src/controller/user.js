const { exec } = require('../db/mysql')

const handleLogin = (username, password) => {

    const sql = `select username,realname from users where username = '${username}' and password = ${password} `

    return exec(sql).then(res => {
       return res[0] || {}
    })
}

module.exports = {
    handleLogin
}