// 主路由文件
// 引入express
const express = require('express')
    // 引入数据库
const mysql = require('mysql')
const cors = require('cors')
    // 实例化一个app
const app = express()
    // 引入路由
const users = require('./routers/apis/users')
const excel = require('./routers/apis/excel')
const quiz = require('./routers/apis/getQue')

// DB config
const db = mysql.createConnection({
        host: '127.0.0.1', //数据库的IP：此处为本机
        user: 'root',
        password: 'admin123',
        database: 'mysql01',
    })
    // 连接mysql数据库
db.connect((err) => {
    if (err) {
        console.log('[query] - :' + err)
        return
    }
    console.log('[connection connect]  succeed!')
})

// 解决跨域问题
app.use(cors())
    // 设置路由:根路径
app.get('/', (req, res) => {
        res.send('hello,world')
    })
    // 使用router
app.use('/api/users', users)
app.use('/api/excel', excel)
app.use('/api/quiz', quiz)
    //localhost:3000/api/excel/file+大路由+分路由

// 端口号
// process.env.PORT || 3000 意味着： 环境变量PORT中有什么， 如果没有什么， 则为3000
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})