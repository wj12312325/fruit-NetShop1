// const path = require('path')

//引入统一错误处理
const { addCartError, getCartListError, addCartOverflowError, cartFormatError, illegalCartId, updateCartError, identityError, deleteCartError, selectCartAllOrNullError } = require('../constant/err')

//引入购物车service
const CartService = require('../service/cart')

class CartController {

    //添加购物车
    async addCart(ctx, next) {
        try {
            const user_id = ctx.state.user.id
            const { good_id, number, selected = true } = ctx.request.body
            const res = await CartService.addCart({ user_id, good_id, number, selected })
            if (res != '购物车总数超过商品数量' && res != false) {
                ctx.body = {
                    code: 200,
                    message: '添加购物车成功',
                    result: ''
                }
            } else if (res != "购物车总数超过商品数量") {
                console.error('添加购物车失败')
                return ctx.app.emit('error', addCartError, ctx)
            } else {
                console.error('添加购物车失败,购物车总数超过商品数量')
                return ctx.app.emit('error', addCartOverflowError, ctx)
            }
        } catch (error) {
            console.error('添加购物车失败', error)
            return ctx.app.emit('error', addCartError, ctx)

        }
    }

    //获取购物车列表(分页)
    async getCartList(ctx, next) {
        try {
            const { pageNum = 1, pageSize = 10, selected } = ctx.request.query
            const { user_id } = ctx.request.params
            const res = await CartService.getCartList(pageNum, pageSize, selected, user_id)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '购物车列表获取成功',
                    result: res
                }
            } else {
                console.error('购物车列表获取失败')
                return ctx.app.emit('error', getCartListError, ctx)
            }
        } catch (error) {
            console.error('购物车列表获取失败', error)
            return ctx.app.emit('error', getCartListError, ctx)
        }
    }

    //更新购物车
    async updateCart(ctx, next) {
        const user_id = ctx.state.user.id
        const { id } = ctx.request.params
        const { number, selected } = ctx.request.body
        if (number === undefined && selected === undefined) {
            console.error('number和selected不能同时未空')
            cartFormatError.message = 'number和selected不能同时未空'
            return ctx.app.emit("error", cartFormatError, ctx)
        }
        try {
            const res = await CartService.updateCart({ id, user_id, number, selected })
            if (res == '') {
                console.error('购物车id不合法')
                return ctx.app.emit("error", illegalCartId, ctx)
            } else if (res == '身份不正确,没有权限修改') {
                console.error('身份不正确,没有权限修改')
                return ctx.app.emit("error", identityError, ctx)
            } else if (res) {
                ctx.body = {
                    code: 200,
                    message: '购物车更新成功',
                    result: ''
                }
            } else {
                console.error('购物车更新失败')
                return ctx.app.emit("error", updateCartError, ctx)
            }
        } catch (error) {
            console.error('购物车更新失败', error)
            return ctx.app.emit("error", updateCartError, ctx)
        }
    }

    //删除购物车
    async deleteCart(ctx, next) {
        const { ids } = ctx.request.body

        try {
            const res = await CartService.deleteCart(ids)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '购物车删除成功',
                    result: res,
                }
            } else {
                console.error('购物车删除失败')
                return ctx.app.emit('error', deleteCartError, ctx)
            }
        } catch (error) {
            console.error('购物车删除失败', error)
            return ctx.app.emit('error', deleteCartError, ctx)
        }

    }

    //全选or全取消购物车
    async selectAllOrNull(ctx, next) {
        const user_id = ctx.state.user.id
        const selectState = ctx.request.body.selectState

        try {
            const res = await CartService.selectAllOrNull(user_id, selectState)
            if (res) {
                let message = selectState ? '全部选中成功' : "全部取消成功"
                ctx.body = {
                    code: 200,
                    message,
                    result: ''
                }
            } else {
                console.error('购物车选择状态失败')
                return ctx.app.emit('error', selectCartAllOrNullError, ctx)
            }
        } catch (error) {
            console.error('购物车选择状态失败', error)
            return ctx.app.emit('error', selectCartAllOrNullError, ctx)
        }
    }

}
module.exports = new CartController()