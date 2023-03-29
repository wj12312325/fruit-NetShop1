//引入koa-router包
const Router = require('koa-router')
    //引入用户的controller
const { register, login, updateUserInfo, getUserInfo, logout, selectUser, deleteUser } = require('../controller/user')


//引入用户的中间件
const { validator, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user')
    //引入权限的中间件
const { auth, checkToken, isAdminRole } = require('../middleware/auth')

//创建router实例对象
const router = new Router({ prefix: '/api/users' })

//注册接口
router.post('/register', validator({
    name: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    password: { type: 'string', required: true },
    role: { type: "int", required: false },
    user_img: { type: "string", required: false }
}), verifyUser, crpytPassword, register)

//登录接口
router.post('/login', validator({
    phone: { type: 'string', required: true },
    password: { type: 'string', required: true },
    role: { type: 'number', required: false }
}), verifyLogin, login)

//获取用户信息
router.get('/getUserInfo', checkToken, auth, getUserInfo)

//查询用户(分页)
router.post('/selectedUser', checkToken, auth, isAdminRole, validator({
    name: { type: 'string', required: false },
    phone: { type: 'string', required: false },
    role: { type: 'int', required: false },
}), selectUser)

//修改用户信息
router.put('/updateinfo/:id?', checkToken, auth, validator({
    name: { type: 'string', required: false },
    phone: { type: 'string', required: false },
    password: { type: 'string', required: false },
    user_img: { type: 'string', required: false },
    role: { type: "int", required: false },

}), crpytPassword, updateUserInfo)

//退出登录
router.get('/logout', checkToken, auth, logout)

//用户软删除
router.post("/deleteUser/:id", checkToken, auth, isAdminRole, deleteUser)


module.exports = router