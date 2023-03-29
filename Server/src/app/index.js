const path = require('path')
    //引入koa包
const Koa = require('koa')
    //引入koaBody包
const KoaBody = require('koa-body')
    //统一引入全部的路由
const router = require('../router/index')
    //引入统一错误处理函数
const errorHandler = require('./errorHandler')
    //引入koa-static 用于将某个目录变成静态资源文件夹
const KoaStatic = require('koa-static')
    //引入校验koa-parameter
const parameter = require('koa-parameter')


//创建koa
const app = new Koa()

//使用koaBody
app.use(KoaBody.koaBody({
    multipart: true,
    formidable: {
        //相对路径 是相对于根目录的，建议绝对路径
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,

    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}))

//选择路径变成静态资源文件夹
app.use(KoaStatic(path.join(__dirname, '../upload')))
    //使用校验规则
app.use(parameter(app))
    //统一使用全部路由
app.use(router.routes())
    //当遇到不支持的请求方式时 ：报501
app.use(router.allowedMethods())

//进行统一错误处理
app.on('error', errorHandler)

module.exports = app