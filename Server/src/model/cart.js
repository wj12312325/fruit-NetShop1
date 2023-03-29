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
const Goods = require('../model/good')
const { DataTypes } = require('sequelize')
    //引入seq实体对象
const seq = require('../db/seq')

//创建模型
const Cart = seq.define('cart', {
    //id会自动创建
    good_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '商品是否选中'
    },


}, {
    tableName: "cart",
    timestamps: false
})

//用于创建表（强制同步数据库）
// Cart.sync({ force: true })
//一对一关系
Cart.belongsTo(Goods, {
    foreignKey: 'good_id',
    as: 'goods_info'
})

module.exports = Cart