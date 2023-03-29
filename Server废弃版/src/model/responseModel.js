//基础响应模型
class BaseModel {
    //构造器
    constructor(data, message) {
        //判断数据类型是否为字符串
        if (typeof data === "string") {
            this.message = data
            data = null
            message = null
        }
        //如果有数据
        if (data) {
            this.data = data
        }
        ///如果有信息
        if (message) {
            this.message = message
        }
    }
}

//成功响应模型
class SuccessModel extends BaseModel {
    constructor(data, message) {
        //继承父类
        super(data, message)
        this.code = 200
    }
}

//失败响应模型
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 500
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}