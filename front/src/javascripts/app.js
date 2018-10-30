// 引入样式
import '../css/app.scss'

// 引入路由
import router from './router'
//引入页面主体
const body_template = require('./views/body.html')
//个人信息渲染
import user_controller from './controllers/user';

// 引入登录权限验证
import { userSigninAuth } from './util/auth'
 $('#wrapper').html(body_template);
// 登录验证
userSigninAuth((auth) => { // 如果用户已经登录
    // 渲染整体内容结构
   
    // 启动路由
    router.init();
    user_controller.renderUserInfo();
}, () => { // 没有登录，直接跳转到admin
    window.location.href="/admin.html"
   
})