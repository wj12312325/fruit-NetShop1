const Router = require('koa-router')

//引入权限的中间件
const { auth, checkToken } = require('../middleware/auth')

//引入商品分类中间件
const { validator } = require('../middleware/category')

//引入商品分类Controller
const { addCategory, getCategoryList, updateCategory, deleteCategory, getGoodsSearchList } = require('../controller/category')

//创建实例对象
const router = new Router({ prefix: '/api/category' })

//添加商品分类
router.post("/addCategory", checkToken, auth, validator({
    category_name: { type: "string", required: true },
    parent_id: { type: "number", required: true }
}), addCategory)

//获取商品分类列表
router.get('/getCategoryList', getCategoryList)

//更新商品分类
router.patch('/updateCategory/:id', checkToken, auth, validator({
    category_name: { type: "string", required: true },
    parent_id: { type: "number", required: true }
}), updateCategory)

//删除商品分类(可多行删除)
router.delete('/deleteCategory', checkToken, auth, validator({ ids: 'array' }), deleteCategory)

//查询商品通过商品分类
router.post('/getGoodsSearchList', validator({ category1Id: { type: "number", required: false }, category2Id: { type: "number", required: false } }), getGoodsSearchList)

module.exports = router