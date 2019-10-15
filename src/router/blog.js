const { SuccessModel, ErrorModel } = require('../model/basicModel.js')
const {
	getBlogList,
	getBlogDetail,
	newBlog,
	delBlog,
	updateBlog } = require('../controller/blog.js')

function isCheckLogin(req) {
	if (!req.session.username) {
		return Promise.resolve(new ErrorModel('登陆失败!'))
	} 
}

module.exports = function (req, res) {
	const path = req.url.split('?')[0]
	const method = req.method
	const id = req.query.id
	
	//获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const LoginRes = isCheckLogin(req)
		if (LoginRes) {
			return LoginRes
		}

		const { author, keyword } = req.query
		const result = getBlogList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData, 'succsee')
		})
	}	

	//获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {

		const LoginRes = isCheckLogin(req)
		if (LoginRes) {
			return LoginRes
		}

		const result = getBlogDetail(id)
		return result.then(detail => {
			return new SuccessModel(detail)
		})
		
	}

	//新建博客
	if (method === 'POST' && path === '/api/blog/new') {

		const LoginRes = isCheckLogin(req)
		if (LoginRes) {
			return LoginRes
		}

		req.body.author = req.session.username
		const postData = newBlog(req.body)
		return postData.then(res => {
			return new SuccessModel(res,'success')
		})
	}

	//更新博客
	if (method === 'POST' && path === '/api/blog/update') {

		const LoginRes = isCheckLogin(req)
		if (LoginRes) {
			return LoginRes
		}

		const result = updateBlog(id, req.body)
		return result.then(ret => {
			console.log(ret)
			if (ret) {
				return new SuccessModel(ret,'更新成功!')
			} else {
				return new ErrorModel('更新博客失败!')
			}
		})
	}

	//删除博客
	if (method === 'GET' && path === '/api/blog/del') {

		const LoginRes = isCheckLogin(req)
		if (LoginRes) {
			return LoginRes
		}

		const result = delBlog(id)
		return result.then(res => {
			if (res) {
				return new SuccessModel(res, '删除成功!')
			} else {
				return new ErrorModel('删除博客失败!')
			}
		})
		
	}
}