//引入koa-router包
const Router = require('koa-router')
    //引入商品的controller
const { upload, addGoods, updateGoods, updateGoodsStatus, getGoodsList, selectGoods, deleteGoods } = require('../controller/goods')
    //引入权限的中间件
const { auth, checkToken, isAdminRole } = require('../middleware/auth')
    //引入商品的中间件
const { validator } = require('../middleware/goods')
    //创建router实例对象
const router = new Router({ prefix: '/api/goods' })

//图片上传
router.post('/upload', upload)

//商品上传
router.post('/addGoods', checkToken, auth, isAdminRole, validator({
    goods_name: { type: 'string', required: true },
    goods_price: { type: 'number', required: true },
    goods_num: { type: 'number', required: true },
    goods_img: { type: 'string', required: true },
    goods_introduction: { type: 'string', required: true },
    goods_category_id: { type: 'number', required: true }
}), addGoods)

//修改商品信息
router.put('/updateGoods/:id', checkToken, auth, validator({
    goods_name: { type: 'string', required: false },
    goods_price: { type: 'number', required: false },
    goods_num: { type: 'number', required: false },
    goods_img: { type: 'string', required: false },
    goods_introduction: { type: 'string', required: false },
    goods_category_id: { type: 'number', required: false }
}), updateGoods)

//商品上架与下架
router.post('/updateGoodsStatus/:id', checkToken, auth, isAdminRole, validator({
    goods_state: { type: 'number', required: false }
}), updateGoodsStatus)

//获取商品列表(分页)
router.get('/getGoodsList', getGoodsList)


//搜索商品信息(分页)
router.post('/selectGoods', validator({
    id: { type: 'number', required: false },
    goods_name: { type: 'string', required: false },
    goods_category_id: { type: 'number', required: false }
}), selectGoods)

//删除商品(可多行删除)
router.delete('/deleteGoods', checkToken, auth, isAdminRole, validator({ ids: 'array' }), deleteGoods)


module.exports = router