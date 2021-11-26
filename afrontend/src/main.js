import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 在主文件中引入css
import './assets/css/common.scss'
import './assets/css/variable.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// icon
import './icons/icon.css'
import './icons/icon.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app')