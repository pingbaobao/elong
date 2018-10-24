// 引入样式
import '../css/app.scss'

// 引入路由
import router from './router'

const body_template = require('./views/body.html')


// 渲染整体内容结构
$('#wrapper').html(body_template)


// 启动路由
router.init()
// router.navLink()