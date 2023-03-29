import { reqLogin, reqGetUserInfo, reqRegister, reqLogOut, reqUploadAvatar, reqUpdateUserInfo } from "@/api/user"

const state = {
    //token (令牌)
    token: localStorage.getItem('TOKEN'),
    //用户信息
    userInfo: ''



}
const mutations = {
    //修改token
    LOGIN(state, token) {
        state.token = token
    },

    //修改用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },

    //修改退出信息
    LOGOUT(state) {
        state.token = ''
        state.userInfo = ''
        localStorage.removeItem('TOKEN')
    }

}
const actions = {
    //用户登录
    async login({ commit }, data) {
        let result = await reqLogin(data)
        if (result.code == 200) {
            commit('LOGIN', result.result.token)
            localStorage.setItem('TOKEN', result.result.token)
        } else {
            return Promise.reject(new Error('登录失败'))
        }
    },
    //获取用户信息(通过token)
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.result)
            localStorage.setItem('ID', result.result.id)

        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败'))
        }
    },

    //通过登录
    async logOut({ commit }) {
        let result = await reqLogOut()
        if (result.code == 200) {
            commit('LOGOUT')
        } else {
            return Promise.reject(new Error('失败'))
        }
    },

    //修改用户信息
    async updateUserInfo({ commit }, data) {
        const res = await reqUpdateUserInfo(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('失败'))
        }
    }

}
const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}