//引入执行sql语句的函数
const { execSQL } = require('../db/mysql')

//用户登录
const login = (userData) => {
        const phone = userData.phone
        const password = userData.password

        let sql = `select * from users where phone=${phone} and password=${password}`

        return execSQL(sql).then(loginResult => {
            if (loginResult.length > 0) {
                return true
            } else {
                return false
            }
        })
    }
    //用户注册
const register = (userData) => {
    const name = userData.name
    const phone = userData.phone
    const password = userData.password

    //先查询判断手机号是否已存在
    let searchSql = `select * from users where phone=${phone}`

    return execSQL(searchSql).then(Result => {
        //若存在，直接退出
        if (Result.length > 0) {
            return Promise.resolve(false)
        } else { //若不存在，就新增用户
            let sql = `insert into users (name,phone,password) values('${name}','${phone}','${password}')`
            return execSQL(sql).then(registerResult => {
                if (registerResult.insertId) {
                    return true
                } else {
                    return false
                }
            })
        }
    })
}

module.exports = {
    login,
    register
}