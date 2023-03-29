//引入统一错误处理
const { orderFormatError } = require('../constant/err')


//校验购物车参数
const validator = (rules) => {
    return async(ctx, next) => {
        try {
            ctx.verifyParams(rules)

        } catch (error) {
            console.error(error)
            orderFormatError.result = error
            return ctx.app.emit('error', orderFormatError, ctx)
        }
        await next()
    }

}
module.exports = {
    validator
}