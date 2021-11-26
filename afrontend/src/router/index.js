import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout.vue'
const Memo = () =>
    import ('../views/Memo')
const Quiz = () =>
    import ('../views/Memo/quiz.vue')
const Excel = () =>
    import ('../views/Memo/excel.vue')
const Calendar = () =>
    import ('../views/Calendar')
const Note = () =>
    import ('../views/Note')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Layout,
    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：
    children: [{
            path: '/memo',
            name: 'memo',
            component: Memo,
        },
        {
            path: '/memo/quiz',
            name: 'quiz',
            component: Quiz,
        },
        {
            path: '/memo/excel',
            name: 'excel',
            component: Excel,
        },

        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar,
        },
        {
            path: '/note',
            name: 'note',
            component: Note,
        },
    ],
}, ]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: 'active',
})

export default router