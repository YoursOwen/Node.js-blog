var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/basicModel.js')
const {
	getBlogList,
	getBlogDetail,
	newBlog,
	delBlog,
	updateBlog } = require('../controller/blog.js')
const checkLogin = require('../middleware/checkLogin')
  
router.get('/list', function(req, res, next) {
  let { author, keyword } = req.query

		if (req.query.isadmin) {
			//管理员模式
			if (!req.session.username) {
				console.error('is admin, but no login')
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
			}
		// 	//强制查询自己的list
			console.log(req.session)
			author = req.session.username
		}
		
		const result = getBlogList(author, keyword)
		return result.then(listData => {
			res.json(
				new SuccessModel(listData, 'success')
			) 
		})
});

router.get('/detail', function(req, res, next) {
	const id = req.query.id
	const result = getBlogDetail(id)
	return result.then(detail => {
		res.json(
			new SuccessModel(detail)
		)
	})

})

router.post('/new', checkLogin, function(req, res, next) {
	
	req.body.author = req.session.username
		const postData = newBlog(req.body)
		return postData.then(result => {
			res.json(
				new SuccessModel(result,'success')
			)
		})
})

router.post('/update', checkLogin, function(req, res, next) {
	const id = req.query.id
	const result = updateBlog(id, req.body)

	return result.then(ret => {
		console.log(ret)
		if (ret) {
			res.json(
				new SuccessModel(ret,'更新成功!')
			)
		} else {
			res.json(
				new ErrorModel('更新博客失败!')
			)
		}
	})
})


router.post('/del', checkLogin, function(req, res, next) {
	const id = req.query.id
	const result = delBlog(id, req.session.username)

	return result.then(delRes => {
		if (delRes) {
			res.json(
				new SuccessModel(delRes, '删除成功!')
			)
		} else {
			res.json(
				new ErrorModel('删除博客失败!')
			)
		}
	})
})

module.exports = router;