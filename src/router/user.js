const { handleLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/basicModel.js')

module.exports = function (req, res) {
	const path = req.url.split('?')[0]
	const method = req.method

	if (method === 'POST' && path === '/api/user') {
		const { username, password } = req.body
		const result = handleLogin(username,password)

		if (result) {
			return new SuccessModel(result)
		} else {
			return new ErrorModel('登陆失败!')
		}
	}
}