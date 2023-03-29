//统一错误处理函数
module.exports = (err, ctx) => {
    let status = 500
    switch (err.code) {
        case '10001':
            status = 400
            break
        case "10002":
            status = 409
            break
            // case "10006":
            //     status = 409
            //     break
        default:
            status = 500
    }
    ctx.status = status
    ctx.body = err
}