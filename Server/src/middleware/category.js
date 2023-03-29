//引入统一错误处理
const { categoryFormatError } = require('../constant/err')


//校验购物车参数
const validator = (rules) => {
    return async(ctx, next) => {
        try {
            ctx.verifyParams(rules)

        } catch (error) {
            console.error(error)
            categoryFormatError.result = error
            return ctx.app.emit('error', categoryFormatError, ctx)
        }
        await next()
    }

}
module.exports = {
    validator
}