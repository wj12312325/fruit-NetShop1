 const Router = require('koa-router')

 //引入权限的中间件
 const { auth, checkToken } = require('../middleware/auth')

 //引入订单中间件
 const { validator } = require('../middleware/order')

 //引入订单Controller
 const { addOrder, getOrderList, updateOrder, deleteOrder, getOrderSearchList } = require('../controller/order')

 //创建实例对象
 const router = new Router({ prefix: '/api/orders' })

 //提交订单
 router.post("/addOrder", checkToken, auth, validator({
     address_id: { type: "int", required: true },
     goods_id: { type: "string", required: true },
     goods_number: { type: "string", required: true },
     total: { type: "number", required: true },
     order_remark: { type: "string", required: false }
 }), addOrder)


 //获取订单列表(分页)
 router.get('/getOrderList', checkToken, auth, validator({
     status: { type: "string", required: false },
 }), getOrderList)

 //更新订单状态
 router.patch('/updateOrder/:id', checkToken, auth, validator({
     status: { type: "number", required: true }
 }), updateOrder)

 //删除订单(可多行删除)
 router.delete('/deleteOrder', checkToken, auth, validator({ ids: 'array' }), deleteOrder)

 //获取订单列表（分页）
 router.post('/getOrderSearchList', checkToken, auth, validator({
     status: { type: "int", required: false },
     user_id: { type: 'int', required: false },
     order_number: { type: "string", required: false }
 }), getOrderSearchList)

 module.exports = router