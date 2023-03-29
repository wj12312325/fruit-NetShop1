import request from '@/utils/request'



//获取商品列表（分页）
export const reqGetGoodsList = (params, data) => request({
    url: '/goods/selectGoods',
    method: "post",
    params,
    data
})

//添加商品
export const reqAddGoods = (data) => request({
    url: "/goods/addGoods",
    method: "post",
    data
})

//修改商品信息
export const reqUpdateGoods = (id, data) => request({
    url: `/goods/updateGoods/${id}`,
    method: "put",
    data
})

//商品上架与下架
export const reqUpdateGoodsStatus = (id, data) => request({
    url: `/goods/updateGoodsStatus/${id}`,
    method: 'post',
    data
})

//删除商品
export const reqDeleteGoods = (data) => request({
    url: `/goods/deleteGoods`,
    method: 'delete',
    data
})