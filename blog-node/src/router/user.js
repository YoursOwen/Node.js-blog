const { handleLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/basicModel.js')
const { set } = require('../db/redis')

module.exports = function (req, res) {
	const path = req.url.split('?')[0]
	const method = req.method

	if (method === 'POST' && path === '/api/user/login') {
		const { username, password } = req.body
		const result = handleLogin(username,password)
		return result.then(loginData => {
			if (loginData.username) {

				req.session.username = loginData.username
				req.session.realname = loginData.realname

				set(req.sessionId, req.session)
				return new SuccessModel()
			} else {
				return new ErrorModel('登陆失败!')
			}
		})
	}
}