//引入koa-router包
const Router = require('koa-router')

//引入购物车Cart的controller
const { addCart, getCartList, updateCart, deleteCart, selectAllOrNull } = require('../controller/cart')

//引入权限的中间件
const { auth, checkToken } = require('../middleware/auth')
    //引入购物车中间件
const { validator, validateGoodsID } = require('../middleware/cart')
    //创建router实例对象
const router = new Router({ prefix: '/api/carts' })


//添加购物车
router.post('/addCart', checkToken, auth, validator({
    good_id: { type: 'number', required: true },
    number: { type: 'number', required: true }
}), validateGoodsID, addCart)

//获取购物车列表(分页)
router.get('/getCartList/:user_id', checkToken, auth,
    getCartList)

//更新购物车
router.patch('/updateCart/:id', checkToken, auth, validator({
    selected: { type: 'bool', required: false },
    number: { type: 'number', required: false }
}), updateCart)

//删除购物车
router.delete('/deleteCart', checkToken, auth, validator({ ids: 'array' }), deleteCart)

//购物车全选or全取消
router.post('/selectAllorNull', checkToken, auth, validator({ selectState: 'bool' }), selectAllOrNull)

module.exports = router