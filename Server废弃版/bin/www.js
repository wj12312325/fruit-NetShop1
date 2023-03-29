const http = require('http')

//引入服务器配置文件
const serverHandler = require('../app')

//服务器端口号
const PORT = 9999

//创建服务器
const server = http.createServer(serverHandler)

//监听服务费
server.listen(PORT, () => {
    console.log('server running at port 9999...')
})