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
const Address = require('./address')
const Users = require('./user')
    // const Goods = require('./good')

//创建模型
const Orders = seq.define('order', {
    //id会自动创建
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址id'
    },
    goods_id: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "订单商品id"
    },
    goods_number: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "订单商品的数量"
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "订单总金额"
    },
    order_number: {
        type: DataTypes.CHAR(16),
        allowNull: false,
        comment: "订单号"
    },
    order_remark: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "订单商品的备注"
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '订单状态(0:未支付,1:已支付,2:已发货,3:已签收,4:取消)'
    }

}, {
    tableName: "order"
})

//用于创建表（强制同步数据库）
// Orders.sync({ force: true })

Orders.belongsTo(Address, {
    foreignKey: 'address_id',
    sourcekey: 'id',
    as: 'addressInfo'
})
Orders.belongsTo(Users, {
    foreignKey: 'user_id',
    sourcekey: 'id',
    as: 'userInfo'
})


module.exports = Orders