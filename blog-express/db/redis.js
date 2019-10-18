const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

const redisclient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

redisclient.on("error", function (err) {
	console.log(err)
})

module.exports = redisclient