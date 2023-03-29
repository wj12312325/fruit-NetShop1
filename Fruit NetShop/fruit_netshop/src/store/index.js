import Vue from 'vue'
import Vuex from 'vuex'

//引入仓库
import user from './modules/user'
import category from './modules/category'
import goods from './modules/goods'
import cart from './modules/cart'
import order from './modules/order'
import address from './modules/address'
//使用插件
Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        user,
        category,
        goods,
        cart,
        order,
        address
    }
})