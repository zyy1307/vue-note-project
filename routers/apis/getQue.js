const express = require('express')
const router = express.Router()
const db = require('../../database/index')
router.get('/', function(req, res) {
        // 选择语句模板（offset偏移量，limit限制数量）SELECT column_name,column_name FROM table_name [WHERE Clause][OFFSET M ][LIMIT N]
        if (req.query.know) {
            const sqlStr = `update memo set know=${req.query.know} where id=${req.query.id}`
            db.db.query(sqlStr, (err, results) => {
                if (err) return console.log(err.message)
                res.send('更新成功')
            })
        } else if (req.query.del) {
            const sqlStr = `DELETE FROM memo where id=${req.query.id}`
            db.db.query(sqlStr, (err, result) => {
                if (err) return console.log(err.message)
                res.send('删除成功')
            })
        } else {
            const sqlStr = 'select * from memo where know=0 limit 6 '
            db.db.query(sqlStr, (err, results) => {
                if (err) return console.log(err.message)
                res.send(results)
            })
        }
    })
    // router.post('/', function(req, res) {})
module.exports = router