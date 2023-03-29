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
const Users = require('./user')

//创建模型
const Address = seq.define('address', {
    //id会自动创建
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人名字'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人手机号'
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人省市区'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人详细地址'
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为默认地址,不是:0(默认),是:1'
    },

}, {
    tableName: "address",
    timestamps: false
})

//用于创建表（强制同步数据库）
// Address.sync({ force: true })


Address.belongsTo(Users, {
    foreignKey: 'user_id',
    sourcekey: 'id',
    as: 'userInfo'
})

module.exports = Address