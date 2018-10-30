var express = require('express');
var router = express.Router();
var auth=require('../middlewaers/auth')
var user_controller = require('../controllers/user');
/* GET home page. */
// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next();
}
// 为/user中所有的路由都使用这个中间件
router.use(resApplicationJson);
router.get('/isSignin',user_controller.isSignin);
router.get('/userinfo', auth.userState,user_controller.userinfo);
router.get('/exit',user_controller.exit);
router.get('/auth', auth.userState,user_controller.auth);
module.exports = router;


