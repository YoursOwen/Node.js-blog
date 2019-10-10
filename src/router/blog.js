const { SuccessModel, ErrorModel } = require('../model/basicModel.js')
const {
	getBlogList,
	getBlogDetail,
	newBlog,
	delBlog,
	updateBlog } = require('../controller/blog.js')

module.exports = function (req, res) {
	const path = req.url.split('?')[0]
	const method = req.method
	const id = req.query.id
	
	//获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const { author, keyword } = req.query
		const result = getBlogList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData, 'succsee')
		})
	}	

	//获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		const result = getBlogDetail(id)
		return result.then(detail => {
			return new SuccessModel(detail)
		})
		
	}

	//新建博客
	if (method === 'POST' && path === '/api/blog/new') {
		req.body.author = "王五"
		const postData = newBlog(req.body)
		return postData.then(res => {
			return new SuccessModel(res,'success')
		})
	}

	//更新博客
	if (method === 'POST' && path === '/api/blog/update') {
		const result = updateBlog(id, req.body)
		result.then(ret => {
			console.log(ret)
			if (ret) {
				return new SuccessModel(ret,'更新成功!')
			} else {
				return new ErrorModel('更新博客失败!')
			}
		})
	}

	//删除博客
	if (method === 'POST' && path === '/api/blog/del') {
		const ret = delBlog(id)
		if (ret) {
			return new SuccessModel(ret)
		} else {
			return new ErrorModel('删除博客失败!')
		}
	}
}