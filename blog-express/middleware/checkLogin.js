const { ErrorModel } = require('../model/basicModel')

module.exports = function(req, res , next) {
  if (req.session.username) {
    next()
    return
  }
  res.json(
    new ErrorModel('登陆失败！')
    
  )
}