//引入订单Service
const OrderService = require('../service/order')

//引入统一错误集合
const { addOrderError, getOrderListError, updateOrderError, deleteOrderError, deleteOrderSatatusError } = require("../constant/err")

class OrderController {

    //提交订单
    async addOrder(ctx, next) {
        const user_id = ctx.state.user.id
        const { address_id, goods_id, goods_number, total, order_remark } = ctx.request.body

        const order_number = "FNS" + Date.now()

        try {
            const res = await OrderService.addOrder({ user_id, address_id, goods_id, total, order_number, goods_number, order_remark })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '生成订单成功',
                    result: res
                }
            } else {
                console.error('生成订单失败')
                return ctx.app.emit('error', addOrderError, ctx)
            }
        } catch (error) {
            console.error('生成订单失败', error)
            return ctx.app.emit('error', addOrderError, ctx)
        }
    }

    //获取订单列表(分页)
    async getOrderList(ctx, next) {
        const { pageNum, pageSize, status } = ctx.request.query
        const user_id = ctx.state.user.id

        try {
            const res = await OrderService.getOrderList(pageNum, pageSize, { user_id, status })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '订单列表获取成功',
                    result: res
                }
            } else {
                console.error('订单列表获取失败')
                return ctx.app.emit("error", getOrderListError, ctx)
            }
        } catch (error) {
            console.error('订单列表获取失败', error)
            return ctx.app.emit("error", getOrderListError, ctx)
        }
    }

    //更新订单状态
    async updateOrder(ctx, next) {
        const id = ctx.request.params.id
        const { status } = ctx.request.body

        try {
            const res = await OrderService.updateOrder(id, status)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '订单状态更新成功',
                    result: ''
                }
            } else {
                console.error('订单状态更新失败')
                return ctx.app.emit("error", updateOrderError, ctx)
            }
        } catch (error) {
            console.error('订单状态更新失败', error)
            return ctx.app.emit("error", updateOrderError, ctx)
        }
    }

    //删除订单
    async deleteOrder(ctx, next) {
        const { ids } = ctx.request.body
        try {
            const res = await OrderService.deleteOrder(ids)
            if (typeof(res) === 'string' && res.indexOf('状态不能删除') !== -1) {
                console.error('订单当前状态不能删除')
                deleteOrderSatatusError.result = res
                return ctx.app.emit("error", deleteOrderSatatusError, ctx)
            } else if (res) {
                ctx.body = {
                    code: 200,
                    message: "订单删除成功",
                    result: ""
                }
            } else {
                console.error('订单删除失败')
                return ctx.app.emit("error", deleteOrderError, ctx)
            }
        } catch (error) {
            console.error('地址删除失败', error)
            return ctx.app.emit("error", deleteOrderError, ctx)
        }
    }

    //获取订单列表（分页）
    async getOrderSearchList(ctx, next) {
        const { pageNum, pageSize } = ctx.request.query
        const {
            order_number,
            status,
            user_id

        } = ctx.request.body
        try {
            const res = await OrderService.getOrderSearchList({ pageNum, pageSize }, {
                order_number,
                status,
                user_id
            })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '订单获取成功',
                    result: res
                }
            } else {
                console.error('订单列表获取失败')
                return ctx.app.emit("error", getOrderListError, ctx)
            }
        } catch (error) {
            console.error('订单列表获取失败', error)
            return ctx.app.emit("error", getOrderListError, ctx)
        }
    }
}

module.exports = new OrderController()