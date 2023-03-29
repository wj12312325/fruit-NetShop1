//引入Op
const { Op } = require("sequelize")
const Address = require("../model/address")
const Goods = require("../model/good")

//引入订单模型 Order
const Order = require('../model/order')
const Users = require("../model/user")

class OrderService {
    //提交订单
    async addOrder({ user_id, address_id, goods_id, total, order_number, goods_number, order_remark }) {
        let c = {
            user_id,
            address_id,
            goods_id,
            total,
            order_number,
            goods_number
        }
        if (order_remark) {
            c = {
                user_id,
                address_id,
                goods_id,
                total,
                order_number,
                goods_number,
                order_remark
            }
        }
        const res = await Order.create(c)
        return res
    }

    //获取订单列表（分页）
    async getOrderList(pageNum, pageSize, { user_id, status }) {
        let whereOpt = { user_id }
        status && Object.assign(whereOpt, { status: status * 1 })

        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Order.findAndCountAll({
            offset,
            limit: pageSize * 1,
            where: whereOpt,
            include: {
                model: Address,
                as: 'addressInfo',
                attributes: ['consignee'],
            },
            order: [
                ['createdAt', 'DESC']
            ],

        })

        let goods_id = []
        let goods_number = []
        for (const item of rows) {
            item.dataValues.goods_info = []
            goods_id = item.dataValues.goods_id.split(',')
            goods_number = item.dataValues.goods_number.split(',')
            for (const index in goods_id) {
                const res = await Goods.findByPk(goods_id[index] * 1)
                res.dataValues.number = goods_number[index]
                item.dataValues.goods_info.push(res)

            }
        }

        return {
            pageNum,
            pageSize,
            total: count,
            orderList: rows
        }
    }

    //更新订单状态 
    async updateOrder(id, status) {

        const res = await Order.update({ status }, { where: { id } })
        return res[0] > 0
    }

    //删除订单
    async deleteOrder(ids) {

        const res = await Order.findAll({
            where: {
                id: {
                    [Op.in]: ids
                },
            }
        })

        for (let item of res) {

            if (item.dataValues.status === 1 || item.dataValues.status === 2) {
                return `订单号为:${item.dataValues.order_number}的订单当前状态不能删除`
            }
        }

        const resD = await Order.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
        return resD
    }

    //获取订单列表（分页）
    async getOrderSearchList({ pageNum, pageSize }, {
        order_number,
        status,
        user_id
    }) {
        let whereOpt = {}
        user_id && Object.assign(whereOpt, { user_id })
        if (status !== undefined) {
            Object.assign(whereOpt, { status })
        }
        order_number && Object.assign(whereOpt, {
            order_number: {
                [Op.like]: `%${order_number}%`
            }
        })
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Order.findAndCountAll({
            offset,
            limit: pageSize * 1,
            where: whereOpt,
            include: [{
                    model: Address,
                    as: 'addressInfo',
                    attributes: ['consignee'],
                },
                {
                    model: Users,
                    as: 'userInfo',
                    attributes: ['name'],
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        })

        let goods_id = []
        let goods_number = []
        for (const item of rows) {
            item.dataValues.goods_info = []
            goods_id = item.dataValues.goods_id.split(',')
            goods_number = item.dataValues.goods_number.split(',')
            for (const index in goods_id) {
                const res = await Goods.findByPk(goods_id[index] * 1)
                res.dataValues.number = goods_number[index]
                item.dataValues.goods_info.push(res)

            }
        }
        return {
            pageNum,
            pageSize,
            total: count,
            orderList: rows
        }
    }
}
module.exports = new OrderService()