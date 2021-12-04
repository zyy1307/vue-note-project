const express = require('express')
const router = express.Router()
    // 协助读取excel的模块
const fs = require('fs')
const formidable = require('formidable')
const xlsx = require('node-xlsx')
const path = require('path')
const db = require('../../database/index')
    // 中间件
router.use(function(req, res, next) {
        let form = new formidable.IncomingForm()
            // 设置保存文件路径:__dirname would be the same directory as the source file itself (src)
        form.uploadDir = path.join(__dirname, '../../upload')
        let filePath
        form.parse(req, function(err, fields, files) {
            if (err) console.log(err)
            filePath = files.userfile.filepath
                //解析excel文档
            const sheets = xlsx.parse(filePath)
                //数据格式[[第一行第一列，一行二列],[二行一列，二行二列]]
            const data = sheets[0].data
                // 写入memo数据库
            data.forEach((ele) => {
                    db.insertQues(ele[0], ele[1])
                })
                // 输出成功后删除文件
            fs.unlinkSync(filePath)
        })
        next()
    }),
    // 对象形式使用下一个中间件function (req, res, next) {
    //   console.log('Request Type:', req.method);
    //   next();
    // })

    router.post('/file', function(req, res) {
        res.send('ok')
    })

module.exports = router