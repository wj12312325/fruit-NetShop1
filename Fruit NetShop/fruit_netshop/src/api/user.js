//引入二次封装后的axios
import requests from "./request";

//登录
export const reqLogin = (data) => requests({
    url: '/users/login',
    method: 'post',
    data
})

//通过token获取用户信息
export const reqGetUserInfo = () => requests({
    url: '/users/getUserInfo',
    method: 'get'
})

//注册
export const reqRegister = (data) => requests({
    url: '/users/register',
    method: 'post',
    data
})

//退出登录
export const reqLogOut = () => requests({
    url: '/users/logout',
    method: 'get'
})

//用户上传头像
export const reqUploadAvatar = (data) => requests({
    url: '/goods/upload',
    method: "post",
    data
})

//修改用户信息
export const reqUpdateUserInfo = (data) => requests({
    url: "/users/updateinfo",
    method: "put",
    data
})