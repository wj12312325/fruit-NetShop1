//引入地址Service
const AddressService = require('../service/address')
    //引入统一错误集合
const { addAddressError, getAddressListError, updateAddressError, deleteAddressError, addressSelectError } = require('../constant/err')

class AddressController {
    //添加地址
    async addAddress(ctx, next) {
        let user_id = 0

        const user_id1 = ctx.state.user.id
        const user_id2 = ctx.request.params.user_id

        if (user_id2) {
            user_id = user_id2
        } else {
            user_id = user_id1
        }
        const { consignee, phone, area, address } = ctx.request.body

        try {
            const res = await AddressService.addAddress(user_id, consignee, phone, area, address)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '地址添加成功',
                    result: ''
                }
            } else {
                console.error('地址添加失败')
                return ctx.app.emit('error', addAddressError, ctx)
            }
        } catch (error) {
            console.error('地址添加失败', error)
            return ctx.app.emit('error', addAddressError, ctx)
        }
    }

    //获取地址列表（分页）
    async getAddressList(ctx, next) {
        const { pageNum, pageSize } = ctx.request.query
        const {
            consignee,
            phone,
            user_id

        } = ctx.request.body
        try {
            const res = await AddressService.getAddressList({ pageNum, pageSize }, {
                consignee,
                phone,
                user_id
            })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '地址列表获取成功',
                    result: res
                }
            } else {
                console.error('地址列表获取失败')
                return ctx.app.emit("error", getAddressListError, ctx)
            }
        } catch (error) {
            console.error('地址列表获取失败', error)
            return ctx.app.emit("error", getAddressListError, ctx)
        }
    }

    //更新地址 (同时可以修改默认地址)
    async updateAddress(ctx, next) {
        const id = ctx.request.params.id
        let user_id = 0
        const user_id1 = ctx.state.user.id
        const user_id2 = ctx.request.params.user_id

        if (user_id2) {
            user_id = user_id2
        } else {
            user_id = user_id1
        }
        const { consignee, phone, address, area, is_default } = ctx.request.body

        try {
            const res = await AddressService.updateAddress(id, user_id, { consignee, phone, address, area, is_default })
            if (res) {
                ctx.body = {
                    code: 200,
                    message: '地址更新成功',
                    result: ''
                }
            } else {
                console.error('地址更新失败')
                return ctx.app.emit("error", updateAddressError, ctx)
            }
        } catch (error) {
            console.error('地址更新失败', error)
            return ctx.app.emit("error", updateAddressError, ctx)
        }
    }

    //删除地址
    async deleteAddress(ctx, next) {
        const { ids } = ctx.request.body
        try {
            const res = await AddressService.deleteAddress(ids)
            if (res) {
                ctx.body = {
                    code: 200,
                    message: "地址删除成功",
                    result: ""
                }
            } else {
                console.error('地址删除失败1')
                return ctx.app.emit("error", deleteAddressError, ctx)
            }
        } catch (error) {
            console.error('地址删除失败', error)
            return ctx.app.emit("error", deleteAddressError, ctx)
        }
    }

    // //搜索地址（分页）
    // async selectAddress(ctx, next) {
    //     const { pageNum = 1, pageSize = 10 } = ctx.request.query
    //     const {
    //         consignee,
    //         phone

    //     } = ctx.request.body
    //     try {
    //         const res = await AddressService.selectAddress(pageNum, pageSize, {
    //             consignee,
    //             phone
    //         })
    //         if (res) {
    //             ctx.body = {
    //                 code: 200,
    //                 message: '搜索地址成功',
    //                 result: res
    //             }
    //         } else {
    //             console.error('搜索地址失败')
    //             return ctx.app.emit('error', addressSelectError, ctx)
    //         }
    //     } catch (error) {
    //         console.error('搜索地址失败', error)
    //         return ctx.app.emit('error', addressSelectError, ctx)
    //     }

    // }
}
module.exports = new AddressController()