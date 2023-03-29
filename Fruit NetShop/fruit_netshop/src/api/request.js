//引入axios并进行二次封装
import axios from 'axios'

import { MessageBox, Message } from 'element-ui'

//引入仓库
import store from '@/store'
import router from '@/router'

const requests = axios.create({
    // 基础路径
    baseURL: '/api',
    //请求超时时间
    timeout: 5000,
})

//请求拦截器
requests.interceptors.request.use((config) => {

        //如果有token,就把在请求头上带上token
        if (store.state.user.token) {
            config.headers.token = store.state.user.token
        }
        return config; //配置对象，里面有一个很重要的属性headers请求头
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    });

//响应拦截器
requests.interceptors.response.use((res) => {

    // if (res.code !== 200) {
    //     Message({
    //         message: res.message || 'Error',
    //         type: 'error',
    //         duration: 5 * 1000
    //     })
    //     console.log(res)
    //     if (res.code === "10006" || res.code === "10102") {
    //         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //             confirmButtonText: 'Re-Login',
    //             cancelButtonText: 'Cancel',
    //             type: 'warning'
    //         })
    //     }
    //     return Promise.reject(new Error(res.message || 'Error'))
    // } else {

    // }
    return res.data;


}, (error) => {
    if (error.response.data.code == '10106') {
        localStorage.removeItem('TOKEN')
        store.state.user.token = ''
        store.commit('user/GETUSERINFO', '')
        router.replace('/login')
    }

    return Promise.reject(error.response.data.message)

})

export default requests