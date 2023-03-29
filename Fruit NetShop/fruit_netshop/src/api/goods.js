//引入二次封装的axios
import requests from './request'

//获取商品列表
export const reqGetGoodsList = (data) => requests({
    url: '/goods/getGoodsList',
    method: 'get',
    params: data
})

//获取商品搜索列表
export const reqGetSearchList = (params, data) => requests({
    url: "/goods/selectGoods",
    method: "post",
    params,
    data,
})

//修改商品信息
export const reqUpdateGoods = (id, data) => requests({
    url: `/goods/updateGoods/${id}`,
    method: "put",
    data
})
