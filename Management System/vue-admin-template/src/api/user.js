import request from '@/utils/request'

//登录
export function login(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}
//获取用户信息
export function getInfo() {
    return request({
        url: '/users/getUserInfo',
        method: 'get',
    })
}
//退出登录
export function logout() {
    return request({
        url: '/users/logout',
        method: 'get'
    })
}

//获取用户列表（分页）
export const reqGetUserList = (params, data) => request({
    url: '/users/selectedUser',
    method: "post",
    params,
    data
})

//添加用户
export const reqAddUser = (data) => request({
    url: "/users/register",
    method: "post",
    data
})

//修改用户
export const reqUpdateUser = (id, data) => request({
    url: `/users/updateinfo/${id}`,
    method: "put",
    data
})

//软删除用户
export const reqDeleteUser = (id) => request({
    url: `/users/deleteUser/${id}`,
    method: 'post'
})