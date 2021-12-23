import request from '@/utils/request.js'
import store from '@/store'

export function handleUp(file, headers) {
    return request({
        url: '/api/excel/file',
        method: 'post',
        timeout: 5000,
        data: file,
        headers,
        // onUploadProgress: (p) => {
        //     this.progress = Math.floor((p.loaded / p.total) * 100 + '%')
        //     return this.progress
        // },
    })
}

export function getQues() {
    return request({
        url: '/api/quiz',
        method: 'get',
        timeout: 5000,
    })
}

export function get(params) {
    return request({
        url: '/api/quiz',
        method: 'get',
        params,
    })
}
// 普通默认get
export function got(url, params) {
    return request({
        url,
        params,
    })
}

export function renderList() {
    const getlist = ['no', 'to', 'la', 'af', 'fi']
    getlist.forEach((ele) => {
        got('/api/task', { items: ele })
            .then((result) => {
                const data = result.data
                store.dispatch({
                    //在其他文件中使用要引入store
                    type: 'aPlus',
                    data,
                    ele,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    })
}

export function postList(data, url) {
    // 转换成json传输数据
    data = JSON.stringify(data)
    return request({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data,
    })
}