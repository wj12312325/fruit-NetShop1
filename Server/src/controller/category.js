//引入商品分类Service
const CategoryService = require('../service/category')

//引入统一错误集合
const { addCategoryError, getCategoryListError, updateCategoryError, deleteCategoryError, getGoodsSearchListError, getGoodsSearchListFormatError } = require("../constant/err")

class CategoryController {

    //添加商品分类
    async addCategory(ctx, next) {
        const { category_name, parent_id } = ctx.request.body
        try {
            const res = await CategoryService.addCategory(category_name, parent_id)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '添加商品分类成功',
                    result: res
                }
            } else {
                console.error('添加商品分类失败')
                return ctx.app.emit('error', addCategoryError, ctx)
            }
        } catch (error) {
            console.error('添加商品分类失败', error)
            return ctx.app.emit('error', addCategoryError, ctx)
        }
    }

    //获取商品分类列表
    async getCategoryList(ctx, next) {
        try {
            const res = await CategoryService.getCategoryList()

            if (res) {
                ctx.body = {
                    code: 200,
                    message: '商品分类列表获取成功',
                    result: res
                }
            } else {
                console.error('商品分类列表获取失败')
                return ctx.app.emit('error', getCategoryListError, ctx)
            }
        } catch (error) {
            console.error('商品分类列表获取失败', error)
            return ctx.app.emit('error', getCategoryListError, ctx)
        }
    }

    //更新商品分类
    async updateCategory(ctx, next) {
        const id = ctx.request.params.id
        const { category_name, parent_id } = ctx.request.body

        try {
            const res = await CategoryService.updateCategory(id, category_name, parent_id)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '商品分类更新成功',
                    result: ''
                }
            } else {
                console.error('商品分类更新失败')
                return ctx.app.emit("error", updateCategoryError, ctx)
            }
        } catch (error) {
            console.error('商品分类更新失败', error)
            return ctx.app.emit("error", updateCategoryError, ctx)
        }
    }

    //删除商品分类
    async deleteCategory(ctx, next) {
        const { ids } = ctx.request.body
        try {
            const res = await CategoryService.deleteCategory(ids)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: "商品分类删除成功",
                    result: ""
                }
            } else {
                console.error('商品分类删除失败')
                return ctx.app.emit("error", deleteCategoryError, ctx)
            }
        } catch (error) {
            console.error('商品分类删除失败', error)
            return ctx.app.emit("error", deleteCategoryError, ctx)
        }
    }

    //获取搜索列表通过商品分类id
    async getGoodsSearchList(ctx, next) {
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const { category1Id, category2Id } = ctx.request.body
        console.log("5555", category1Id, category2Id)
        if (category1Id && category2Id) {
            console.error('搜索商品失败，参数格式错误')
            return ctx.app.emit('error', getGoodsSearchListFormatError, ctx)
        }
        try {
            const res = await CategoryService.getGoodsSearchList(pageNum, pageSize, { category1Id, category2Id })

            if (res) {
                ctx.body = {
                    code: 200,
                    message: '搜索商品成功',
                    result: res
                }
            } else {
                console.error('搜索商品失败')
                return ctx.app.emit('error', getGoodsSearchListError, ctx)
            }
        } catch (error) {
            console.error('搜索商品失败', error)
            return ctx.app.emit('error', getGoodsSearchListError, ctx)
        }
    }
}

module.exports = new CategoryController()