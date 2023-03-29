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
const Category = require('../model/category')
    // const Category = require('../model/category')

//创建模型
const Goods = seq.define('goods', {
    //id会自动创建
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品数量'
    },
    goods_introduction: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品简介'
    },
    goods_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品分类ID'
    },
    goods_img: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '商品图片'
    },
    goods_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        comment: "商品状态,1:存在(默认),0:不存在"
    }
}, {
    tableName: "goods",
    timestamps: false
})

seq.models.Goods = Goods

//用于创建表（强制同步数据库）
// Goods.sync({ force: true })

Goods.belongsTo(Category, {
    foreignKey: 'goods_category_id',
    sourcekey: 'id',
    as: 'secondaryCategory'
})

Category.hasMany(Goods, {
    foreignKey: 'goods_category_id',
    sourcekey: 'id',
    as: 'goodsList'
})


module.exports = Goods