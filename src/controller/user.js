const { exec } = require('../db/mysql')

const handleLogin = (username, password) => {

    const sql = `select username,password,realname from users where username = '${username}' `

    return exec(sql).then(res => {
        // console.log('res: ', res);

        if (res instanceof Array && res.length === 0) {
            return {
                msg: '用户不存在'
            }
        }
        if (res[0].password == password) {
            return {
                msg: '登录成功！'
            }
        } else {
            return {
                msg: '密码错误请重新尝试！'
            }
        }
    })
}

module.exports = {
    handleLogin
}