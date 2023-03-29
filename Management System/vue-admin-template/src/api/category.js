import request from '@/utils/request'


//获取商品分类列表（分页）
export const reqGetCategoryList = () => request({
    url: '/category/getCategoryList',
    method: "get",
})

//获取商品分类搜索列表（分页）
export const reqGetCategorySearchList = (params, data) => request({
    url: '/category/getGoodsSearchList',
    method: "post",
    params,
    data
})

//添加商品分类
export const reqAddCategory = (data) => request({
    url: "/category/addCategory",
    method: "post",
    data
})

//修改商品分类
export const reqUpdateCategory = (id, data) => request({
    url: `/category/updateCategory/${id}`,
    method: "patch",
    data
})

//删除商品分类
export const reqDeleteCategory = (data) => request({
    url: `/category/deleteCategory`,
    method: 'delete',
    data
})