//引入成功、失败模型
const { SuccessModel, ErrorModel } = require('../model/responseModel')

//引入控制器中的方法
const { login, register } = require("../controllers/user")


//用户路由函数
const handleUserRoute = (req, res) => {
    const method = req.method
    const userData = req.body

    //用户登录
    if (method === "POST" && req.path === '/api/user/login') {
        const loginPromise = login(userData)
        return loginPromise.then(loginData => {
            if (loginData) {
                return new SuccessModel("登录成功")
            } else {
                return new ErrorModel('账号或密码错误！请重新尝试！')
            }
        })
    }

    //用户注册
    if (method === 'POST' && req.path === "/api/user/register") {
        const registerPromise = register(userData)
        return registerPromise.then(registerData => {
            if (registerData) {
                return new SuccessModel('注册成功')
            } else {
                return new ErrorModel('手机号已被注册')
            }
        })
    }
}
module.exports = handleUserRoute