//  for login和register
const express = require('express')
const router = express.Router();
// 跟在api/users后面 get请求test 返回请求的json数据 @access public
router.get('/test', (req, res) => {
    if (res) {
        res.json({ msg: 'login works' })
    }
    console.log('??')
})

module.exports = router