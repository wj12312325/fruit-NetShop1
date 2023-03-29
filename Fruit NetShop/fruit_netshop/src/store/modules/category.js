//引入api接口
import { reqGetCategoryList, reqGetSearchList1, reqGetSearchList2 } from '@/api/category'

const state = {
    //商品分类列表
    categoryList: [],
    //商品搜索列表
    searchList: [],
    //搜索商品总数
    total: 0
}
const mutations = {
    //获取商品分类列表
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    //获取商品搜索列表
    async GETSEARCHLIST(state, data) {
        state.searchList = data.goodsList
        state.total = data.total
    }
}
const actions = {
    //获取商品分类列表
    async getCategoryList({ commit }) {
        const res = await reqGetCategoryList()
        if (res.code == 200) {
            commit('GETCATEGORYLIST', res.result)
        }
    },



    //获取商品搜索列表 
    async getSearchListBy1Id({ commit }, { pageNum, pageSize, category1Id }) {
        let params = { pageNum, pageSize }
        const res = await reqGetSearchList1(params, category1Id * 1)
        if (res.code == 200) {
            for (const e of res.result.goodsList) {
                if (typeof e.goods_img === 'string') {
                    e.goods_img = e.goods_img.split(",")
                }
            }
            commit('GETSEARCHLIST', res.result)
            return true
        } else {
            return new Promise.reject(res.message)
        }
    },
    async getSearchListBy2Id({ commit }, { pageNum, pageSize, category2Id }) {
        let params = { pageNum, pageSize }
        const res = await reqGetSearchList2(params, category2Id * 1)
        if (res.code == 200) {
            for (const e of res.result.goodsList) {
                if (typeof e.goods_img === 'string') {
                    e.goods_img = e.goods_img.split(",")
                }
            }
            commit('GETSEARCHLIST', res.result)
            return true
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