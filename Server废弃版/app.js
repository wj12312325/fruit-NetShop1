const querystringify = require('querystringify')

//引入用户路由
const handleUserRoute = require('./src/routes/user')

//用来处理post请求
const getPostData = (req) => {
    const promise = new Promise((resole, reject) => {
        //如果不是POST请求，直接退出
        if (req.method !== 'POST') {
            resole({})
            return
        }
        //如果请求数据不是json格式，直接退出
        if (req.headers['content-type'] !== 'application/json') {
            resole({})
            return
        }
        let postData = ""
            //以流的形式存储数据
        req.on('data', (chunk) => {
                postData += chunk
            })
            //输出post请求数据
        req.on('end', () => {
            //如果没有，直接退出
            if (!postData) {
                resole({})
                return
            }
            resole(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

//对请求进行处理
const serverHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystringify.parse(url.split("?")[1])

    getPostData(req).then((postData) => {
        req.body = postData

        //判断路由
        if (req.path.indexOf('/api/user') !== -1) {
            const userDataPromise = handleUserRoute(req, res)
            if (userDataPromise) {
                userDataPromise.then((userData) => {
                    res.end(JSON.stringify(userData))
                })
                return
            }
        }

        //如果路由都没有报404
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404 Not Found!!!')
        res.end()

    })
}

module.exports = serverHandler