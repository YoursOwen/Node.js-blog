

const express = require('./middleware')
const app = express() //app为express每一次的实例
 
app.use(function(req, res, next) {
  console.log('路由开始执行' + req.method + '--' + req.path)
  next()
})

app.use(function(req, res, next) {
  //cookie处理...省略步骤
  console.log('cookie处理...省略步骤')
  req.cookie = {
    u_id: 'DAVXVG3',
    name: 'owen'
  }
  next()
})

app.use(function(req, res, next) {
    console.log(' setTimeout(() => {')
  setTimeout(() => {
    req.body = {
      age: 12,
      sex: 'female'
    }
    next()
  })
})

app.use('/api', function(req, res, next) {
 console.log('进入了父api')
  next()
})

app.get('/api', function(req, res, next) {
  console.log('进入了get父api')
   next()
 })

 app.post('/api', function(req, res, next) {
  console.log('进入了post父api')
   next()
 })

 app.get('/api/blog', function(req, res, next) {
  console.log('进入了get /api/blog')
  res.json({
    cookie: req.cookie,
    body: req.body,
    statuscode: 1
  })
 })

 app.post('/api/blog', function(req, res, next) {
  console.log('进入了post /api/blog')
  res.json({
    cookie: req.cookie,
    body: req.body,
    statuscode: 1
  })
 })

 function isLoginCheck(req, res, next) {
  console.log('登录验证！')
  next()
 }

 app.get('/api/login', isLoginCheck,function(req, res, next){
   console.log('登陆成功!')
   res.json({
     msg: '登陆成功'
   })
 })

 app.use(function(req, res, next) {
  console.log('处理404 NOT FOUND')
  res.json({ 
    statuscode: 404
  })
 })

 app.listen(5000,'127.0.0.1')