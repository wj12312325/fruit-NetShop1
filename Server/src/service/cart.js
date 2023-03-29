//引入Op
const { Op } = require('sequelize')

//引入购物车模型Cart  商品模型Goods
const Cart = require('../model/cart')
const Category = require('../model/category')
const Goods = require('../model/good')
    //购物车Service
class CartService {
    //添加购物车
    async addCart({ user_id, good_id, number, selected }) {
        const res = await Cart.findOne({
            where: {
                user_id,
                good_id
            }
        })
        if (res) {
            const allNumber = res.dataValues.number + number
            const GoodInfoRes = await Goods.findOne({
                where: { id: good_id }
            })
            if (allNumber > GoodInfoRes.dataValues.goods_num) {
                return '购物车总数超过商品数量'
            } else {
                const updateRes = await Cart.update({ number: allNumber }, {
                    where: { id: res.dataValues.id }
                })
                return updateRes[0] > 0
            }
        } else {
            const addRes = await Cart.create({ user_id, good_id, number, selected })
            return addRes.dataValues
        }
    }

    //获取购物车列表(分页)
    async getCartList(pageNum, pageSize, selected, user_id) {

        let whereOpt = { user_id }
            // if(selected=="true"){

        // }
        selected && Object.assign(whereOpt, { selected })
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'],
            offset,
            limit: pageSize * 1,
            where: whereOpt,
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['id', 'goods_name', 'goods_price', "goods_num", "goods_introduction", "goods_img"],
                include: {
                    model: Category,
                    as: 'secondaryCategory',
                    attributes: ['category_name', 'parent_id'],
                    include: {
                        model: Category,
                        as: 'oneCategory',
                        attributes: ['category_name'],
                    }
                }
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            result: rows
        }
    }

    //更新购物车
    async updateCart({ id, user_id, number, selected }) {

        const res = await Cart.findByPk(id)
        if (!res) return ''
        if (res.dataValues.user_id != user_id) {
            return '身份不正确,没有权限修改'
        }
        number !== undefined ? (res.number = number) : ''
        selected !== undefined ? (res.selected = selected) : ''

        return await res.save()
    }

    //删除购物车
    async deleteCart(ids) {
        return Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    //购物车全选or全取消
    async selectAllOrNull(user_id, selectState) {
        return Cart.update({ selected: selectState }, { where: { user_id } })
    }
}
module.exports = new CartService()