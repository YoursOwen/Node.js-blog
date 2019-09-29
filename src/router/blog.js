const { SuccessModel, ErrorModel } = require('../model/blog.js')
const { getBlogList } = require('../controller/blog.js')

module.exports = function (req, res) {
	const path = req.url.split('?')[0]
	const method = req.method

	//获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const { author, list } = req.query
		const listData = getBlogList(author, list)
		return new SuccessModel(listData,'succsee')
	}

	//获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		return {
			message: '这是获取博客详情接口'
		}
	}

	//新建博客
	if (method === 'GET' && path === '/api/blog/new') {
		return {
			message: '这是新建博客接口'
		}
	}

	//删除博客
	if (method === 'GET' && path === '/api/blog/del') {
		return {
			message: '这是删除博客接口'
		}
	}

	//更新博客
	if (method === 'GET' && path === '/api/blog/update') {
		return {
			message: '这是更新博客接口'
		}
	}
}