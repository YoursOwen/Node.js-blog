class Base {
	constructor(data, message) {
		if (typeof data === 'string') {
			this.message = data
			message = null
			data = null
		}

		if (data) {
			this.data = data
		}

		if (message) {
			this.message = message
		}
  }
}

class SuccessModel extends Base {
	constructor(data, message) {
		super(data, message)
		this.statusCode = 1
	}
}

class ErrorModel extends Base {
	constructor(data, message) {
		super(data, message)
		this.statusCode = 0
	}
}

module.exports = {
	SuccessModel,
	ErrorModel
}