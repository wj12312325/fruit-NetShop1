//引入二次封装的axios
import requests from './request'


//获取用户订单列表
export const reqGetOrderList = (params) => requests({
        url: "/orders/getOrderList",
        method: "get",
        params
    })
    //删除用户订单
export const reqDeleteOrder = (data) => requests({
    url: "/orders/deleteOrder",
    method: "delete",
    data
})

//生成用户订单
export const reqAddOrder = (data) => requests({
    url: "/orders/addOrder",
    method: "post",
    data
})

//修改订单状态
export const reqUpdateOrder = (id, data) => requests({
    url: `/orders/updateOrder/${id}`,
    method: 'patch',
    data
})