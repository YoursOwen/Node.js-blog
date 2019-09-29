module.exports = function (req, res) {
	const path = req.url.split('?')[0]
	const method = req.method

	if (method === 'POST' && path === '/api/user') {
		return {
			message: '这是用户登陆接口'
		}
	}
}