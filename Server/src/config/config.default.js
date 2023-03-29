//引入dotenv,用于读取根目录中的.env文件
const dotenv = require('dotenv')

//将配置信息写到process.env中
dotenv.config()

module.exports = process.env