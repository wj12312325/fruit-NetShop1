//引入二次封装的axios
import requests from './request'


//获取用户收货地址列表
export const reqGetAddressList = (params, data) => requests({
    url: "/address/getAddressList",
    method: "post",
    params,
    data
})

//添加收货地址
export const reqAddAddress = (data) => requests({
    url: '/address/addAddress',
    method: 'post',
    data
})


//修改收货地址
export const reqUpdateAddress = (id, data) => requests({
    url: `/address/updateAddress/${id}`,
    method: 'patch',
    data
})

//删除收货地址
export const reqDeleteAddress = (data) => requests({
    url: "/address/deleteAddress",
    method: "delete",
    data
})