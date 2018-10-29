import SMERouter from 'sme-router';

import bus from '../util/bus';
import page_header_model from '../models/page-header';
import home_template from '../views/home.html';
import not_found_template from '../views/404.html';
import page_header_controller from '../controllers/page-header';
import hotel_controller from '../controllers/hotel';
import map_controller from '../controllers/map';

var router = null;
var prevUrl = ''

// 启动路由的方法
const _init = () => {

    router = new SMERouter('router-view')

    // 中间件会先执行
    router.use((req, res, next) => {
        _activeLink(req.route) 
    })

    // 处理page header的中间件

     // 保证都能匹配到，中间都能执行
     router.route('/', renderPageHeader)

    router.route('/home', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(home_template)
    })

    router.route('/hotel-save', hotel_controller.save)

    router.route('/hotel-list', hotel_controller.list)

    router.route('/hotel-update', hotel_controller.update)

    router.route('/map', map_controller.map)
   


    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
        _navLink('.not-found a[to]')
    })

    router.route('*', (req, res, next) => {
        if ( req.url === '' ) { // 刚进入项目，没有hash值，重定向到home
            res.redirect('/home')
        } else { // 如果路径匹配不到，导向404
            res.redirect('/not-found')
        }
        
    })

    // 给bus绑定事件
    bus.on('go', (path, body = {}) =>  router.go(path, body) )
    bus.on('back', () =>  router.back() )

    // 给按钮添加事件
    _navLink()
}
const renderPageHeader = ( req, res, next ) => {
    // 这里的prevUrl就是上一次的URL
    page_header_controller.render(page_header_model.pageHeaderInfo(req.url, prevUrl));
    // 已经进入到当前路由了，将上一次路由改成当前的路由
    prevUrl = req.url
}
// 给导航按钮添加点击事件
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li.nav-link[to]')
    $navs.on('click', function () {
        let _path = $(this).attr('to')
        router.go(_path)
    })
}

// 给导航按钮添加不同的类名
// @param route 当前路由的hash值
const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.removeClass('active')
    $navs.filter(`[to='${route}']`)
         .addClass('active')
}
export default {
    init: _init,
    navLink: _navLink
}