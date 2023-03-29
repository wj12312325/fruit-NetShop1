const mysql = require('mysql')

//引入数据库配置文件
const { MYSQL_CONFIG } = require('../config/db')

//创建数据库连接池
const pool = mysql.createPool(MYSQL_CONFIG)

// //连接数据库
// connection.connect()

//执行sql语句的函数
function execSQL(sql) {
    const promise = new Promise((resolve, reject) => {
        //执行sql语句
        pool.query(sql, (err, result) => {
            //如果报错，自己退出
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })

    return promise
}

module.exports = {
    execSQL
}