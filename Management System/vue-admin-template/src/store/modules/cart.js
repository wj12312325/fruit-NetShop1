import { reqDeleteCart, reqGetCartList } from "@/api/cart"

const state = {
    //商品列表
    cartList: [],
    total: 0
}

const mutations = {

    GETCARTLIST(state, res) {
        state.cartList = res.result
        state.total = res.total
    },
    GETCATEGORYSEARCHLIST(state, res) {
        state.goodsList = res.goodsList
        state.total = res.total
    },
}

const actions = {
    //获商品列表（分页）
    async getCartList({ commit }, info) {
        let { pageNum, pageSize, user_id } = info
        const res = await reqGetCartList(user_id, { pageNum, pageSize })
        if (res.code == 200) {
            for (let i of res.result.result) {
                i.goods_info.goods_img = i.goods_info.goods_img.split(",")
            }
            commit('GETCARTLIST', res.result)
        } else {
            return new Promise.reject(res.message)
        }
    },
    //删除购物车
    async deleteCart({ commit }, data) {
        const res = await reqDeleteCart(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(res.message)
        }
    }

    // //获取商品分类搜索列表（分页）
    // async getCategorySearchList({ commit }, info) {
    //     let { pageNum, pageSize, category1Id, category2Id } = info
    //     const res = await reqGetCategorySearchList({ pageNum, pageSize }, { category1Id, category2Id })
    //     if (res.code == 200) {
    //         commit('GETCATEGORYSEARCHLIST', res.result)
    //     } else {
    //         return new Promise.reject(res.message)
    //     }
    // },

    // //添加商品
    // async addGoods({ commit }, data) {
    //     const res = await reqAddGoods(data)
    //     if (res.code == 200) {
    //         return 'ok'
    //     } else {
    //         return Promise.reject(res.message)
    //     }
    // },
    // //修改商品
    // async updateGoods({ commit }, info) {
    //     const { id, ...data } = info
    //     const res = await reqUpdateGoods(id, data)

    //     if (res.code == 200) {
    //         return 'ok'
    //     } else {
    //         return Promise.reject(res.message)
    //     }
    // },

    // //修改商品状态（上架与下架）
    // async updateGoodsStatus({ commit }, info) {
    //     const { id, ...data } = info
    //     const res = await reqUpdateGoodsStatus(id, data)

    //     if (res.code == 200) {
    //         return 'ok'
    //     } else {
    //         return Promise.reject(res.message)
    //     }
    // },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}