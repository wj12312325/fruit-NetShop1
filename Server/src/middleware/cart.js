//引入统一错误处理
const { cartFormatError, invalidGoodsId } = require('../constant/err')

//引入商品模型Goods
const Goods = require('../model/good')

//校验购物车参数
const validator = (rules) => {
        return async(ctx, next) => {
            try {

                ctx.verifyParams(rules)

            } catch (error) {
                console.error(error)
                cartFormatError.result = error
                return ctx.app.emit('error', cartFormatError, ctx)
            }
            await next()
        }

    }
    //校验商品id是否合理
const validateGoodsID = async(ctx, next) => {

    const { good_id } = ctx.request.body
    const res = await Goods.findOne({
        where: { id: good_id }
    })
    if (res.dataValues.goods_state) {
        await next()
    } else {
        console.error('无效的商品id')
        return ctx.app.emit('error', invalidGoodsId, ctx)
    }
}

module.exports = {
    validator,
    validateGoodsID
}