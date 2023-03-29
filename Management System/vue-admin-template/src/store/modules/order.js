import { reqDeleteOrder, reqGetOrderList, reqUpdateOrder } from "@/api/order"


const state = {
    //订单列表
    orderList: [],
    total: 0
}

const mutations = {
    GETORDERLIST(state, data) {
        state.orderList = data.orderList
        state.total = data.total
    }
}

const actions = {


    //获取订单列表（分页）
    async getOrderList({ commit }, info) {
        let { pageNum, pageSize, user_id, order_number, status } = info
        const res = await reqGetOrderList({ pageNum, pageSize }, { user_id, order_number, status })

        if (res.code == 200) {
            for (const e of res.result.orderList) {
                for (let b of e.goods_info) {
                    if (typeof b.goods_img === 'string') {
                        b.goods_img = b.goods_img.split(",")
                    }
                }

            }
            commit('GETORDERLIST', res.result)
        } else {
            return new Promise.reject(res.message)
        }
    },

    //修改订单状态
    async updateOrder({ commit }, { id, data }) {
        const res = await reqUpdateOrder(id, data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}