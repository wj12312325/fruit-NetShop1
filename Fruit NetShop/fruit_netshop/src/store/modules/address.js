//引入api接口
import { reqAddAddress, reqDeleteAddress, reqGetAddressList, reqUpdateAddress } from '@/api/address'

const state = {
    //地址列表
    addressList: [],
    //总数
    total: 0


}
const mutations = {
    //获取地址列表
    GETADDRESSLIST(state, data) {
        let { addressList, total } = data
        state.addressList = addressList
        state.total = total
    },
}
const actions = {
    //获取地址列表
    async getAddressList({ commit }, info) {
        let { pageNum, pageSize, user_id, consignee, phone } = info
        const res = await reqGetAddressList({ pageNum, pageSize }, { user_id, consignee, phone })
        if (res.code == 200) {
            for (const item of res.result.addressList) {
                item.area = item.area.split(",")
                item.selected = false
                if (item.is_default) {
                    item.selected = true
                }
                item.fullAddress = `${item.area[0]} ${item.area[1]} ${item.area[2]} ${item.address}`
            }
            commit('GETADDRESSLIST', res.result)
        }
    },


    //添加地址
    async addAddress({ commit }, data) {
        const res = await reqAddAddress(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },

    //修改地址
    async updateAddress({ commit }, { id, data }) {
        const res = await reqUpdateAddress(id, data)
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