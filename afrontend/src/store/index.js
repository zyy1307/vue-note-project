import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        noTime: [],
        today: [],
        later: [],
        noTime: [],
        after: [],
        finish: [],
    },
    mutations: {
        //同步给state
        mPlus(state, a) {
            switch (a.ele) {
                case 'no':
                    return (state.noTime = a.data)
                case 'to':
                    return (state.today = a.data)
                case 'la':
                    return (state.later = a.data)
                case 'af':
                    return (state.after = a.data)
                case 'fi':
                    return (state.finish = a.data)
            }
        },
    },
    actions: {
        // 接受异步更新
        aPlus(context, pay) {
            // 'no','to','la','af','fi'
            //传来的payload为如下形式 {type: 'aPlus', data: Array(4), ele: 'la'}
            context.commit('mPlus', pay)
        },
    },
    // modules: {},
})