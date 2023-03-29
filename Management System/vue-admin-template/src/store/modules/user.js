import { login, logout, getInfo, reqGetUserList, reqAddUser, reqUpdateUser, reqDeleteUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { constantRoutes,anyRoutes,resetRouter, asyncRoutes } from '@/router'

import router from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        //用户列表
        userList: [],
        total: 0,
        resultAsyncRoutes:[],
        //合并后的路由
        resultAllRoutes:[],
        role:null
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = `http://localhost:8888/${avatar}`
    },
    GETUSERLIST(state, res) {
        state.userList = res.userList
        state.total = res.total
    },
    SET_ROLE(state,role){
        state.role=role
    }
    // SER_ASYNCROUTES(state,asyncRoutes){
        
    //     state.resultAsyncRoutes=asyncRoutes
    //     state.resultAllRoutes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    //     router.addRoutes(state.resultAllRoutes)
    //     console.log(router)
    // }
}

const computedAsyncRoutes=(asyncRoutes,routes)=>{
    return asyncRoutes.filter(item=>{
        if(routes.indexOf(item.children[0].name)!=-1){
            return true
        }
    })
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { phone, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ phone: phone.trim(), password: password, role: 0 }).then(response => {
                const { token } = response.result
                commit('SET_TOKEN', token)
                setToken(token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { result } = response

                if (!result) {
                    return reject('Verification failed, please Login again.')
                }

                const { name, user_img } = result

                commit('SET_NAME', name)
                commit('SET_AVATAR', user_img)
            // commit('SER_ASYNCROUTES',computedAsyncRoutes(asyncRoutes,result.routes))
            commit("SET_ROLE",result.role)

                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    //获取用户列表（分页）
    async getUserList({ commit }, info) {
        let { pageNum, pageSize, state, name, phone, role } = info
        const res = await reqGetUserList({ pageNum, pageSize, state }, { name, phone, role })
        if (res.code == 200) {
            commit('GETUSERLIST', res.result)

        } else {
            return new Promise.reject(res.message)
        }
    },

    //添加用户
    async addUser({ commit }, data) {
        const res = await reqAddUser(data)

        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    },
    //修改用户 
    async updateUser({ commit }, info) {
        const { id, ...data } = info
        const res = await reqUpdateUser(id, data)

        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    },
    //软删除用户 
    async deleteUser({ commit }, id) {
        const res = await reqDeleteUser(id)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}