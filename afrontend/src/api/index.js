import request from '@/utils/request.js'

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