const querystring = require('querystring')
const handleBlogServer = require('./src/router/blog')
const handleUserServer = require('./src/router/user')
const { set, get } = require('./src/db/redis')

const getCookieExpires = () => {
	let d = new Date()
	d.setTime(d.getTime() + (48 * 60 * 60 * 1000))

	return d.toGMTString()
}

//session
// const SESSION_DATA = {} (切换redis)

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

	//解析query
	req.query = querystring.parse(req.url.split('?')[1])

	//解析cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || ''
	cookieStr.split(';').forEach(item => {
		if(!item) return

		const arr = item.split('=')
		const key = arr[0].trim()
		const value = arr[1].trim()
		req.cookie[key] = value
	})

	//解析session
	// let needSetCookie = false
	// let u_id = req.cookie.u_id
	// if (u_id) {
	// 	if (!SESSION_DATA[u_id]) {
	// 		SESSION_DATA[u_id] = {}
	// 	} 
	// } else {
	// 	needSetCookie = true
	// 	u_id = `${Date.now()}_${Math.random()}`
	// 	SESSION_DATA[u_id] = {}
	// }
	// req.session = SESSION_DATA[u_id]

	let needSetCookie = false
	let u_id = req.cookie.u_id

	if (!u_id) {
		needSetCookie = true
		u_id = `${Date.now()}_${Math.random()}`
		set(u_id, {})
	}

	req.sessionId = u_id
	get(req.sessionId).then(sessionData => {
		if (sessionData == null) {
			set(req.sessionId,{})
			req.session = {}
		} else {
			req.session = sessionData
		}

		return getPostData(req)
	}).then(postData => {
		req.body = postData

		const blogServerPromise = handleBlogServer(req, res)
		if (blogServerPromise) {
			blogServerPromise.then(result => {

				if (needSetCookie) {
					res.setHeader('Set-Cookie', `u_id=${u_id}; path=/; httpOnly; expires=${getCookieExpires()} `)
				}

				res.end(
					JSON.stringify(result)
				)
			})
			return
		}
		
		const userServerPromise = handleUserServer(req, res)
		if (userServerPromise) {
			userServerPromise.then(result => {

				if (needSetCookie) {
					res.setHeader('Set-Cookie', `u_id=${u_id}; path=/; httpOnly; expires=${getCookieExpires()} `)
				}

				res.end(
					JSON.stringify(result)
				)
			})
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