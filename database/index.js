const mysql = require('mysql')
const db = mysql.createConnection({
    host: '127.0.0.1', //数据库的IP：此处为本机
    user: 'root',
    password: 'admin123',
    database: 'mysql01',
})
module.exports = {
    db,
    insertQues(ques, answer) {
        const user = { ques: ques, answer: answer }
        const sqlStr = 'insert into memo set?'
        db.query(sqlStr, user, (err, results) => {
            if (err) return console.log(err.message)
            console.log(results)
        })
    },
}