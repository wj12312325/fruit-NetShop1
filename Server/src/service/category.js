//引入Op
const { Op } = require("sequelize")
const seq = require('../db/seq')
    //引入商品分类模型 Category 商品模型Goods
const Category = require('../model/category')
const Goods = require('../model/good')

class CategoryService {
    //添加商品分类
    async addCategory(category_name, parent_id) {
        const res = await Category.create({
            category_name,
            parent_id
        })
        return res
    }

    //获取商品分类列表
    async getCategoryList() {
        // const whereOpt = { parent_id: 0 }
        const rows = await Category.findAll({
            where: { parent_id: 0 },
            include: {
                model: Category,
                as: 'secondaryCategory',
                attributes: ['id', "category_name", "parent_id"],
                include: {
                    model: Goods,
                    as: 'goodsList',
                    attributes: ['id', "goods_name", "goods_price", "goods_num", "goods_introduction", "goods_img"]
                }
            },
            order: [
                [{
                    model: Category,
                    as: 'secondaryCategory'
                }, 'id', 'ASC']
            ],

        })

        return rows
    }

    //更新商品分类 
    async updateCategory(id, category_name, parent_id) {

        const res = await Category.update({ category_name, parent_id }, { where: { id } })
        return res[0] > 0
    }

    //删除订单
    async deleteCategory(ids) {

        const resD = await Category.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
        return resD
    }

    //获取搜索商品列表通过商品分类id
    async getGoodsSearchList(pageNum, pageSize, { category1Id, category2Id }) {
        const whereOpt = {}
        category1Id && Object.assign(whereOpt, { id: category1Id })
        category2Id && Object.assign(whereOpt, { id: category2Id })
        const offset = (pageNum - 1) * pageSize
        if (category1Id) {
            const { count, rows } = await Goods.findAndCountAll({
                offset,
                limit: pageSize * 1,
                include: {
                    model: Category,
                    as: 'secondaryCategory',
                    attributes: ['id', "category_name", "parent_id"],
                    where: { parent_id: category1Id },
                    include: {
                        model: Category,
                        as: 'oneCategory',
                        attributes: ['category_name'],
                    }
                },
            })
            return {
                pageNum,
                pageSize,
                total: count,
                goodsList: rows
            }
        } else {
            const { count, rows } = await Goods.findAndCountAll({
                offset,
                limit: pageSize * 1,
                where: { goods_category_id: category2Id },
                // attributes: ['id', "goods_name", "goods_price", "goods_num", "goods_introduction", "goods_img"]
            })
            return {
                pageNum,
                pageSize,
                total: count,
                goodsList: rows
            }
        }


    }
}
module.exports = new CategoryService()