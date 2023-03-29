import request from '@/utils/request'


//获取订单列表
export const reqGetOrderList = (params, data) => request({
    url: `/orders/getOrderSearchList`,
    method: 'post',
    params,
    data,

})

//修改订单状态
export const reqUpdateOrder = (id, data) => request({
    url: `/orders/updateOrder/${id}`,
    method: 'patch',
    data
})

//删除订单
export const reqDeleteOrder = (data) => request({
    url: "/orders/deleteOrder",
    method: "delete",
    data
})