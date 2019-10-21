const http = require('http')
const slice = Array.prototype.slice

class App {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        }
        this.registerIndex = 0
    }

    register(path) {
        const info = {}
        if (typeof path === 'string') {
            info.path = path
            info.stack = slice.call(arguments, 1) //函数栈，数组
            info.index = this.registerIndex  
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0) 
            info.index = this.registerIndex            
        }
        this.registerIndex++;
        return info
    }

    use() {
        const args = slice.apply(arguments)
        const info = this.register.call(this, ...args)
        this.routes.all.push(info)
    }

    get() {
        const args = slice.apply(arguments)
        const info = this.register.call(this, ...args)
        this.routes.get.push(info)
    }

    post() {
        const args = slice.apply(arguments)
        const info = this.register.call(this, ...args)
        this.routes.post.push(info)
    }

    sortRoutes(routes) {
        for (let i = 0; i < routes.length-1; i++) {
            for (let j = 0; j < routes.length-1-i; j++) {
                if(routes[j].index > routes[j+1].index) {
                    var temp = routes[j];
                    routes[j] = routes[j + 1];
                    routes[j + 1] = temp;
                }
            }
        }
        console.log(routes)
        return (routes)
    }

    match(method, url) {
        let stack = []

        if (url === '/favcio.ico') {
            return stack
        }

        //获取route
        let currentRoute = []

        currentRoute = currentRoute.concat(this.routes.all)    
        currentRoute = currentRoute.concat(this.routes[method])   
        //上面这两行有bug，并不是按照use的使用顺序来的,添加sortRoutes函数让中间件按照指定的use顺序执行
        currentRoute = this.sortRoutes(currentRoute)
        


        currentRoute.forEach(routerInfo => {
            if (url.indexOf(routerInfo.path) === 0) {
                stack = stack.concat(routerInfo.stack)
            }
        })
        return stack
    }
    
    handle(req, res, stack) {
        const next = () => {
            // console.log('bottom',stack.toString())
            const middleware = stack.shift()
            if (middleware) {
                
                middleware(req, res, next)
            }
        }
        next()
    }

    callback(req, res) {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }
    
                const method = req.method.toLowerCase()
                const url = req.url
                const resultList = this.match(method, url)
                this.handle(req, res, resultList)
            }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}


module.exports = () => {
    return new App()
}