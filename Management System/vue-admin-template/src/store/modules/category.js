import { reqAddCategory, reqDeleteCategory, reqGetCategoryList, reqGetCategorySearchList, reqUpdateCategory } from '@/api/category'

const state = {
    //商品列表
    goodsList: [],
    total: 0,
    //商品分类列表1
    category1List: [],
    category2List: [],
    goodsSelectList: [],
}

const mutations = {

    GETCATEGORYSEARCHLIST(state, res) {
        state.goodsList = res.goodsList
        state.total = res.total
    },
    GETCATEGORYLIST(state, categoryList) {
        state.category1List = categoryList
        state.category2List = []
        for (let item of state.category1List) {
            state.category2List.push.apply(state.category2List, item.secondaryCategory)
        }

    }
}

const actions = {
    //获商品分类列表（分页）
    async getCategoryList({ commit }) {
        const res = await reqGetCategoryList()
        if (res.code == 200) {
            commit('GETCATEGORYLIST', res.result)
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

    //添加商品分类
    async addCategory({ commit }, data) {
        const res = await reqAddCategory(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    },
    //修改商品分类 
    async updateCategory({ commit }, info) {
        const { id, ...data } = info
        const res = await reqUpdateCategory(id, data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    },
    //删除商品分类
    async deleteCategory({ commit }, data) {
        const res = await reqDeleteCategory(data)
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