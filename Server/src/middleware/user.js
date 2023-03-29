//引入用户Service
const UserService = require('../service/user')
    //引入加密bcryptjs包
const bcrypt = require("bcryptjs")


//引入错误集合
const { userFormateError, userAlreadyExited, userDoesNotExist, userLoginError, invalidPassword, identityError } = require('../constant/err')


//用户数据合法性验证
const validator = (rules) => {
    return async(ctx, next) => {
        try {
            ctx.verifyParams(rules)

        } catch (error) {
            console.error(error)
            userFormateError.result = error
            return ctx.app.emit('error', userFormateError, ctx)
        }
        await next()
    }

}

//用户合理性
const verifyUser = async(ctx, next) => {
    const { name, phone, password } = ctx.request.body
        //合理性
    try {
        if (await UserService.isUserExist({ phone })) {

            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取用户信息错误', error)
        ctx.app.emit('error', userAlreadyExited)
        return
    }
    await next()
}

//密码加密
const crpytPassword = async(ctx, next) => {
    const { password } = ctx.request.body
    if (password) {
        //加盐加密
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        ctx.request.body.password = hash
    }

    await next()
}

//用户登录合理性
const verifyLogin = async(ctx, next) => {
    const { phone, password, role } = ctx.request.body
    try {
        const res = await UserService.isUserExist({ phone })
            //判断手机号是否存在
        if (!res) {
            console.error('该手机号尚未注册', ctx)
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        } else {
            //若存在，判断密码是否一致 （使用bcrypt进行解密对比）
            if (!bcrypt.compareSync(password, res.password)) {
                ctx.app.emit('error', invalidPassword, ctx)
                return
            } else {
                if (res.role != role) {} else {
                    console.error('身份错误，权限不够')
                    return ctx.app.emit("error", identityError, ctx)

                }

            }


        }
    } catch (error) {
        console.error('用户登录失败', error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }


    await next()
}

module.exports = { validator, verifyUser, crpytPassword, verifyLogin }