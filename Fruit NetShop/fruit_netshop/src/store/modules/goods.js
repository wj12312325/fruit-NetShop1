//引入api接口
import { reqGetGoodsList, reqGetSearchList,reqUpdateGoods } from '@/api/goods'

const state = {
    //商品分类列表
    goodsList: [],
    //获取商品搜索列表
    searchList: [],
    //搜索商品总数
    total: 0,
    //商品详细信息
    goodsInfo: {}
}
const mutations = {
    //获取商品分类列表
    GETGOODSLIST(state, goodsList) {
        state.goodsList = goodsList
    },
    //获取商品搜索列表
    GETSEARCHLIST(state, data) {
        state.searchList = data.goodsList
        state.total = data.total
    },
    //获取商品详细信息
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }

}
const actions = {
    //获取商品列表
    async getGoodsList({ commit }, data) {
        const res = await reqGetGoodsList(data)
        if (res.code == 200) {
            for (const e of res.result.goodsList) {
                if (typeof e.goods_img === 'string') {
                    e.goods_img = e.goods_img.split(",")
                }
            }
            commit('GETGOODSLIST', res.result.goodsList)
            return res
        } else {
            return new Promise.reject(res.message)
        }
    },
    //获取搜索商品列表
    async getSearchList({ commit }, { pageNum, pageSize, goodsId, goods_name }) {
        let params = { pageNum, pageSize }
        let data = {}
        if (goods_name) {
            data = { goods_name }
        } else if (goodsId) {
            data = { id: goodsId * 1 }
        } else {
            data = {}
        }
        const res = await reqGetSearchList(params, data)
        if (res.code == 200) {
            for (const e of res.result.goodsList) {
                if (typeof e.goods_img === 'string') {
                    e.goods_img = e.goods_img.split(",")
                }
            }
            commit('GETSEARCHLIST', res.result)
            commit('GETGOODSINFO', res.result.goodsList[0])
            return true
        } else {
            return new Promise.reject(res.message)
        }

    },

     //修改商品
     async updateGoods({ commit }, info) {
        const { id, ...data } = info
        const res = await reqUpdateGoods(id, data)

        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    },

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