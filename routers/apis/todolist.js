const express = require('express')
const router = express.Router()
const db = require('../../database/index')
const bodyParser = require('body-parser')
let sqlStr
    // const listModel = {
    //         id,
    //         // todolist内容
    //         con,
    //         lDate,
    //         fortag,
    //         priority,
    //         // 是否过期，是否完成
    //         isDate,
    //         isFi,
    //     }
router.use(bodyParser.json())
    // 根路径提交todo
router.post('/', function(req, res) {
        // 解析body而不是整个请求
        const data = req.body
        const user = { con: data.con }
        if (data.lDate) {
            user.lDate = data.lDate
        }
        if (data.priority) {
            user.priority = data.priority
        }
        if (data.fortag) {
            user.fortag = data.fortag //判断不了lLabel  我也不知道为啥
        }
        const sqlStr = 'insert into todolist set?'
        db.db.query(sqlStr, user, (err, results) => {
            if (err) return console.log(err.message)
        })
        res.send('解析成功')
    })
    // 拿列表
router.get(
    '/',
    function(req, res, next) {
        //中间件处理sql要求-这是开头获取所有的中间件
        const para = req.query.items
        switch (para) {
            case 'no': //无日期// 查空要用 is null 而不能用=null
                sqlStr = 'select * from todolist where ldate is null and isFi=0'
                break
            case 'to':
                sqlStr =
                    'select * from todolist where ldate >= date(now()) and ldate < DATE_ADD(date(now()), INTERVAL 1 DAY) and isFi=0'
                break
            case 'la':
                sqlStr = 'select * from todolist where ldate >= DATE_ADD(date(now()), INTERVAL 1 DAY) and isFi=0'
                break
            case 'af':
                sqlStr = 'select * from todolist where ldate < date(now()) and isFi=0'
                break
            case 'fi': //已完成
                sqlStr = 'select * from todolist where isFi=1 limit 5' //默认5条，之后还要写加载更多
                break // 不能用return！会直接退出整个中间件，没有执行next()
            case 'fimore':
                sqlStr = 'select * from todolist where isFi=1'
                break
        }
        next()
    },
    function(req, res, next) {
        //处理删除、完成、标签、优先级的中间件
        if (req.query.del) {
            sqlStr = `DELETE FROM todolist where id=${req.query.del}`
        } else if (req.query.isFi) {
            console.log(req.query)
            sqlStr = `update todolist set isFi=${req.query.isFi} where id=${req.query.id}`
        }
        next()
    },
    function(req, res) {
        //接受上一个中间件的sqlStr
        db.db.query(sqlStr, (err, results) => {
            if (err) return console.log(err.message)
                // 没有符合条件的，会输出空数组 没问题
            res.send(results)
        })
    }
)
router.get('/bel', function(req, res) {
    const sqlStr = 'select fortag from todolist where fortag is not null'
    let la = new Set()
    db.db.query(sqlStr, (err, results) => {
        if (err) return console.log(err.message)
        results.forEach((ele) => {
            la.add(ele.fortag)
        })
        const bel = Array.from(la) //不能传set 所以转成数组
        res.json(bel)
    })
})
module.exports = router