const querystring = require('querystring')
const handleBlogServer = require('./src/router/blog')
const handleUserServer = require('./src/router/user')

const getPostData = (req) => {
	return new Promise((resolve, reject) => {
		if (req.method !== 'POST') {
			0
			resolve({})
			return
		}

		if (req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}

		let data = ''

		req.on('data', function (chunk) {
			data += chunk.toString()
		})

		req.on('end', function () {
			if (data === '') {
				resolve({})
				return
			}
			resolve(JSON.parse(data))

		})
	})
}

const handleServer = (req, res) => {
	res.setHeader('content-type', 'application/json')

	req.query = querystring.parse(req.url.split('?')[1])

	getPostData(req).then(postData => {
		req.body = postData

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
	})

}

module.exports = handleServer