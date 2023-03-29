//引入二次封装的axios
import requests from './request'

//添加购物车
export const reqAddCart = (data) => requests({
    url: '/carts/addCart',
    method: 'post',
    data
})

//获取购物车列表
export const reqGetCartList = (id, params) => requests({
    url: `/carts/getCartList/${id}`,
    method: 'get',
    params
})

//更新购物车
export const reqUpdateCart = (id, data) => requests({
    url: `/carts/updateCart/${id}`,
    method: 'patch',
    data
})

//删除购物车 （可多行删除
export const reqDeleteCart = (data) => requests({
    url: "/carts/deleteCart",
    method: "delete",
    data
})

//全选or全取消购物车
export const reqSelectAllorNull = (data) => requests({
    url: '/carts/selectAllorNull',
    method: 'post',
    data
})