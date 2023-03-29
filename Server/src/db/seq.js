//引入sequelize
const Sequelize = require('sequelize')
    //引入数据库配置文件
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_PORT,
    MYSQL_DATABASE
} = require('../config/config.default')

//创建sequelize实例化对象
const seq = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    pool: { //数据库连接池
        max: 20, //最大连接对象的个数
        min: 5, //最小连接对象的个数
        idle: 1000 //最长等待时间，单位为毫秒
    },
    timezone: '+08:00'
})

//建立连接
// seq.authenticate().then(() => {
//     console.log('数据库连接成功！')
// }).catch((err) => {
//     console.log('数据库连接失败', err)
// })

module.exports = seq