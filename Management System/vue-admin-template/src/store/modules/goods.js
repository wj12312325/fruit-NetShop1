import { reqGetCategorySearchList } from '@/api/category'
import { reqAddGoods, reqDeleteGoods, reqGetGoodsList, reqUpdateGoods, reqUpdateGoodsStatus } from '@/api/goods'

const state = {
    //商品列表
    goodsList: [],
    total: 0
}

const mutations = {

    GETGOODSLIST(state, res) {
        state.goodsList = res.goodsList
        state.total = res.total
    },
    GETCATEGORYSEARCHLIST(state, res) {
        state.goodsList = res.goodsList
        state.total = res.total
    },
}

const actions = {
    //获商品列表（分页）
    async getGoodsList({ commit }, info) {
        let { pageNum, pageSize, goods_state, goods_name, goods_category_id } = info
        const res = await reqGetGoodsList({ pageNum, pageSize, goods_state }, { goods_name, goods_category_id })
        if (res.code == 200) {
            for (let i of res.result.goodsList) {
                i.goods_img = i.goods_img.split(",")
            }
            commit('GETGOODSLIST', res.result)
        } else {
            return new Promise.reject(res.message)
        }
    },

    //获取商品分类搜索列表（分页）
    async getCategorySearchList({ commit }, info) {
        let { pageNum, pageSize, category1Id, category2Id } = info
        const res = await reqGetCategorySearchList({ pageNum, pageSize }, { category1Id, category2Id })
        if (res.code == 200) {
            commit('GETCATEGORYSEARCHLIST', res.result)
        } else {
            return new Promise.reject(res.message)
        }
    },

    //添加商品
    async addGoods({ commit }, data) {
        const res = await reqAddGoods(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
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

    //修改商品状态（上架与下架）
    async updateGoodsStatus({ commit }, info) {
        const { id, ...data } = info
        const res = await reqUpdateGoodsStatus(id, data)

        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    },

    //删除商品
    async deleteGoods({ commit }, data) {
        const res = await reqDeleteGoods(data)
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