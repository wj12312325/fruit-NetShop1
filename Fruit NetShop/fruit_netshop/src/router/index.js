//引入Vue 和 VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入仓库
import store from '@/store'

import 'element-ui/lib/theme-chalk/index.css'



//使用插件
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//解决重复点击同一个路由时的，控制台报错问题
VueRouter.prototype.push = function(location, resole, reject) {
    if (resole && reject) {
        originPush.call(this, location, resole, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resole, reject) {
    if (resole && reject) {
        originReplace.call(this, location, resole, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes: [{
            path: '/home',
            component: () =>
                import ('@/pages/Home'),
            // 元信息
            meta: { show: true }
        },
        {
            path: '/login',
            component: () =>
                import ('@/pages/Login'),
            meta: { show: false }
        },
        {
            path: '/register',
            component: () =>
                import ('@/pages/Register'),
            meta: { show: false }
        },
        {
            path: '/search/:keyword?',
            component: () =>
                import ('@/pages/Search'),
            meta: { show: true },
            name: 'search',

        },
        //重定向,默认跳转
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/detail/:id',
            component: () =>
                import ('@/pages/Detail'),
            meta: { show: true },
            name: 'detail'
        },
        {
            path: '/addCartSuccess',
            component: () =>
                import ('@/pages/AddCartSuccess'),
            meta: { show: true },
            name: 'addCartSuccess'
        },
        {
            path: '/shopCart',
            component: () =>
                import ('@/pages/ShopCart'),
            meta: { show: true }

        },
        {
            path: '/trade',
            component: () =>
                import ('@/pages/Trade'),
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart' || from.path == '/') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/pay',
            component: () =>
                import ('@/pages/Pay'),
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade' || from.path == '/' || from.path.includes("/center/myorder")) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/paysuccess',
            component: () =>
                import ('@/pages/PaySuccess'),
            meta: { show: true }
        },
        {
            path: '/center',
            component: () =>
                import ('@/pages/Center'),
            meta: { show: true },
            children: [{
                    path: 'myorder/:status?',
                    component: () =>
                        import ('@/pages/Center/myOrder'),
                    meta: { show: true },
                    name: "myorder"

                },
                {
                    path: 'myinfo',
                    component: () =>
                        import ('@/pages/Center/myInfo'),
                    meta: { show: true },

                },
                {
                    path: 'myaddress',
                    component: () =>
                        import ('@/pages/Center/myAddress'),
                    meta: { show: true },

                },
                {
                    path: '/center',
                    redirect: '/center/myinfo'
                }
            ]
        }

    ],
    //默认跳到最上面
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
router.beforeEach((to, from, next) => {
    let token = store.state.user.token
    if (token) {
        //登录
        if (to.path == '/login') {
            next('/home')
        } else {
            next()
        }
    } else {
        //未登录
        let toPath = to.path
        if (toPath.indexOf('/center') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf("/trade") != -1 || toPath.indexOf("/addCartSuccess") != -1 || toPath.indexOf("/shopcart") != -1) {
            Vue.prototype.$message({
                type: "warning",
                message: '请先登录'
            })
            next({
                path: '/login?redirect=' + toPath,
                query: to.query
            })
        } else {
            next()
        }
    }
})

export default router