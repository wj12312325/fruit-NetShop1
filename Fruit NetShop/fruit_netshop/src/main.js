import Vue from 'vue'
import App from './App.vue'



// 引入路由
import router from '@/router'
//引入仓库
import store from "@/store"
//引入API接口函数
import API from '@/api'
//三级联动组件--全局组件
import TypeNav from "@/components/TypeNav"
//引入ElementUI 和css的样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入swiper样式 
import "swiper/css/swiper.css"
//引入高德地图
import VueAMap from 'vue-amap'
//引入时间戳的包
import dayjs from 'dayjs'

//引入地址选择插件
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'

Vue.use(VueAreaLinkage)


//使用全局组件
Vue.component(TypeNav.name, TypeNav)

Vue.use(ElementUI)
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
    key: '8f0cbe6cbd4653f72da5720a8da7559e',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
})

Vue.config.productionTip = false
Vue.prototype.dayjs = dayjs
Vue.prototype.$API = API
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    router,
    store
}).$mount('#app')