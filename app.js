const querystring = require('querystring')

const handleServer = (req, res) => {
	const handleBlogServer = require('./src/router/blog')
	const handleUserServer = require('./src/router/user')

	res.setHeader('content-type', 'application/json')

	req.query = querystring.parse(req.url.split('?')[1])

  const blogServerRes = handleBlogServer(req, res)
	if (blogServerRes) {
		res.end(
			JSON.stringify(blogServerRes)
		)
		return
	}

	const userServerRes = handleUserServer(req, res)
	if (userServerRes) {
		res.end(
			JSON.stringify(userServerRes)
		)
		return
	}

	//处理未捕获404
	res.writeHeader(404, {
		"content-type": "text/plain"
	})
	res.end('404 NOT FOUND \n')
}

module.exports = handleServer