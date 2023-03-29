//引入二次封装的axios
import requests from './request'

//获取商品分类列表
export const reqGetCategoryList = () => requests({
    url: '/category/getCategoryList',
    method: 'get'
})

//获取商品搜索列表
export const reqGetSearchList1 = (params, category1Id) => requests({
    url: "/category/getGoodsSearchList",
    method: "post",
    params,
    data: { category1Id }
})

export const reqGetSearchList2 = (params, category2Id) => requests({
    url: "/category/getGoodsSearchList",
    method: "post",
    params,
    data: { category2Id }
})