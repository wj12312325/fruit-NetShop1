import request from '@/utils/request'



//获取商品列表（分页）
export const reqGetCartList = (user_id, params) => request({
    url: `/carts/getCartList/${user_id}`,
    method: "get",
    params
})

//删除购物车
export const reqDeleteCart = (data) => request({
    url: `/carts/deleteCart`,
    method: 'delete',
    data
})

// //添加商品
// export const reqAddGoods = (data) => request({
//     url: "/goods/addGoods",
//     method: "post",
//     data
// })

// //修改商品信息
// export const reqUpdateGoods = (id, data) => request({
//     url: `/goods/updateGoods/${id}`,
//     method: "put",
//     data
// })

// //商品上架与下架
// export const reqUpdateGoodsStatus = (id, data) => request({
//     url: `/goods/updateGoodsStatus/${id}`,
//     method: 'post',
//     data
// })