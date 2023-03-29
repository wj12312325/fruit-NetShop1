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
const { DataTypes, Sequelize } = require('sequelize')
    //引入seq实体对象
const Goods = require('../model/good')
const seq = require('../db/seq')

//创建模型
const Category = seq.define('category', {
    //id会自动创建
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '分类名'
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "父级ID"
    }

}, {
    tableName: "category",
    timestamps: false
})

//用于创建表（强制同步数据库）
// Category.sync({ force: true })

// seq.models.Category = Category

// Category.hasMany(Goods, {
//     foreignKey: 'goods_category_id',
//     sourcekey: 'id',
//     as: 'category'
// })
Category.belongsTo(Category, {
    foreignKey: 'parent_id',
    sourcekey: 'id',
    as: 'oneCategory'
})

Category.hasMany(Category, {
    foreignKey: 'parent_id',
    sourcekey: 'id',
    as: 'secondaryCategory'
})


module.exports = Category