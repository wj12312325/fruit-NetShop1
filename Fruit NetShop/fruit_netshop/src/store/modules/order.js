//引入api接口
import { reqAddOrder, reqDeleteOrder, reqGetOrderList, reqUpdateOrder } from '@/api/order'

const state = {

    //订单列表
    orderList: [],
    orderList1: [],
    //订单总数
    total: 0
}
const mutations = {
    //获取订单列表
    GETORDERLIST(state, data) {
        let { orderList, total } = data
        state.orderList = orderList
        state.total = total
    },
    GETORDERLIST1(state, data) {
        let { orderList, total } = data
        state.orderList1 = orderList
    }
}
const actions = {
    //获取订单列表
    async getOrderList({ commit }, params) {
        const res = await reqGetOrderList(params)
        if (res.code == 200) {
            for (const e of res.result.orderList) {
                for (let b of e.goods_info) {
                    if (typeof b.goods_img === 'string') {
                        b.goods_img = b.goods_img.split(",")
                    }
                }

            }
            commit('GETORDERLIST', res.result)
        }
    },
    async getOrderList1({ commit }, params) {
        const res = await reqGetOrderList(params)
        if (res.code == 200) {
            commit('GETORDERLIST1', res.result)

        }
    },

    //删除订单
    async deleteOrder({ commit }, data) {
        const res = await reqDeleteOrder(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return new Promise.reject(res.message)
        }

    },
    //生成订单
    async addOrder({ commit }, data) {
        const res = await reqAddOrder(data)
        if (res.code == 200) {
            return res.result.id
        } else {
            return new Promise.reject(res.message)
        }

    },
    //修改订单状态
    async updateOrder({ commit }, datainfo) {
        let { id, data } = datainfo
        const res = await reqUpdateOrder(id, data)
        if (res.code == 200) {
            return res.result.id
        } else {
            return new Promise.reject(res.message)
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