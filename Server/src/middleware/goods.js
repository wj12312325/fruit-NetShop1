//引入统一错误处理
const { goodsFormatError } = require('../constant/err')

//效验商品信息
const validator = (rules) => {
    return async(ctx, next) => {
        try {
            ctx.verifyParams(rules)

        } catch (error) {
            console.error(error)
            goodsFormatError.result = error
            return ctx.app.emit('error', goodsFormatError, ctx)
        }
        await next()
    }

}

module.exports = {
    validator
}