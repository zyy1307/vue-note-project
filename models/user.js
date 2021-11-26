const mysql = require('mysql');
const db = mysql.createPool({
    host: '127.0.0.1', //数据库的IP：此处为本机
    user: 'root',
    password: 'admin123',
    database: 'mysql01',
})
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
})
db.query("insert into user_table01 (username,password,status)values('rr','67923',1)", (err, results) => {
    if (err) return console.log(err.message)
    console.log(results)
})