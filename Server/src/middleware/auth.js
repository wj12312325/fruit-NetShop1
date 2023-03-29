//引入jwt,用来校验token
const jwt = require('jsonwebtoken')
    //引入配置信息
const { JWT_SECRET } = require('../config/config.default')
    //引入错误集合
const { tokenExpiredError, tokenError, invalidToken, selectTokenError, hasNotAdminRole } = require('../constant/err')
    //引入操作数据库的方法
const UserService = require('../service/user')

//检验token
const auth = async(ctx, next) => {
    const { token } = ctx.request.header

    try {
        if (token === undefined) {
            return ctx.body = {
                code: 200,
                message: '未登录',
                result: ''
            }
        }
        //校验token 并解析出其中的信息
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user

    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                {
                    const res = await UserService.deleteToken({ token })
                    console.error('tokrn过期了', error)
                    return ctx.app.emit('error', tokenExpiredError, ctx)
                }

            case 'JsonWebTokenError':
                {
                    console.error('无效的token', error)
                    await UserService.deleteToken({ token })
                    return ctx.app.emit('error', invalidToken, ctx)
                }
        }
    }

    await next()
}

//对比token
const checkToken = async(ctx, next) => {
    const { phone } = ctx.request.body || ''
    const { token } = ctx.request.header || ''
    const { userId } = ctx.request.body || ''


    try {
        const res = await UserService.selectToken({ token })
        if (!res) {
            return ctx.app.emit('error', tokenError, ctx)
        }

    } catch (error) {
        console.error('token查询错误', error)
        return ctx.app.emit('error', selectTokenError, ctx)
    }
    await next()

}

//判断用户身份是否为管理员
const isAdminRole = async(ctx, next) => {
    const { role } = ctx.state.user
    if (role) {
        await next()
    } else {
        console.error('该用户没有权限', ctx)
        return ctx.app.emit('error', hasNotAdminRole, ctx)
    }

}

module.exports = { auth, checkToken, isAdminRole }