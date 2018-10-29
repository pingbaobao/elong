var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user');
/* GET home page. */
// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/user中所有的路由都使用这个中间件
router.use(resApplicationJson)


// router.post('/signup', admin_controller.signup)
// router.post('/signin', admin_controller.signin)
router.get('/signin',user_controller.isSignin);

module.exports = router;


