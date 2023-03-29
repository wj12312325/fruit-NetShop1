//引入sequelize中的数据类型
/*
sequelize 数据类型 model

DataTypes.STRING // VARCHAR(255)
DataTypes.STRING(1234) // VARCHAR(1234)
DataTypes.STRING.BINARY // VARCHAR BINARY
DataTypes.TEXT // TEXT
DataTypes.TEXT('tiny') // TINYTEXT
DataTypes.CITEXT // CITEXT 仅 PostgreSQL 和 SQLite.

*/
const { DataTypes } = require('sequelize')
    //引入seq实体对象
const seq = require('../db/seq')

//创建模型
const UserToken = seq.define('userToken', {
    //id会自动创建
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '手机号，唯一'
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'token'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        comment: '用户id,唯一'
    }

}, {
    tableName: "userToken",
    timestamps: false
})

//用于创建表（强制同步数据库）
// UserToken.sync({ alert: true })

module.exports = UserToken