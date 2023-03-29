//引入api接口
import { reqAddCart, reqDeleteCart, reqGetCartList, reqSelectAllorNull, reqUpdateCart } from '@/api/cart'

import store from '../index'
const state = {
    //购物车列表
    cartList: []

}
const mutations = {
    //获取购物车列表
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //添加购物车
    async addCart({ commit }, data) {
        const res = await reqAddCart(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    //获取购物车列表
    async getCartList({ commit }, { id, pageNum, pageSize, selected }) {
        let params = { pageNum, pageSize }
        selected && Object.assign(params, { selected })
        const res = await reqGetCartList(id, params)
        if (res.code == 200) {
            for (const e of res.result.result) {
                if (typeof e.goods_info.goods_img === 'string') {
                    e.goods_info.goods_img = e.goods_info.goods_img.split(",")
                }
            }
            commit('GETCARTLIST', res.result.result)
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    //更新购物车
    async updateCart({ commit }, cartInfo) {

        const { id, ...data } = cartInfo
        const res = await reqUpdateCart(id, data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    //删除购物车
    async deleteCart({ commit }, data) {
        const res = await reqDeleteCart(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))

        }
    },

    //全选or全取消购物车
    async selectAllorNull({ commit }, data) {
        const res = await reqSelectAllorNull(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
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