//引入Op
const { Op } = require("sequelize") //引入用户模型Users
const Users = require("../model/user")
    //引入用户令牌模型UserToken

const UserToken = require("../model/userToken")


class UserService {
    //注册
    async register(name, phone, password, role, user_img) {
        //操作数据库
        //插入数据
        const res = await Users.create({
            name,
            phone,
            password,
            role,
            user_img
        })
        return res.dataValues
    }

    //查询用户是否存在
    async isUserExist({ id, phone, password, name, role, state }) {

        const whereOpt = {}
            //判断有没有对应信息
        id && Object.assign(whereOpt, { id })
        phone && Object.assign(whereOpt, { phone })
        name && Object.assign(whereOpt, { name })
        password && Object.assign(whereOpt, { password })
        role && Object.assign(whereOpt, { role })
        state && Object.assign(whereOpt, { state })

        //查询信息
        const res = await Users.findOne({
            attributes: ['id', 'phone', 'password', 'name', 'role', 'state', 'user_img'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }

    //修改用户信息
    async updateUserInfo({ id, phone, password, name, user_img, role }) {
        const whereOpt = { id }
        const newUserInfo = {}

        phone && Object.assign(newUserInfo, { phone })
        password && Object.assign(newUserInfo, { password })
        name && Object.assign(newUserInfo, { name })
        user_img && Object.assign(newUserInfo, { user_img })
        role && Object.assign(newUserInfo, { role })

        console.log('5656', newUserInfo)

        const res = await Users.update(newUserInfo, { where: whereOpt })
        return res[0] > 0
    }

    //获取用户信息
    async getUserInfo(id) {
        const res = await Users.findOne({
            where: id
        })
        const { password, ...userInfo } = res.dataValues
        if (userInfo.role == 2) {
            userInfo.routes = ['User', 'Category', 'Goods', 'Order', 'Address', 'Cart']
        } else {
            userInfo.routes = ['Category', 'Goods', 'Order']
        }
        return userInfo
    }

    //插入用户token
    async addToken(phone, token, userId) {
        console.log('ssasdas', phone, token, userId)
        const res = await UserToken.create({
            phone,
            token,
            userId
        })

        return res.dataValues
    }

    //删除用户token
    async deleteToken({ phone, token, userId }) {
        const whereOpt = {}
        phone && Object.assign(whereOpt, { phone })
        token && Object.assign(whereOpt, { token })
        userId && Object.assign(whereOpt, { userId })
        const res = await UserToken.destroy({
            where: whereOpt
        })
        return res > 0
    }

    //查询用户token
    async selectToken({ phone, token, userId }) {
        const whereOpt = {}

        phone && Object.assign(whereOpt, { phone })
        token && Object.assign(whereOpt, { token })
        userId && Object.assign(whereOpt, { userId })

        //查询信息
        const res = await UserToken.findOne({
            attributes: ['phone', 'token', 'userId'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }

    //搜索用户(分页)
    async selectUser(pageNum, pageSize, state, {
        name,
        phone,
        role
    }) {

        let whereOpt = {}
        state && Object.assign(whereOpt, { state })
        name && Object.assign(whereOpt, {
            name: {
                [Op.like]: `%${name}%`
            }
        })
        phone && Object.assign(whereOpt, {
            phone: {
                [Op.like]: `%${phone}%`
            }
        })
        role && Object.assign(whereOpt, { role })

        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Users.findAndCountAll({
            offset,
            limit: pageSize * 1,
            where: whereOpt,

        })
        return {
            pageNum,
            pageSize,
            total: count,
            userList: rows
        }
    }

    //用户软删除
    async deleteUser(id) {

        const res = await Users.update({ state: 0 }, {
            where: { id }
        })
        return res[0] > 0


    }

}

module.exports = new UserService()