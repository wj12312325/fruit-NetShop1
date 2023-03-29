import request from '@/utils/request'


//获取收货地址列表
export const reqGetAddressList = (params, data) => request({
    url: '/address/getAddressList',
    method: 'post',
    params,
    data

})

//修改默认地址
export const reqUpdateAddress = (id, user_id, data) => request({
    url: `/address/updateAddress/${id}/${user_id}`,
    method: 'patch',
    data
})

//删除收货地址
export const reqDeleteAddress = (data) => request({
    url: "/address/deleteAddress",
    method: "delete",
    data
})

//添加收货地址
export const reqAddAddress = (user_id, data) => request({
    url: `/address/addAddress/${user_id}`,
    method: 'post',
    data
})