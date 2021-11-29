const express = require('express')
const router = express.Router()
const db = require('../../database/index')
router.get('/', function(req, res) {
    // 选择语句模板（offset偏移量，limit限制数量）SELECT column_name,column_name FROM table_name [WHERE Clause][OFFSET M ][LIMIT N]
    const sqlStr = 'select ques,answer from memo limit 1'
    db.db.query(sqlStr, (err, results) => {
        if (err) return console.log(err.message)
        res.send(results[0])
    })
})
module.exports = router