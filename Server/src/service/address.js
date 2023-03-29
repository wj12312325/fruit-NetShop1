//引入Op
const { Op } = require('sequelize')

//引入地址模型Address
const Address = require('../model/address')
const Users = require('../model/user')

class AddressService {

    //添加地址
    async addAddress(user_id, consignee, phone, area, address) {
        return await Address.create({ user_id, consignee, phone, area, address })
    }

    //获取地址列表（分页）
    async getAddressList({ pageNum, pageSize }, {
        consignee,
        phone,
        user_id
    }) {
        let whereOpt = {}
        user_id && Object.assign(whereOpt, { user_id })
        consignee && Object.assign(whereOpt, {
            consignee: {
                [Op.like]: `%${consignee}%`
            }
        })
        phone && Object.assign(whereOpt, {
            phone: {
                [Op.like]: `%${phone}%`
            }
        })
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Address.findAndCountAll({
            offset,
            limit: pageSize * 1,
            where: whereOpt,
            include: {
                model: Users,
                as: 'userInfo',
                attributes: ['name', 'id']
            },
            order: [
                [{
                    model: Users,
                    as: 'userInfo'
                }, 'name', 'ASC']
            ],
        })
        return {
            pageNum,
            pageSize,
            total: count,
            addressList: rows
        }
    }

    //更新地址 (同时可以修改默认地址)
    async updateAddress(id, user_id, { consignee, phone, address, area, is_default }) {
        const addressInfo = {}
        consignee && Object.assign(addressInfo, { consignee })
        phone && Object.assign(addressInfo, { phone })
        address && Object.assign(addressInfo, { address })
        area && Object.assign(addressInfo, { area })
        if (is_default !== undefined) {
            addressInfo.is_default = is_default
        }

        if (is_default) {
            const UpdateIsDefault = await Address.update({ is_default: false }, { where: { user_id } })
        }
        const res = await Address.update(addressInfo, { where: { id } })
        return res[0] > 0
    }

    //删除地址
    async deleteAddress(ids) {
        return await Address.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    //搜索地址(分页)
    async selectAddress(pageNum, pageSize, {
        consignee,
        phone
    }) {
        let whereOpt = {}
        consignee && Object.assign(whereOpt, {
            consignee: {
                [Op.like]: `%${consignee}%`
            }
        })
        phone && Object.assign(whereOpt, {
            phone: {
                [Op.like]: `%${phone}%`
            }
        })

        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Address.findAndCountAll({
            offset,
            limit: pageSize * 1,
            where: whereOpt,

        })
        return {
            pageNum,
            pageSize,
            total: count,
            addressList: rows
        }
    }
}

module.exports = new AddressService()