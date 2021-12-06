import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 在主文件中引入css
import './assets/css/common.scss'
import './assets/css/variable.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
// icon
import './icons/icon.css'
import './icons/icon.js'
import './icons/iconfont.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
    //处理时间
Vue.filter('formatter', function(value) {
    if (value == '') return value
    return (value = moment(value).format('YYYY-MM-DD'))
})
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')