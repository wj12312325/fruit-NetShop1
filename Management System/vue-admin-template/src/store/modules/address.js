import { reqGetAddressList, reqUpdateAddress, reqDeleteAddress, reqAddAddress } from "@/api/address"

const state = {
    //地址列表
    addressList: [],
    total: 0
}

const mutations = {
    GETADDRESSLIST(state, data) {
        state.addressList = data.addressList
        state.total = data.total
    }
}

const actions = {


    //获取用户列表（分页）
    async getAddressList({ commit }, info) {
        let { pageNum, pageSize, user_id, consignee, phone } = info
        const res = await reqGetAddressList({ pageNum, pageSize }, { user_id, consignee, phone })

        if (res.code == 200) {
            for (const item of res.result.addressList) {
                item.area = item.area.split(",")
                if (item.is_default) {}
            }
            commit('GETADDRESSLIST', res.result)
        } else {
            return new Promise.reject(res.message)
        }
    },

    //修改地址
    async updateAddress({ commit }, { id, user_id, data }) {
        const res = await reqUpdateAddress(id, user_id, data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }

    },
    //删除地址
    async deleteAddress({ commit }, data) {
        const res = await reqDeleteAddress(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return new Promise.reject(res.message)
        }

    },
    //添加地址
    async addAddress({ commit }, { user_id, data }) {
        const res = await reqAddAddress(user_id, data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}