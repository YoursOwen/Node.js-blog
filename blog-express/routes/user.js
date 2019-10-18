var express = require('express');
var router = express.Router();
const { handleLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/basicModel.js')
// const checkLogin = require('../middleware/checkLogin')

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  const result = handleLogin(username,password)
  return result.then(loginData => {
    if (loginData.username) {

      req.session.username = loginData.username
      req.session.realname = loginData.realname

      res.json(new SuccessModel())
      return
    } else {
      res.json(ErrorModel('登陆失败!'))
    }
  })
});

// router.get('/login-test',function(req, res, next){
//   if (req.session.username) {
//     res.json({
//       msg: '登录成功'
//     })
//   } else {
//     res.json({
//       msg: '登录失败'
//     })
//   }
// })

// router.get('/session-test', function(req, res ,next) {
//   let session = req.session
//   if(session.viewNum === null) {
//     session.viewNum = 0
//   }
//   session.viewNum ++;
//   res.json({
//     viewNum: session.viewNum
//   })
// })

module.exports = router;