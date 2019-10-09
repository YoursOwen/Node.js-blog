const handleLogin = (nickname, password) => {
    
    console.log('nickname: ', nickname);
    console.log('password: ', password);

    if(nickname === 'owen' && password === 960125) {
        return {
            msg: '登录成功'
        }
    } 
}

module.exports = {
    handleLogin
}