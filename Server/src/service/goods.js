//引入Op
const { Op } = require("sequelize")
    //引入是商品模型Goods 商品分类模型Category
const Goods = require('../model/good')
const Category = require('../model/category')

class GoodsService {
    //商品添加
    async addGoods(goods) {
        const { goods_name, goods_price, goods_num, goods_introduction, goods_category_id, goods_img } = goods

        const resGoods = await Goods.create({
            goods_name,
            goods_price,
            goods_num,
            goods_introduction,
            goods_category_id,
            goods_img
        })
        return resGoods
    }

    //商品信息修改
    async updateGoods(id, goods) {
        const { goods_name, goods_price, goods_num, goods_introduction, goods_category_id, goods_img } = goods
        const goodsInfo = {}
        goods_name && Object.assign(goodsInfo, { goods_name })
        goods_price && Object.assign(goodsInfo, { goods_price })
        goods_num && Object.assign(goodsInfo, { goods_num })
        goods_introduction && Object.assign(goodsInfo, { goods_introduction })
        goods_category_id && Object.assign(goodsInfo, { goods_category_id })
        goods_img && Object.assign(goodsInfo, { goods_img })
        const resGoods = await Goods.update(goodsInfo, {
            where: { id }
        })

        return resGoods[0] > 0
    }

    //商品上架与下架
    async updateGoodsStatus(id, goods_state) {
        if (goods_state === 0 || goods_state === 1) {
            const res = await Goods.update({ goods_state }, {
                where: { id }
            })
            return res[0] > 0

        } else {
            console.error('商品状态修改错误', goods_state)
            return false
        }
    }

    //获取商品列表(分页)
    async getGoodsList(pageNum, pageSize, goods_state) {
        let whereOpt = {}
        if (goods_state !== undefined) {
            whereOpt = { goods_state }
        }
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Goods.findAndCountAll({
            offset,
            limit: pageSize * 1,
            where: whereOpt,
            include: {
                model: Category,
                as: 'secondaryCategory',
                attributes: ['category_name', 'id', 'parent_id'],
                include: {
                    model: Category,
                    as: 'oneCategory',
                    attributes: ['category_name', 'id'],
                }
            }
        })

        return {
            pageNum,
            pageSize,
            total: count,
            goodsList: rows
        }
    }

    //搜索商品信息(分页)
    async selectGoods(pageNum, pageSize, goods_state, { id, goods_name, goods_category_id }) {

        let whereOpt = {}
        id && Object.assign(whereOpt, { id })
        goods_category_id && Object.assign(whereOpt, { goods_category_id })
        if (goods_state !== undefined) {
            Object.assign(whereOpt, { goods_state })
        }
        if (goods_name) {
            Object.assign(whereOpt, {
                goods_name: {
                    [Op.like]: `%${goods_name}%`
                }
            })

        } else if (goods_name === undefined && id === undefined && goods_category_id === undefined && goods_state === undefined) {
            whereOpt = {}
        }

        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Goods.findAndCountAll({
            offset,
            limit: pageSize * 1,
            where: whereOpt,
            include: {
                model: Category,
                as: 'secondaryCategory',
                attributes: ['category_name', 'parent_id', 'id'],
                include: {
                    model: Category,
                    as: 'oneCategory',
                    attributes: ['category_name', 'id'],
                }
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            goodsList: rows
        }
    }

    //删除商品
    async deleteGoods(ids) {

        const resD = await Goods.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
        return resD
    }

}

module.exports = new GoodsService