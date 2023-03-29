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
const Users = seq.define('users', {
    //id会自动创建
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '手机号，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
    },
    role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: "角色,0:游客(默认),1:管理员"
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        comment: "状态,1:存在(默认),0:不存在"
    },
    user_img: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "用户头像"
    }

}, {
    tableName: "users",
    timestamps: false
})

//用于创建表（强制同步数据库）
// Users.sync({ alert: true })

module.exports = Users