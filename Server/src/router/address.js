const Router = require('koa-router')

//引入权限的中间件
const { auth, checkToken, isAdminRole } = require('../middleware/auth')

//引入地址中间件
const { validator } = require('../middleware/address')

//引入地址Controller
const { addAddress, getAddressList, updateAddress, deleteAddress } = require('../controller/address')

const router = new Router({ prefix: '/api/address' })

//添加地址
router.post('/addAddress/:user_id?', checkToken, auth, validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1[3456789]\d{9}$/ },
    area: "string",
    address: 'string'
}), addAddress)



//获取地址列表（分页）
router.post('/getAddressList', checkToken, auth, validator({
    phone: { type: 'string', required: false },
    consignee: { type: 'string', required: false },
    user_id: { type: 'int', required: false },
}), getAddressList)

//更新地址 (同时可以修改默认地址)
router.patch("/updateAddress/:id/:user_id?", checkToken, auth, validator({
    consignee: { type: 'string', required: false },
    phone: { type: 'string', format: /^1[3456789]\d{9}$/, required: false },
    area: { type: "string", required: false },
    address: { type: "string", required: false },
    is_default: { type: 'bool', required: false }
}), updateAddress)

//删除地址
router.delete('/deleteAddress', checkToken, auth, validator({ ids: 'array' }), deleteAddress)



module.exports = router