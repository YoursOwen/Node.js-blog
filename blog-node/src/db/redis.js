const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

client.on("error", function (err) {
	console.log(err)
})

function set(key, val) {
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}

	client.set(key, val, redis.print)
}

function get(key) {
	return new Promise((resolve, reject) => {
		client.get(key, (err, val) => {
			if (err) {
				reject(err)
				return
			}

			if (val == null) {
				resolve(null)
			}

			try{
				resolve(
					JSON.parse(val)
				)
			} catch(err) {
				resolve(val)
			}
		})
	})
}

module.exports = {
	set,
	get
}