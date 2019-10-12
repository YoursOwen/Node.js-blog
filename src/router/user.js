const { handleLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/basicModel.js')

module.exports = function (req, res) {
	const path = req.url.split('?')[0]
	const method = req.method

	if (method === 'GET' && path === '/api/user') {
		const { username, password } = req.query
		const result = handleLogin(username,password)
		return result.then(loginData => {
			if (loginData.username) {

				req.session.username = loginData.username
				req.session.realname = loginData.realname

				return new SuccessModel()
			} else {
				return new ErrorModel('登陆失败!')
			}
		})
	}

	if (method === 'GET' && path === '/api/user/login-test') {
		if (req.session.username) {
			console.log(Promise.resolve(new SuccessModel()))
			return Promise.resolve(new SuccessModel({
				session: req.session
			}))
		} else {
			return Promise.resolve(new ErrorModel('登陆失败!'))
		}
	}
}