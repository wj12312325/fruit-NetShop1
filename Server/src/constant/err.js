//总错误类型集合
module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或手机号或密码为空',
        result: ''
    },
    userAlreadyExited: {
        code: '10002',
        message: '该手机号已注册！',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    userDoesNotExist: {
        code: '10004',
        message: '该手机号尚未注册',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '密码不匹配',
        result: ''
    },
    userUpdateInfoError: {
        code: '10007',
        message: '更新用户信息错误',
        result: ''
    },
    getUserInfoError: {
        code: '10008',
        message: '获取用户信息错误',
        result: ''
    },
    uesrLogoutError: {
        code: '10009',
        message: '用户退出登录错误',
        result: ''
    },
    userSelectError: {
        code: '10010',
        message: '用户搜索错误',
        result: ''
    },
    userDeleteError: {
        code: '10011',
        message: '用户删除错误',
        result: ''
    },
    userPhoneOnlyError: {
        code: '10012',
        message: '手机号/账号已存在！',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result: ''
    },
    selectTokenError: {
        code: '10103',
        message: '查询token错误',
        result: ''
    },
    hasNotAdminRole: {
        code: '10104',
        message: "没有权限",
        return: ''
    },
    identityError: {
        code: '10105',
        message: "身份错误，权限不够",
        return: ''
    },
    tokenError: {
        code: '10106',
        message: "token不合法或token已过期,请退出重新登录",
        return: ''
    },
    fileUploadError: {
        code: '10201',
        message: "商品图片上传失败",
        return: ''
    },
    unSupportFileType: {
        code: '10202',
        message: "商品图片文件格式不支持",
        return: ''
    },
    goodsFormatError: {
        code: '10203',
        message: "商品参数格式错误",
        return: ''
    },
    addGoodsError: {
        code: '10204',
        message: "添加商品错误",
        return: ''
    },
    goodsUpdateInfoError: {
        code: '10205',
        message: "修改商品错误",
        return: ''
    },
    goodsListSelectError: {
        code: '10206',
        message: "商品列表查询错误",
        return: ''
    },
    goodsSelectError: {
        code: '10207',
        message: "商品搜索错误",
        return: ''
    },
    getGoodsCategoryListError: {
        code: '10208',
        message: "商品分类列表错误",
        return: ''
    },
    invalidGoodsId: {
        code: '10209',
        message: "无效的商品ID",
        return: ''
    },
    deleteGoodsError: {
        code: '10210',
        message: "删除商品错误",
        return: ''
    },
    cartFormatError: {
        code: '10301',
        message: '购物车参数格式错误',
        return: ''
    },
    addCartError: {
        code: '10302',
        message: '添加购物车错误',
        result: ""
    },
    addCartOverflowError: {
        code: '10303',
        message: '添加购物车溢出错误',
        result: ""
    },
    getCartListError: {
        code: '10304',
        message: '购物车列表获取错误',
        result: ""
    },
    illegalCartId: {
        code: '10305',
        message: '购物车id不合法',
        result: ""
    },
    updateCartError: {
        code: '10306',
        message: '购物车更新错误',
        result: ""
    },
    deleteCartError: {
        code: '10307',
        message: '购物车删除错误',
        result: ""
    },
    selectCartAllOrNullError: {
        code: '10308',
        message: '购物车选择错误',
        result: ""
    },
    addressFormatError: {
        code: '10401',
        message: '地址参数格式错误',
        result: ''
    },
    addAddressError: {
        code: '10402',
        message: '地址添加错误',
        result: ''
    },
    getAddressListError: {
        code: '10403',
        message: '地址列表获取失败',
        result: ''
    },
    updateAddressError: {
        code: '10404',
        message: '地址更新失败',
        result: ''
    },
    deleteAddressError: {
        code: '10405',
        message: '地址删除失败',
        result: ''
    },
    addressSelectError: {
        code: '10406',
        message: '地址搜索失败',
        result: ''
    },
    orderFormatError: {
        code: '10501',
        message: '订单参数格式错误',
        result: ''
    },
    addOrderError: {
        code: '10502',
        message: '订单生成错误',
        result: ''
    },
    getOrderListError: {
        code: '10503',
        message: '获取订单列表错误',
        result: ''
    },
    updateOrderError: {
        code: '10504',
        message: '更新订单状态错误',
        result: ''
    },
    deleteOrderError: {
        code: '10505',
        message: '订单删除错误',
        result: ''
    },
    deleteOrderSatatusError: {
        code: '10506',
        message: '该订单尚未完成,订单当前状态不能删除',
        result: ''
    },
    categoryFormatError: {
        code: '10601',
        message: '商品分类参数格式错误',
        result: ''
    },
    addCategoryError: {
        code: '10602',
        message: '添加商品分类错误',
        result: ''
    },
    getCategoryListError: {
        code: '10603',
        message: '获取商品分类列表错误',
        result: ''
    },
    updateCategoryError: {
        code: '10604',
        message: '更新商品分类错误',
        result: ''
    },
    deleteCategoryError: {
        code: '10605',
        message: '商品分类删除错误',
        result: ''
    },
    getGoodsSearchListError: {
        code: '10607',
        message: '获取搜索商品列表错误',
        result: ''
    },
    getGoodsSearchListFormatError: {
        code: '10607',
        message: '获取搜索商品列表参数格式错误',
        result: ''
    }
}