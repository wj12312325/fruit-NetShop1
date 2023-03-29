const path = require('path')

//引入统一错误处理
const { fileUploadError, unSupportFileType, addGoodsError, goodsUpdateInfoError, goodsListSelectError, goodsSelectError, deleteGoodsError } = require('../constant/err')
    //引入商品service
const GoodsService = require('../service/goods')
class GoodsController {
    //图片上传
    async upload(ctx, next) {

        const { file } = ctx.request.files
        const fileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportFileType, ctx)
            }
            ctx.body = {
                code: 200,
                message: '图片上传成功',
                result: {
                    goodsImg: path.basename(file.filepath)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }

    //商品上传
    async addGoods(ctx, next) {
        try {
            const res = await GoodsService.addGoods(ctx.request.body)
            ctx.body = {
                code: 200,
                message: '商品添加成功',
                result: res
            }
        } catch (error) {
            console.error(error)
            return ctx.app.emit('error', addGoodsError, ctx)
        }
    }

    //修改商品信息
    async updateGoods(ctx, next) {
        try {
            const { id } = ctx.request.params
            const goods = ctx.request.body
            const res = await GoodsService.updateGoods(id, goods)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '商品信息修改成功',
                    result: ''
                }
            } else {
                console.error('商品修改失败')
            }
        } catch (error) {
            console.error('商品修改失败', error)
            return ctx.app.emit('error', goodsUpdateInfoError, ctx)

        }
    }

    //上架与下架商品
    async updateGoodsStatus(ctx, next) {
        try {
            const { id } = ctx.request.params
            const { goods_state } = ctx.request.body
            const res = await GoodsService.updateGoodsStatus(id, goods_state)
            if (res) {
                const message = goods_state === 1 ? '商品上架成功' : "商品下架成功"
                ctx.body = {
                    code: 200,
                    message,
                    result: ''
                }
            } else {
                console.error('商品状态修改失败')
                return ctx.app.emit('error', goodsUpdateInfoError, ctx)
            }
        } catch (error) {
            console.error('商品状态修改失败', error)
            return ctx.app.emit('error', goodsUpdateInfoError, ctx)

        }
    }

    //获取(分页)商品列表
    async getGoodsList(ctx, next) {
        try {
            const { pageNum = 1, pageSize = 10, goods_state } = ctx.request.query
            const res = await GoodsService.getGoodsList(pageNum, pageSize, goods_state)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '商品列表获取成功',
                    result: res
                }
            } else {
                console.error('商品列表查询失败')
                return ctx.app.emit('error', goodsListSelectError, ctx)
            }
        } catch (error) {
            console.error('商品列表查询失败', error)
            return ctx.app.emit('error', goodsListSelectError, ctx)
        }

    }


    //搜索商品信息（分页）
    async selectGoods(ctx, next) {
        const { pageNum = 1, pageSize = 10, goods_state } = ctx.request.query
        const { id, goods_name, goods_category_id } = ctx.request.body
        try {
            const res = await GoodsService.selectGoods(pageNum, pageSize, goods_state, { id, goods_name, goods_category_id })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '搜索商品成功',
                    result: res
                }
            } else {
                console.error('搜索商品失败')
                return ctx.app.emit('error', goodsSelectError, ctx)
            }
        } catch (error) {
            console.error('搜索商品失败', error)
            return ctx.app.emit('error', goodsSelectError, ctx)
        }

    }

    //删除商品
    async deleteGoods(ctx, next) {
        const { ids } = ctx.request.body
        try {
            const res = await GoodsService.deleteGoods(ids)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: "商品删除成功",
                    result: ""
                }
            } else {
                console.error('商品删除失败')
                return ctx.app.emit("error", deleteGoodsError, ctx)
            }
        } catch (error) {
            console.error('商品分类删除失败', error)
            return ctx.app.emit("error", deleteGoodsError, ctx)
        }
    }

}
module.exports = new GoodsController()