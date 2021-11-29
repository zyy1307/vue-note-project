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

// export function insertQues(ques, answer) {
//     const user = { ques: ques, answer: answer }
//     const sqlStr = 'insert into memo set?'
//     db.query(sqlStr, user, (err, results) => {
//         if (err) return console.log(err.message)
//         console.log(results)
//     })
// }
// export function update() {
//     const users = { username: 'dddd', password: '93987', id: 7 }
//     const sqlStr = 'update user_table01 set ? where id=?'
//     db.query(sqlStr, [users, users.id], (err, result) => {
//         console.log(result)
//     })
// }

// export function delMark() {
//     const sqlStr = 'update user_table01 set status=? where id=?'
//     db.query(sqlStr, [1, 10], (err, results) => {
//         if (err) return console.log(err.message)
//         console.log(results)
//     })
//     db.query('select * from user_table01', (err, results) => {
//         if (err) return console.log(err.message)
//         console.log(results)
//     })
// }

// export function del() {
//     const sqlStr = 'DELETE FROM user_table01 where id=?'
//     db.query(sqlStr, 2, (err, result) => {
//         console.log(err)
//         console.log(result)
//     })
// }