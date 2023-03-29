//引入跟目录中.env中的配置文件信息
const { APP_PORT } = require('./config/config.default')
    //引入koa实例对象app
const app = require("./app/")


//中间件
app.use((ctx, next) => {
    ctx.body = 'hello server'
})


//监听端口
app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})