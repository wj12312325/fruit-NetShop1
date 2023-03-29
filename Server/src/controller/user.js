//引入jwt包，用来生成token
const jwt = require('jsonwebtoken')
    //引入配置信息
const { JWT_SECRET } = require("../config/config.default")
    //引入操作数据库的方法
const UserService = require('../service/user')
    //引入错误类型
const { userRegisterError, userUpdateInfoError, userLoginError, getUserInfoError, uesrLogoutError, userSelectError, userDeleteError, userPhoneOnlyError } = require('../constant/err')


class UserController {
    //注册
    async register(ctx, next) {
        const { name, phone, password, role, user_img } = ctx.request.body

        try {
            const result = await UserService.register(name, phone, password, role, user_img)
            ctx.body = {
                code: 200,
                message: "用户注册成功",
                result: {
                    id: result.id,
                    name: result.name
                }
            }
        } catch (error) {
            console.error('注册失败', error)
            ctx.app.emit('error', userRegisterError, ctx)

        }
    }

    //登录
    async login(ctx, next) {
        const { phone } = ctx.request.body

        try {
            const selectres = await UserService.selectToken({ phone })
            if (selectres) {
                const deleteTokenRes = await UserService.deleteToken({ phone })
            }
            const { password, ...res } = await UserService.isUserExist({ phone })
            const token = jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
            const tokenRes = await UserService.addToken(phone, token, res.id)

            ctx.body = {
                code: 200,
                message: '用户登录成功',
                result: {
                    //使用jwt生成token ,时效为一天
                    name: res.name,
                    token,
                    role: res.role
                }
            }
        } catch (error) {

            console.error('用户登录失败', error)
            return ctx.app.emit("error", userLoginError, ctx)
        }
    }

    //修改用户信息
    async updateUserInfo(ctx, next) {
        let id = 0
        const id1 = ctx.state.user.id

        const id2 = ctx.request.params.id

        if (id2) {
            id = id2
        } else {
            id = id1
        }

        const { name, phone, password, user_img, role } = ctx.request.body
        try {
            const res = await UserService.updateUserInfo({ id, name, phone, password, user_img, role })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '修改成功',
                    result: ''
                }
            } else {
                console.error('修改失败')
                return ctx.app.emit('error', userUpdateInfoError, ctx)
            }
        } catch (error) {
            console.error('修改失败', error)
            return ctx.app.emit('error', userPhoneOnlyError, ctx)
        }
    }

    //获取用户信息
    async getUserInfo(ctx, next) {
        const { id } = ctx.state.user
        try {
            const res = await UserService.getUserInfo(id)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '用户信息获取成功',
                    result: res
                }
            } else {
                console.error('获取用户信息失败')
                return ctx.app.emit('error', getUserInfoError, ctx)
            }
        } catch (error) {
            console.error('获取用户信息失败', error)
            return ctx.app.emit('error', getUserInfoError, ctx)
        }
    }

    //退出登录
    async logout(ctx, next) {
        const { phone } = ctx.state.user
        try {
            const deleteTokenRes = await UserService.deleteToken({ phone })
            if (deleteTokenRes) {
                ctx.body = {
                    code: 200,
                    message: '退出成功',
                    result: ''
                }
            } else {
                console.error('退出登录失败')
                return ctx.app.emit('error', uesrLogoutError, ctx)
            }
        } catch (error) {
            console.error('退出登录失败', error)
            return ctx.app.emit('error', uesrLogoutError, ctx)
        }

    }

    //搜索用户（分页）
    async selectUser(ctx, next) {
        const { pageNum = 1, pageSize = 10, state } = ctx.request.query
        const {
            name,
            phone,
            role
        } = ctx.request.body
        try {
            const res = await UserService.selectUser(pageNum, pageSize, state, {
                name,
                phone,
                role
            })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '搜索用户成功',
                    result: res
                }
            } else {
                console.error('搜索用户失败')
                return ctx.app.emit('error', userSelectError, ctx)
            }
        } catch (error) {
            console.error('搜索用户失败', error)
            return ctx.app.emit('error', userSelectError, ctx)
        }

    }

    //用户软删除
    async deleteUser(ctx, next) {
        try {
            const { id } = ctx.request.params
            const res = await UserService.deleteUser(id)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '用户删除成功',
                    result: ''
                }
            } else {
                console.error('用户删除失败')
                return ctx.app.emit('error', userDeleteError, ctx)
            }
        } catch (error) {
            console.error('用户删除失败', error)
            return ctx.app.emit('error', userDeleteError, ctx)

        }
    }


}

module.exports = new UserController()